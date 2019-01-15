// import the dotENV which pulls the info from .env into the keys file
require("dotenv").config();

// variable of keys that imports info with the keys.js file via the dotENV.
var keys = require("./keys.js");
// bringing in the other items for npm install for reference later
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

// // API Key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// capture the user command
var uProcess = process.argv[2];
// storing this as a variable
var arg3 = process.argv[3];

// capture the input
var input = "";
// capture the input dynamically based on how many separate words the user puts in via for loop
for (var i = 3; i < process.argv.length; i++) {
	input += process.argv[i] + "+";
}

// placeholder variable to make it easier for the console.log if movie-this isn't followed with input
var nobodyText =
	"\n If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947\nIt's on Netflix!";

// function for doing the omdb call via request npm 
function omdbCall(object) {
	// request url is omdpapi w/ api key, passed object and then a callback function
	request("http://www.omdbapi.com/?apikey=75c70b0&t=" + object, function (error, response, body) {
		// erroer handling
		if (!error && response.statusCode == 200) {
			// easy variables
			var body = JSON.parse(body);
			var movieInfo = {
				"Title": body.Title,
				"Release Year": body.Year,
				"IMDB Rating": parseInt(body.imdbRating),
				"Rotten Tomatoes Rating": body.Ratings[1].Value,
				"Country of Production": body.Country,
				"Language(s)": body.Language,
				"Plot": body.Plot,
				"Actors ": body.Actors
			}
			// print the JSON object out
			return console.log(JSON.stringify(movieInfo, null, 2));
		}
		// error handling
		console.log(error);
	})
}
// API call via twitter npm to ask for 20 tweets at my handle with a callback function 
function twitterCall() {
	client.get('search/tweets', { q: 'jbs_twitbot', count: 20 }, function (error, tweets, response) {
		if (!error) {
			console.log("\n-------------------")
			console.log("\n Now searching Twitter user @jbs_twitbot ! \n]")
			for (var i = 0; i < 20; i++) {
				console.log("\n-------------------")
				console.log("Tweet #" + (i + 1))
				console.log(tweets.statuses[i].text)
				console.log("Time Tweet Created:" + tweets.statuses[i].created_at)
			}
			return console.log("Twitter Feed complete!")
		}
		console.log("There was an error, please try again!")
	})
};
// spotify api call function with a passed object.  Limiting to 1 for speed's sake
function spotifyCall(object) {
	spotify.search({ type: 'track', query: object, limit: 1 }, function (err, data) {
		if (err) {
			return console.log("There was an error of " + err)
		}
		// easy storage of our song
		var song = data.tracks.items[0];

		var printsong = {
			'Artist(s)': song.artists[0].name,
			'Name': song.name,
			'Preview Link': song.preview_url,
			'Album': song.album.name
		}
		console.log(JSON.stringify(printsong, null, 2));
	})
}

function doWhat() {
	// use FS to read the info in random.txt
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log("There was an error with the do-what-it-says input")
		}
		// split on the , and store as an array
		var inputArr = data.split(',');
		// switch tree based on first item in random.text
		switch (inputArr[0]) {
			case "spotify-this-song":
				spotifyCall(inputArr[1]);
				break;
			case "my-tweets":
				twitterCall();
				break;
			case "movie-this":
				omdbCall(inputArr[1]);
				break;
			default:
				console.log("There was nothing readable in the file");
		}
	})
}
// switch case that determines what we do based off argv2 in the master function
switch (uProcess) {
	case "my-tweets":
		return twitterCall();
		break;
	case "spotify-this-song":
		// if there was any input after the spotify-this-song command we will search it
		if (arg3) {
			console.log("\n You made a search in the Spotify API");
			return spotifyCall(input);
		}
		// otherwise we do the default Ace of Bass
		console.log("\n You didn't specify anything so here is 'I Saw the Sign' by Ace of Bass");
		return spotifyCall("The Sign Ace of Base")
		break;
	case "movie-this":
		// if there was any input after the movie-this we will search for it
		if (arg3) {
			return omdbCall(input)
		}
		// otherwise we will look for Mr Nobody 
		console.log(nobodyText)
		omdbCall("Mr Nobody");
		break;
	case "do-what-it-says":
		doWhat();
		break;
	default: "That is not an option.  The currently support lists are 'my-tweets', 'movie-this' and 'spotify-this-song'."
}