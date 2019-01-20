// dotenv package
require("dotenv").config();

// variables for API and npm installs
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");

//Variables for user commands and inputs
var liriCommand = process.argv[2];
var input = process.argv.slice(3).join(" ");
//======================================================================

// LIRI Commands
//spotify-this, movie-this, do-this
function commands(liriCommand, input) {
  switch (liriCommand) {
    case "spotify-this":
      getSong(input);
      break;

    case "movie-this":
      getMovie(input);
      break;

    case "do-this":
      getRandom();
      break;

    //If no command is entered, this is the default message to user
    default:
      console.log(
        "INVALID. Please enter one of the following commands:'spotify-this', 'movie-this', 'do-what-it-says' followed by a query."
      );
  }
}
//========================================================================

// LIRI Command Functions

//Spotify function
function getSong(songName) {
  var spotify = new Spotify(keys.spotify);

  //If no song is provided, use "Bohemian Rhapsody"
  if (!songName) {
    songName = "Bohemian Rhapsody";
  }

  console.log(songName);

  //Callback to spotify to search for song name
  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(
      "Artist: " +
      data.tracks.items[0].artists[0].name +
      "\nSong name: " +
      data.tracks.items[0].name +
      "\nAlbum Name: " +
      data.tracks.items[0].album.name +
      "\nPreview Link: " +
      data.tracks.items[0].preview_url
    );

    //Creates a variable to save text into log.txt file
    var logSong =
      "Artist: " +
      data.tracks.items[0].artists[0].name +
      "\nSong name: " +
      data.tracks.items[0].name +
      "\nAlbum Name: " +
      data.tracks.items[0].album.name +
      "\nPreview Link: " +
      data.tracks.items[0].preview_url +
      "\n";

    //Appends text to log.txt file
    fs.appendFile("log.txt", logSong, function (err) {
      if (err) throw err;
    });

    logResults(data);
  });
}

//Function for movies
function getMovie(movieName) {
  // If movie isn't provided
  if (!movieName) {
    movieName = "Life Itself";
    console.log("\nIf you haven't watched Life Itself, then you should: <https://www.imdb.com/title/tt5989218/>\n"
    + "\nIts on Hulu!\n")
  }
  // variable for queryURL
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&apikey=trilogy";

  // debug
  console.log(queryUrl);

  //Callback to OMDB API to get movie info
  request(queryUrl, function (error, response, body) {
    // If there is no error 
    if (!error && response.statusCode === 200) {
      var movieObject = JSON.parse(body);
     // Show results in the terminal
      var movieResults =
        "------------------------------------------------------------" +
        "\r\n" +
        "Title: " +
        movieObject.Title +
        "\r\n" +
        "Year: " +
        movieObject.Year +
        "\r\n" +
        "Imdb Rating: " +
        movieObject.imdbRating +
        "\r\n" +
        "Country: " +
        movieObject.Country +
        "\r\n" +
        "Language: " +
        movieObject.Language +
        "\r\n" +
        "Plot: " +
        movieObject.Plot +
        "\r\n" +
        "Actors: " +
        movieObject.Actors +
        "\r\n" +
        "------------------------------------------------------------" +
        "\r\n";
      console.log(movieResults);

      //Appends movie results to log.txt file
      fs.appendFile("log.txt", movieResults, function (err) {
        if (err) throw err;
      });
      console.log("Saved!");
      logResults(response);
    } else {
      console.log("Error :" + error);
      return;
    }
  });
};
  //Function for Random
  function getRandom() {
    //Reads text in random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
        return console.log(error);
      } else {
        console.log(data);

        //creates a variable for data in random.txt
        var randomData = data.split(",");
        //passes data into liri Command on random.txt
        commands(randomData[0], randomData[1]);
      }
      console.log("test" + randomData[0] + randomData[1]);
    });
  }

  //Function to log results
  function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
      if (err) throw err;
    });
  }

  commands(liriCommand, input);