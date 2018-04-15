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

// variables for axios
// appToken is hardcoded and needs to be refreshed occasionally
const userId = '121421771'
const playlistId = '79UO9HP9psMNZtUPUWrk7C'
const appToken = 'BQAcg2PF-_gaLGe8Fzy57gFKFVZiBlyZmuLXfHHLqiNAV9pZkwdqv_OdYEx3S4_0YGli1Du9GaJe81-h7g7CVTI9zOJRyW7hfoAk3HUE0ZZkrMjvH51nwB3yfql_clicu9DgqcNQarTdEmOihPHL5Cnu-M-DXZU_5jroew9UcMRytd_Mof_VJ5UbXs3gUAPaW1dpVhoU0x_kxCym_xZnp-DjYXfuSA3rCX1zzWBtVZdftBZePvzu7Ua6DywWZKtBkXjQcH_Rhw'

// initializing the database
firebase.initializeApp(config);
const dbRefObject = firebase.database().ref().child('songs');

// render the current song and tracks into the screen
getCurrentSong()
getAllTracks()

/**
 * Function to get the current song that's playing. Makes a call to axios and appends the song and buttons
 * to the screen (appears on the bottom). If users click the up arrow 10 times, the spotify player will skip
 * the current song and move onto the next song.
 */
function getCurrentSong() {
    axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }
    ).then(r => {
        const skipObject = firebase.database().ref().child('skip')
        skipObject.once("value", function(data) {
            // console.log(r.data.item.href)
            appendCurrentTrack(r.data.item.name, r.data.item.artists[0].name, r.data.item.album.name, data.val(), r.data.item.album.images[2].url)
        })
    })
}

/**
 * Function to get all tracks and render them to the screen. Makes a call to the playlist/id/tracks
 * endpoint and on success loops through each track and appends the relevant information,
 * such as song name, artist, and album.
 */
function getAllTracks() {
    axios.get(
            'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
                headers: {
                    'Authorization': `Bearer ${appToken}`
                }
            }
        )
        .then(function(r) {
            r.data.items.map((item) => {
              // console.log(item.track.album.images[0].url)

                dbRefObject.once('value').then(function(snapshot) {
                    if (snapshot.val()[item.track.name] != undefined) {
                        appendSong(item.track.name, item.track.artists[0].name, item.track.album.name, snapshot.val()[item.track.name].score, item.track.album.images[2].url);
                    }
                })
            })
        });
}



/**
 * Function to append the current track with a skip button
 * @param {*} name: song name
 * @param {*} artistName
 * @param {*} albumName
 * @param {*} score
 */
function appendCurrentTrack(trackName, artistName, albumName, score, albumCover) {

    var mdcCardContainer = document.createElement("div");
    mdcCardContainer.setAttribute("class", "mdc-card mdc-card-container");

    document.getElementById("main").appendChild(mdcCardContainer);

    // create parent node
    var parentNode = document.createElement("div");
    parentNode.setAttribute("class", "song-container");
    parentNode.setAttribute("id", "song-container");

    // append parent node to main
    mdcCardContainer.appendChild(parentNode);

    // create container node for arrows
    var arrowContainerNode = document.createElement("div");
    arrowContainerNode.setAttribute("class", "arrow-container");

    // append arrow container node to parent node
    parentNode.appendChild(arrowContainerNode);

    // create and append up arrow
    var upArrow = document.createElement("img");
    upArrow.setAttribute("src", "src/up-arrow.png");
    upArrow.setAttribute("id", "arrow");
    arrowContainerNode.appendChild(upArrow);
    upArrow.onclick = function() { clickSkipArrow() };

    // append score to the right of the text
    var songScore = document.createElement("div");
    songScore.setAttribute("class", "score")
    songScore.setAttribute("id", "score")
    songScore.textContent = score;
    arrowContainerNode.appendChild(songScore);

    // create and append down arrow
    var downArrow = document.createElement("img");
    downArrow.setAttribute("src", "src/down-arrow.png");
    downArrow.setAttribute("id", "arrow");
    arrowContainerNode.appendChild(downArrow);
    downArrow.onclick = function() { clickDownArrow(trackName) };

    // create and append the album cover for each song
    var albumCoverNode = document.createElement("div");
    albumCoverNode.setAttribute("class", "album-cover");
    albumCoverNode.setAttribute("id", "album-cover");
    var cover = document.createElement('img')
    cover.setAttribute('src', albumCover)
    albumCoverNode.appendChild(cover)
    parentNode.appendChild(albumCoverNode);

    // create container node for tracks
    var trackContainerNode = document.createElement("div");
    trackContainerNode.setAttribute("class", "track-container");
    parentNode.appendChild(trackContainerNode);
    //
    // create track name node
    var trackNameNode = document.createElement("div");
    trackNameNode.setAttribute("class", "song-left");
    trackNameNode.setAttribute('id', 'curr-song')
    trackNameNode.textContent = "Current Track: " + trackName + ' (Upvote to skip!)';
    //
    // create track artist node
    var trackArtistNode = document.createElement("div");
    trackArtistNode.setAttribute("class", "song-left small");
    trackArtistNode.textContent = "Artist: " + artistName;

    // create track album node
    var trackAlbumNode = document.createElement("div");
    trackAlbumNode.setAttribute("class", "song-left small");
    trackAlbumNode.textContent = "Album: " + albumName;

    // // append track name node to parent
    trackContainerNode.appendChild(trackNameNode);
    trackContainerNode.appendChild(trackArtistNode);
    trackContainerNode.appendChild(trackAlbumNode);


}


/**
 * Function to append a song container with the song's information
 * @param {*} trackName
 * @param {*} artistName
 * @param {*} albumName
 * @param {*} score
 */
function appendSong(trackName, artistName, albumName, score, albumCover) {

    var mdcCardContainer = document.createElement("div");
    mdcCardContainer.setAttribute("class", "mdc-card mdc-card-container");

    document.getElementById("main").appendChild(mdcCardContainer);

    // create parent node
    var parentNode = document.createElement("div");
    parentNode.setAttribute("class", "song-container");
    parentNode.setAttribute("id", "song-container");

    // append parent node to main
    mdcCardContainer.appendChild(parentNode);

    // create container node for arrows
    var arrowContainerNode = document.createElement("div");
    arrowContainerNode.setAttribute("class", "arrow-container");

    // append arrow container node to parent node
    parentNode.appendChild(arrowContainerNode);

    // create and append up arrow
    var upArrow = document.createElement("img");
    upArrow.setAttribute("src", "src/up-arrow.png");
    upArrow.setAttribute("id", "arrow");
    arrowContainerNode.appendChild(upArrow);
    upArrow.onclick = function() { clickUpArrow(trackName) };

    // append score to the right of the text
    var songScore = document.createElement("div");
    songScore.setAttribute("class", "score")
    songScore.setAttribute("id", trackName);
    songScore.textContent = score;
    arrowContainerNode.appendChild(songScore);

    // create and append down arrow
    var downArrow = document.createElement("img");
    downArrow.setAttribute("src", "src/down-arrow.png");
    downArrow.setAttribute("id", "arrow");
    arrowContainerNode.appendChild(downArrow);
    downArrow.onclick = function() { clickDownArrow(trackName) };

    // create and append the album cover for each song
    var albumCoverNode = document.createElement("div");
    albumCoverNode.setAttribute("class", "album-cover");
    albumCoverNode.setAttribute("id", "album-cover");

    var cover = document.createElement('img')
    cover.setAttribute('src', albumCover)
    albumCoverNode.appendChild(cover)
    parentNode.appendChild(albumCoverNode);


    // create container node for tracks
    var trackContainerNode = document.createElement("div");
    trackContainerNode.setAttribute("class", "track-container");
    parentNode.appendChild(trackContainerNode);

    // create track name node
    var trackNameNode = document.createElement("div");
    trackNameNode.setAttribute("class", "song-left");
    // trackNameNode.setAttribute("id", trackName);
    trackNameNode.textContent = "Song: " + trackName;

    // create track artist node
    var trackArtistNode = document.createElement("div");
    trackArtistNode.setAttribute("class", "song-left small");
    trackArtistNode.textContent = "Artist: " + artistName;

    // create track album node
    var trackAlbumNode = document.createElement("div");
    trackAlbumNode.setAttribute("class", "song-left small");
    trackAlbumNode.textContent = "Album: " + albumName;


    // append track name node to parent
    trackContainerNode.appendChild(trackNameNode);
    trackContainerNode.appendChild(trackArtistNode);
    trackContainerNode.appendChild(trackAlbumNode);
    // parentNode.appendChild(albumCoverNode);


}

/**
 * Function to skip the current song
 * Keeps track of the value "skip" in the firebase database. Once the value becomes > 9, i.e 10 people want
 * to skip the song, the function makes an axios call to play the next song. The value in the firebase
 * db then resets to 0
 */
function clickSkipArrow() {
    const dbRef = firebase.database().ref()
    const skipObject = dbRef.child('skip');

    var currSong;

    skipObject.once("value", function(data) {
        // If you're already at 9 that means you are clicking it and the score will be 10 -> skip song
        if (data.val() == 5) {
            // axios call to skip song
            axios({
                    url: 'https://api.spotify.com/v1/me/player/next',
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${appToken}`
                    }
                })
                .then(r => {
                    // reset the current song that's playing
                    // setTimeout is used to ensure that it syncs up properly
                    setTimeout(() => {
                        axios.get(
                            "https://api.spotify.com/v1/me/player/currently-playing", {
                                headers: {
                                    'Authorization': `Bearer ${appToken}`
                                }
                            }
                        ).then(r => {
                            // console.log(r.data.item.album.images[2].url)
                            var imageDiv = document.getElementById('album-cover')
                            console.log(imageDiv.firstChild)
                            imageDiv.firstChild.src = r.data.item.album.images[2].url
                            document.getElementById('curr-song').textContent = 'Current Track: ' + r.data.item.name + ' (Upvote to skip!)'


                        })
                    }, 1500)
                })
            // reset the database value "skip" back to 0
            dbRef.update({ skip: 0 })
        } else {
            // You haven't hit 10 yet, just increment the value "skip" by 1
            dbRef.update({ skip: data.val() + 1 })
        }
    });
}

/**
 * Function to increment a song's score and reorder accordingly
 * @param {*} trackName
 */
function clickUpArrow(trackName) {
    var newOldIndex = 0;
    var found = false;
    axios.get(
        'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks', {
            headers: {
                'Authorization': `Bearer ${appToken}`
            }
        }
    ).then(function(r) {
        r.data.items.map((item) => {
            if (item.track.name !== trackName && found === false) {
                newOldIndex += 1;
            } else if (item.track.name === trackName) {
                found = true;
            }
        })

        dbRefObject.once("value", function(data) {
            const copy = Object.assign({}, data.val()[trackName])
            copy['score'] += 1
            dbRefObject.child(trackName).update({
                artist: copy.artist,
                album: copy.album,
                id: copy.id,
                score: copy.score
            })
        });

        dbRefObject.once("value", function(data) {

            // current song
            var currentSong = trackName;

            // master with all songs + metadata
            const copy = Object.assign({}, data.val());

            var betterThan = 0;
            var numSongs = Object.keys(copy).length - 1;

            // looping over each song
            for (key in copy) {

                // score of current song
                var currentSongScore = copy[currentSong]['score'];

                // score of not current song
                if (key != currentSong) {
                    var otherSongScore = copy[key]['score']
                    if (currentSongScore > otherSongScore) {
                        betterThan += 1
                    }
                }
            }

            var position = numSongs - betterThan;

            var index = 0;
            var above = 0;
            var below = 0;
            var equal = 0;

            for (key in copy) {

                // score of current song
                var currentSongScore = copy[currentSong]['score'] - 1;

                // score of not current song
                if (key != currentSong) {
                    var otherSongScore = copy[key]['score'];

                    if (currentSongScore > otherSongScore) {
                        above += 1;
                    } else if (currentSongScore < otherSongScore) {
                        below += 1;
                    } else {
                        equal += 1;
                    }
                    index = numSongs - above;
                }
            }

            var rangeStart = newOldIndex;
            var rangeLength = 1;
            var insertBefore = position - 1;


            axios({
                    method: 'put',
                    url: 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks',
                    data: {
                        range_start: rangeStart,
                        range_length: 1,
                        insert_before: insertBefore
                    },
                    headers: {
                        'Authorization': `Bearer ${appToken}`
                    }
                })
                .then(r => {
                    console.log(r)
                })
                .catch(e => {
                    console.log(e)
                })


        });

    });

}


// ---------------LOGIC FOR LIVE UPDATES------------

// songStore is a reference to the songs node and its children in the firebase db
const songStore = firebase.database().ref().child('songs');

// keep listening for any changes to the songStore nodes
// if any changes happen, update the textContent (score) in each element
songStore.on('value', function(snapshot) {
    for (let key in snapshot.val()) {
        var element = document.getElementById(key)
        if (element != null) {
            element.textContent = (snapshot.val()[key]['score'])
        }
    }
})

// skipStore is a reference to the "skip" key in the firebase db. It just has a number value
// indicating how many times people have clicked it.
const skipStore = firebase.database().ref().child('skip');

// update the dom as the value changes
skipStore.on('value', function(snapshot) {
    var element = document.getElementById('score')
    if (element != null) {
        element.textContent = snapshot.val()
    }
})


// Placeholder function for downvoting a song. We lots of difficulty in reordering the playlist with the
// upvote alone, so as of now the downvote isn't functional.
function clickDownArrow(trackName) { console.log(trackName) }
