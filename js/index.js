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
        exintro: 1, // limit to 100chars otherwise won't work
        exlimit: "max", // all returned results to display extract
        format: "json"
    },
    xhrFields: { withCredentials: true },
    headers: { "Api-User-Agent": "WikiViewer/1.0" },
    success: function(data) {
      console.log(data);
    },
    error: function(error){
      console.log("Broken Pipe");
    }
  });

}

getWikiResults("james");
