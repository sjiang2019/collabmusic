const $ = require('jquery');
const axios = require('axios');
var firebase = require('firebase');

// firebase setup for chan's account
var config = {
  apiKey: "AIzaSyBY9IbaziUb2xDOrVVXlVaTcuaQ1TFlRk4",
  authDomain: "spotify-collab-4ffdc.firebaseapp.com",
  databaseURL: "https://spotify-collab-4ffdc.firebaseio.com",
  projectId: "spotify-collab-4ffdc",
  storageBucket: "",
  messagingSenderId: "831686907388"
};

// initializing the database
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('songs');

// variables for axios
var userId = '121421771',
    playlistId = '79UO9HP9psMNZtUPUWrk7C';

// make a get request to get all the tracks in the playlist
// uses drew's hardcoded token
axios.get(
        'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
            headers: {
                "Authorization": "Bearer BQCWmyxJOB-W8miIHQ1pjOzA8C1-KZyBge1Rt_ICkvDEOVHEYDHnjJ_7dttPU8gE60CpH2LunFIH0jBgF4uAcpsnpcI0oKRXfGp_rxH3R9OHVx6ASwht4CtHHXN7BHFgFgYV_xPrF48_ceStOqTnovueST2_hIvSMr-K_81R287XDE6rBMaGe9srXuZc9oCFJ6RLxUbBuqbLE79w5NTZf1UwRcYoEI0tFH5G3J-vGdhmtZI9f0X0FeRDS7XnTbFhGX9NOmVmtw"
            }
        }
    )
    // On successful call with axios
    // loop through all the items and add the songs to the page with their scores
    .then(function(r) {
        r.data.items.map((item) => {
            dbRefObject.once('value').then(function(snapshot) {
              appendSong(item.track.name, item.track.artists[0].name, item.track.album.name, snapshot.val()[item.track.name].score);
            })
        })
    });

// Function to append song, takes in trackName, artistName, albumName, and score
function appendSong(trackName, artistName, albumName, score) {

    // create parent node
    var parentNode = document.createElement("div");
    parentNode.setAttribute("class", "song-container");

    // append parent node to main
    document.getElementById("main").appendChild(parentNode);

    // create container node for arrows
    var arrowContainerNode = document.createElement("div");
    arrowContainerNode.setAttribute("class", "arrow-container");

    // append arrow container node to parent node
    parentNode.appendChild(arrowContainerNode);

    // create and append up arrow
    var upArrow = document.createElement("img");
    upArrow.setAttribute("src", "src/up-arrow.png");
    arrowContainerNode.appendChild(upArrow);
    upArrow.onclick = function() { clickUpArrow(trackName) };

    // create and append score
    var songScore = document.createElement("div");
    songScore.textContent = score;
    arrowContainerNode.appendChild(songScore);

    // create and append down arrow
    var downArrow = document.createElement("img");
    downArrow.setAttribute("src", "src/down-arrow.png");
    arrowContainerNode.appendChild(downArrow);
    downArrow.onclick = function() { clickDownArrow(trackName) };

    // create container node for tracks
    var trackContainerNode = document.createElement("div");
    trackContainerNode.setAttribute("class", "track-container");
    parentNode.appendChild(trackContainerNode);

    // create track name node
    var trackNameNode = document.createElement("div");
    trackNameNode.setAttribute("class", "song-left");
    trackNameNode.textContent = trackName;

    // append track name node to parent
    trackContainerNode.appendChild(trackNameNode);
}

function clickUpArrow(trackName) {
  dbRefObject.once("value", function(data) {
    // console.log(dbRefObject.child(trackName))
    const copy = Object.assign({}, data.val()[trackName])
    copy['score'] += 1
    // console.log(copy)
    dbRefObject.child(trackName).set({
      artist: copy.artist,
      album: copy.album,
      id: copy.id,
      score: copy.score
    })
  });
   console.log('Upvoted ', trackName)
}


function clickDownArrow(trackName) { console.log(trackName) }
