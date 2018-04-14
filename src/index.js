const $ = require('jquery');
const axios = require('axios');

// var response;

var userId = '121421771',
    playlistId = '79UO9HP9psMNZtUPUWrk7C';

axios.get(
        'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
            headers: {
                "Authorization": "Bearer BQDDPmBRhsnyXWl12Q1KuVbUQxbLAjTOaylDj214fQE-boWrba36M6kL2kMEKwnnqDXYf0zKnSN0ryKD7Q2XKpO8dpY_4FbJmNoCAgtmdEWGKrwGkUanMZOCM04DZDQEf5ZEulWBpLh3BEpDCKaUun1_Nj0zgW_ODmC-q93eCF5wnpHsTFKgfY5vcj5Ud1iwq0r3Ge1k05-QlDom_r0LeHxSSS985BGnmCN6mRG97EbWSrDhRQp1v2BG2ri4F_QeAqNw2RHcvg"
            }
        }
    )
    .then(function(r) {
        r.data.items.map((item) => {
            appendSong(item.track.name, item.track.artists[0].name, item.track.album.name);
            console.log(item.track.name);
        })
        console.log(r.status);
    });



function appendSong(trackName, artistName, albumName) {

    // parent node
    var parentNode = document.createElement("div");
    parentNode.setAttribute("class", "song-container");

    // child node
    var childNode = document.createElement("div");
    childNode.setAttribute("class", "song-left");
    childNode.textContent = trackName;

    parentNode.appendChild(childNode);

    // append node to main
    document.getElementById("main").appendChild(parentNode);
}


appendSong();