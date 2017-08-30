const youtube_search_url = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    maxResults: 10,
    part: 'snippet',
    key: 'AIzaSyBrGjzU2ONDD5CWm3mtnsIAysPqHHY6-q8',
    q: `${searchTerm}`,
    order: 'viewCount'
  }
  $.getJSON(youtube_search_url, query, callback);
  console.log($.getJSON(youtube_search_url, query, callback));
};

function renderVideoResult(result) {
  return `
  <div class= 'result video-result'>
      <h3>
      <a class="js-video-name" href="https://youtu.be/${result.id.videoId}" target="_blank">${result.snippet.title}</a>
      by&nbsp<a class="js-video-channel-name" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h3>
      <a class="js-video-thumbnail" href="#" target="_blank"><img src="${result.snippet.thumbnails.default.url}"></a>
      <p>${result.snippet.description}</p>
  </div>
  `;
}

function renderChannelResult(result) {
  return `
  <div class='result channel-result'>
      <h3>
      <a class="js-video-name" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.title} YouTube Channel</a>
      </h3>
      <a class="js-video-thumbnail" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}"></a>
  </div>
  `;
}

function renderPlaylistResult(result) {
  return `
  <div class="result playlist-result'>
      <h3>
      <a class="js-video-name" href="https://www.youtube.com/playlist?list=${result.id.playlistId}" target="_blank">${result.snippet.title}</a>
      by&nbsp<a class="js-video-channel-name" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h3>
      <a class="js-video-thumbnail" href="https://www.youtube.com/playlist?list=${result.id.playlistId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}"></a>
  </div>
  `;
}

function displayThinktubeSearchData(data) {
  const results = data.items.map(function(cv, idx){
    return renderChannelResult(cv);
  })
  $('.js-search-results').html(results);
}



/*
const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

// 3 CALLED FROM watchSubmit()
// RECEIVE QUERY & FUNCTION
function getDataFromApi(searchTerm, callback) {
  const query = {  // CONVERT QUERY TO ENCODED URL
    q: `${searchTerm} in:name`,
    per_page: 5
  }
  $.getJSON(GITHUB_SEARCH_URL, query, callback); // >>>>>>>>>>>>>>>>>>>>>>>>>>> GET ACTUAL DATA, PASS IN URL, QUERY, CALLBACK
                                                 // >>>>>>>>>>>>>>>>>>>>>>>>>>> CALLBACK GOES TO 4... displayGitHubSearchData();
}

// 5 SUB-FUNCTION TO displayGitHubSearchData() THAT RENDERS AN INDIVIDUAL RESULT
function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
      <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
      <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
    </div>
  `;
}

// 4 DISPLAY DATA, CALLED AS CALLBACK FROM 3: getDataFromApi();
function displayGitHubSearchData(data) {
  const results = data.data.map((item, index) => renderResult(item));  // >>>>>>>>>>>>>>>>>>>>>> TO 5, SUB-FUNCTION PER ITEM
  $('.js-search-results').html(results);
}

// 2 APPLY EVENT LISTENERS 
*/
function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayThinktubeSearchData); // >>>>>>>>>>>>>>>>>>>>>>>> TO 3, PASS IN QUERY & FUNCTION
  });
}

// 1 DOCUMENT READY
$(watchSubmit);
