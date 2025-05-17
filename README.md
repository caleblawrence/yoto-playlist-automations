# yoto-playlist-automations

This application processes a list of media links (such as Youtube videos) and downloads each file to a folder so it can be uploaded on a DIY Yoto card (A Yoto is a low tech kids music player and you can make custom Yoto cards with your own files). Notion makes it easy to have a running todo list of songs or other items to put on a card and this automation conveniently downloads each file and converts it to an mp3 for you.

### Steps to run locally

Download the latest [https://github.com/yt-dlp/yt-dlp/releases](yt-dlp) binary and put it in the root of this project. You might have to run `chmod +x yt-dlp` after that.

I tried installing it with Homebrew but it doesn't appear to work at the moment.

Create a Notion table and setup the the secrets. Then run `npm i` and `npm run dev`.

### Future work

- Upload the file to a designated yoto Playlist automatically? This is partially implemented but its not done yet. There are a stream of requests that make this happen and I have not completely implemented the feature. It looks like it does a PUT on the yoto card and includes all the existing songs on it so I'll have to do some work to read the current playlist and then form the PUT request after putting the file into their S3 bucket. I probably need to check with them if this is something I can even do.
