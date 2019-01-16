// installed request
// installed moment
// installed dotenv
var dotenv = require('dotenv').config()
// installed Spotify
var Spotify = require("node-spotify-api")

var spotify = new Spotify({

  });
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });