# liri-node-app

View the demo here: (https://www.youtube.com/watch?v=nFrTuzH_F8I)

For this project we created a Language Interpretation and Recognition Interface (LIRI)

This is a command line node app that searches through OMDB for movies and Spotify for songs. This app is meant to be run in the terminal.

Please make sure to download the following node modules to your workspace:
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Request](https://www.npmjs.com/package/request)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

To run the app for songs and movies, use the following commands:

```
node liri.js spotify-this [enter song]
node liri.js movie-this [enter movie]
```

To see what we have on the random.txt file, use the following command:
```
node liri.js do-this
```
Feel free to change around the random.txt in this file to make your own surprises!

All the data from your queries will be logged in a log.txt file.
