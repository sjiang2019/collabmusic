# Collabify: _Save the worst songs for last_

#### Alex Chan, Steven Jiang, Drew Leonard

## Overview

Every social event or group hangout is bound to have music playing in the background. Whether you're meeting up with a group of friends, studying in One Wheelock, or hanging out in a frat basement, there is usually a Spotify playlist controlling the atmosphere from behind the scenes. In the current state of the world, one person controls the playlist, leaving everyone else with no other option but to listen along. With Collabify, we envision a world where everyone has the autonomy to choose what songs shape their atmosphere.

## Features

### Crowd-Voting

With our app, anyone with access to an instance of playlist can have their musical input and preferences considered. We've created a crowd-voting mechanism that places songs higher up on the playlist based on number of votes.

### Crowd-Veto
Have you ever started playing a song before realizing how much you disliked it? Our app also includes a crowd-veto feature that skips the current song, if enough people vote to skip it.

### Recommendations
Our app supplies three recommendations based off of the current state of the playlist.

## Getting started
- `npm install` or `yarn install`

- `npm start` or `yarn start`

- Navigate to [http://localhost:8080](http://localhost:8080) in your browser

- To test locally on multiple devices download ngrok, [here](https://ngrok.com/download)

	- Go to the location where you downloaded ngrok and run `./ngrok http 8080`

	- an https link will be generated that tunnels back to your localhost:8080

## Stack
* Firebase
* Spotify Web API
* Webpack
* Google Material Desgin Components



- There are also some scaling issues on mobile devices where songs with long names may run off the screen.
