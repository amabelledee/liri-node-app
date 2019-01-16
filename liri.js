// installed request
// installed moment
// installed dotenv
var dotenv = require('dotenv').config()
// installed Spotify
var Spotify = require("node-spotify-api")

var spotify = new Spotify({
    id: d9d4ca62f40c454282e567a17d8890ed,
    secret: e3f5282e396242e682120de203bc9ad3
  });
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });