'use strict';

// Youtube Search URL
const YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// 1. User Search YouTube Videos
// 2. Display Thumbnail images of videos that match the Search 
// 3. Make them clickable, each thumbnail should link to the YouTube page that plays that video
//     - ID = to the youtube site video


function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YT_SEARCH_URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyCE045-TJH8I_VJOD7nW2PNRzSqr8ItfBI',
      q: searchTerm,
      maxResults: 5,
      type: 'video'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  let thumbnailImage = result.snippet.thumbnails.high.url;
  let imageHeight = result.snippet.thumbnails.high.height;
  let imageWidth = result.snippet.thumbnails.high.width;
  let videoID = result.id.videoId;
  let videoTitle = result.snippet.title;

  return `
    <div class="thumbnails">
       <h4>${videoTitle}</h4>
       <a href="https://www.youtube.com/watch?v=${videoID}" target="_blank"><img src="${thumbnailImage}" alt="${videoTitle}" width="${imageWidth}" height="${imageHeight}"/></a>
    </div>
  `;
}

function displayYoutubeSearchData(data){
   console.log(data);
   const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    // clear out the input
    queryTarget.val('');
    getDataFromApi(query, displayYoutubeSearchData);
    $('main').show('block');
  });
}

$(watchSubmit);
