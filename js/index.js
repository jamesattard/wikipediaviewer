// function traverse (o) {
//   for (i in o) {
//     if (!!o[i] && typeof(o[i]) == "object") {
//       console.log(i, o[i]);
//       traverse(o[i]);
//     } else {
//       console.log('Leaf Node: ' + o[i]);
//     }
//   }
// }

function getWikiResults(searchQuery) {
  // Get wiki results based on searchQuery
  var r = (new Date()).getTime();
  var wikiURL = 'https://en.wikipedia.org/w/api.php';

  $.ajax({

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
      // traverse(res);
      var wikiResults = res['query']['pages'];
      var wikiExtracts = [];
      var totalEntries = Object.keys(wikiResults).length; // should be 10

      for (var i = 0; i < totalEntries; i++){
        wikiExtracts.push(wikiResults[Object.keys(wikiResults)[i]]['extract']);
      }

      $('#wikiTitle').text('"' + searchQuery + '"');
      $('#wikiResults').html(wikiExtracts);

    },

    error: function(error){
      console.log(error);
    }

  }); // end of .ajax()
} // end of function getWikiResults()

function getRandomWiki() {
  // Get wiki results based on searchQuery
  var r = (new Date()).getTime();
  var wikiURL = 'https://en.wikipedia.org/w/api.php';

  $.ajax({

    url: "https://en.wikipedia.org/w/api.php",
    jsonp: "callback",
    dataType: "jsonp",

    data: {
        action: "query",
        generator: "random", // generator generates URLs
        utf8: 1,
        prop: "extracts",
        exintro: 1,
        grnnamespace: 0,
        exchars: 500,
        format: "json"
    },

    xhrFields: { withCredentials: true },
    headers: { "Api-User-Agent": "WikiViewer/1.0" },

    success: function(res) {
      // traverse(res);
      var wikiResults = res['query']['pages'];
      var wikiTitle = [];
      var wikiExtracts = [];
      var wikiLink = [];

      wikiTitle.push(wikiResults[Object.keys(wikiResults)[0]]['title']);
      wikiExtracts.push(wikiResults[Object.keys(wikiResults)[0]]['extract']);
      wikiLink.push(wikiResults[Object.keys(wikiResults)[0]]['pageid']);

      $('#wikiTitle').text('"' + wikiTitle + '"');
      $('#wikiResults').html('<a href="http://en.wikipedia.org/?curid=' +
        wikiLink[0] + '"'  + 'target="_blank">' + wikiExtracts + '</a>');
    },

    error: function(error){
      console.log(error);
    }

  }); // end of .ajax() call
} // end of function getRandomWiki()

getRandomWiki(); // Start with a random Wiki entry

// Allow searching with Enter key
$("#searchQuery").keyup(function(event){
    if(event.keyCode == 13){
        $("#wikiButton").click();
    }
});

// On clicking search button trigger getWikiResults(searchQuery)
$('#wikiButton').click(function() {
  getWikiResults($('#searchQuery').val());
  $('#searchQuery').val('');
});

// On clicking random button trigger getRandomWiki()
$('#randomWikiButton').click(function() {
  getRandomWiki();
});
