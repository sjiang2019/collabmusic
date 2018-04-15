#CollabMusic

Alex Chan, Steven Jiang, Drew Leonard

In most social events/gatherings, there is bound to be music playing in the background. Whether you're meeting up with a group of friends, studying in One Wheelock, hanging out in a frat basement, or any other environment there is usually a spotify playlist that supplies the music. The problem is that only one person can control that instance of the playlist, leaving everyone else with no other option but to listen along.

With our app, anyone with the link to the page can have their musical input and preferences considered. We've created a voting system that more-liked songs higher up on the playlist and created a feature that skips songs that people hate. 

## Getting started
- `npm install` or `yarn install`

- `npm start` or `yarn start`

- Navigate to [http://localhost:8080](http://localhost:8080) in your browser

- To test locally on multiple devices download ngrok, [here](https://ngrok.com/download)

	- Go to the location where you downloaded ngrok and run `./ngrok http 8080`

	- an https link will be generated that tunnels back to your localhost:8080


## Future work

Here are some things that didn't quite work that we hope to fix in the near future.

- Our reording algorithm isn't perfect and in some edge cases may fail due to index out of bound errors. 

- We had trouble getting an access token to refresh, so we just update it ourselves every 1.5 hours

