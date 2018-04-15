const $ = require('jquery');
const axios = require('axios');

// var response;

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
        r.data.items.map((item) => {
            appendSong(item.track.name, item.track.artists[0].name, item.track.album.name);
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

function clickDownArrow(trackName) { console.log(trackName) }