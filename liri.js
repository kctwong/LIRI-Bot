require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");

// inquirer.prompt([
//     {
        // type: "list",
        // message: "What would you like to do?"
        // choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        // name: "selections"
        //     }
// ]).then(function(data){

// })

var userinput = process.argv[2];

function choosefunction(userinput){
    switch (userinput){
        case "my-tweets": 
            myTweets();
            break;
        case "spotify-this-song":
            spotifythissong("I Want it That Way");
            break;
        case "movie-this":
            movieThis();
            break;

    }
}


function myTweets(){
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: "kctwong",
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(!error) {
            for (var i=0; i<tweets.length; i++){
                console.log("------------------------------------");
                console.log("Tweet: " + tweets[i].text);
                console.log("Tweet Number " + (i+1));
                console.log("Created at " + tweets[i].created_at);
            } 
      }
      else {
          console.log(error);
      }
    });
}

function spotifythissong(song){
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: "track", query: song}, function(err, data){
        if (!error){
            console.log('Artist Name: '+results.tracks.items[0].artists[0].name);
            console.log('Song Name: '+results.tracks.items[0].name);
            console.log('Spotify URL: '+results.tracks.items[0].preview_url);
            console.log('Album Name: '+results.tracks.items[0].album.name);
        } else{
            
        }
    }


// Show song info including 
// 1) Artist(s); 
// 2) The song's name; 
// 3) A preview link of the song from spotify; 
// 4) The album that the song is from
// If no song then default to "The Sign" by Ace of Base
// function spotify-this-song(){

//}


function movieThis(){
    var queryURL = "https://www.omdbapi.com/?t=" + "The Incredible" + "&y=&plot=short&apikey=trilogy"
    request(queryURL, function(error, response, body){
        if(!error && response){
            console.log(JSON.parse(body)["Title"]);
            console.log(JSON.parse(body)["Year"]);
            console.log(JSON.parse(body)["imdbRating"]);
            console.log(JSON.parse(body)["tomatoRating"]);
            console.log(JSON.parse(body)["Country"]);
            console.log(JSON.parse(body)["Language"]);
            console.log(JSON.parse(body)["Plot"]);
            console.log(JSON.parse(body)["Actors"]);
        }
        else {
            console.log(error);
        }
    })
}
            //year
            //IMDB rating
            //rotten tomato rating
            //country where the movie was produced
            //langauge of the movie
            //plot of the movie
            //actors in the movie

//         };
//     });
// }

// function do-what-it-says(){

//}