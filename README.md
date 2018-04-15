#Collabify: Save the Worst Songs for Last

Alex Chan, Steven Jiang, Drew Leonard

In most social events/gatherings, there is probably music playing in the background. Whether you're meeting up with a group of friends, studying in One Wheelock, hanging out in a frat basement, or any other environment there is usually a spotify playlist that supplies the music. The problem is that generally playlists are made by a single person but they're made for a group of people. As a result there is always an issue of how to order your playlist. Rather than have a single person run the music, Collabify allows everyone to contribute to the music they want to hear.

With our app, anyone with the link to the page can have their musical input and preferences considered. We've created a voting system that more-liked songs higher up on the playlist and created a feature that skips songs that people hate. With our app, people can choose the songs that they want to hear and save the worst songs for last.

## Getting started
- `npm install` or `yarn install`

- `npm start` or `yarn start`

- Navigate to [http://localhost:8080](http://localhost:8080) in your browser

- To test locally on multiple devices download ngrok, [here](https://ngrok.com/download)

	- Go to the location where you downloaded ngrok and run `./ngrok http 8080`

	- an https link will be generated that tunnels back to your localhost:8080


## Future work

Here are some things that didn't quite work that we hope to fix in the near future.

- We would like to have a limit on the number of votes a user can select in addition to a downvote system.

- Right now our app token is hardcoded since we decided to prioritize authentication for later.

- There are also some scaling issues on mobile devices where songs with long names may run off the screen.
