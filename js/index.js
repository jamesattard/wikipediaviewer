function getWikiResults(searchQuery) {
  // Get wiki results based on searchQuery
  var r = (new Date()).getTime();
  var wikiURL = 'https://en.wikipedia.org/w/api.php';

  $.ajax( {
    url: "https://en.wikipedia.org/w/api.php",
    jsonp: "callback",
    dataType: "jsonp",
    data: {
        action: "query",
        generator: "search", // generator generates URLs
        utf8: 1,
        gsrsearch: searchQuery, // search query argument
        prop: "extracts",
        exsentences: 1,
        exintro: 1, // limit to 100chars otherwise won't work
        exlimit: "max", // all returned results to display extract
        format: "json"
    },
    xhrFields: { withCredentials: true },
    headers: { "Api-User-Agent": "WikiViewer/1.0" },
    success: function(res) {
      console.log(res);
      var wikiResults = res.query.pages[15604]['extract'];
      console.log(wikiResults);
      $('h2').text('Returning results for ' + searchQuery);
      $('#wikiResults').html(wikiResults);

    },
    error: function(error){
      console.log(error);
    }
  });
}

getWikiResults("james");
