// import the ENV information
require("dotenv").config();
// API Key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// import request NPM
var request = require('request');
request("http://www.omdbapi.com/?apikey=[75c70b0]&" + input, function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the Google homepage.
});

var process = process.argv[2];
var input = process.argv[3];

switch (process) {
	case "my-tweets":
		// code code code code code code 
		// code code code code code code 
		// code code code code code code 
		// code code code code code code 
		break;
	case "spotify-this-song":
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	break;
	case "movie-this":
		// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
	// code code code code code code 
break;
default: "That is not an option.  The currently support lists are 'my-tweets', 'movie-this' and 'spotify-this-song'."
}