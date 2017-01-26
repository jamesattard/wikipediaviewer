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
      // console.log(res);
      // traverse(res);
      var wikiResults = res['query']['pages'];
      var wikiExtracts = [];
      var totalEntries = Object.keys(wikiResults).length; // should be 10

      // Loop through all "pages" - each element signifies an entry
      // and just take the 'extract' part.
      // Push all 10 extracts into an array.
      for (var i = 0; i < totalEntries; i++){
        //console.log(wikiResults[Object.keys(wikiResults)[i]]['extract']);
        wikiExtracts.push(wikiResults[Object.keys(wikiResults)[i]]['extract']);
      }

      //console.log(wikiExtracts);
      $('h2').text('Returning results for "' + searchQuery + '"');
      $('#wikiResults').html(wikiExtracts);

    },

    error: function(error){
      console.log(error);
    }

  }); // .ajax()
} // function getWikiResults()

$('#wikiButton').click(function() {
  getWikiResults($('#searchQuery').val());
  $('#searchQuery').val('');
})
