const $ = require('jquery');
const axios = require('axios');
var firebase = require('firebase');

// firebase setup
var config = {
  apiKey: "AIzaSyBY9IbaziUb2xDOrVVXlVaTcuaQ1TFlRk4",
  authDomain: "spotify-collab-4ffdc.firebaseapp.com",
  databaseURL: "https://spotify-collab-4ffdc.firebaseio.com",
  projectId: "spotify-collab-4ffdc",
  storageBucket: "",
  messagingSenderId: "831686907388"
};

firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('songs');


// get all the songs int he database
const songs = {}
dbRefObject.on('value', snap => {
  for (let key in snap.val()){
    if (key in songs){
      songs[key] = 0
    }
  }
}, error => {
  console.log(error.code)
})




var userId = '121421771',
    playlistId = '79UO9HP9psMNZtUPUWrk7C';

axios.get(
        'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
            headers: {
                "Authorization": "Bearer BQA0arzI184LKZ8SyYkpVdWjoeLglfSrQLiRjw4oXqztkBh9ktrSMhjqnVjmaR4c0dZH2PU6ZdW02p-xQbwCvLqR0gUmEWAdDTH5Ep60c8uSqXaTgzrCfXid6WKRLlOT8gR7WLdOFVyLzvASnhkQjVqkJZAmPTsTylazlh74V1j2pqPTZa_La6Hj8opBqONFviePjIdCsEYcFB5rRsDKIk9aK4VBMYVmk_SWYNEkc7KWyPmyrtCtcCYgqhQG3c7un9SHDw_7LA"
            }
        }
    )
    .then(function(r) {
        // loop through all the items in the api call and if they're not alreayd in the
        // db then add it, with score 0
        r.data.items.map((item) => {
            appendSong(item.track.name, item.track.artists[0].name, item.track.album.name);
            console.log(item.track.name);
            if (!(item.track.name in songs)){
              dbRefObject.child(item.track.name).set({
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                score: 0,
                id: item.track.id,
              })
            }

        })
    });

function appendSong(trackName, artistName, albumName) {

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

appendSong();

function clickUpArrow(trackName) { console.log(trackName) }


appendSong();
function clickDownArrow(trackName) { console.log(trackName) }
