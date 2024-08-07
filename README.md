# What is a Visualizer for Spotify?

Visualizer-for-Spotify is a website that shows what your spotify is currently playing.

_NOTE: This visualizer doesn't play sound, just video (sorry, it can't happen until spotify updates their SDK)._

Rather than build this as an API + WebApp, I'm hosting a very limited API alongside the webapp on the same server in this monorepo. <br>

✨ Check it out ---> [Link to Live Demo](https://shark-app-yfh2j.ondigitalocean.app)

<br>

<br><br>

# Notes for building + deploying

## WebOS

### Good page for docs

https://webostv.developer.lge.com/develop/tools/cli-dev-guide#ares-generate

### Generate Hosted WebApp

`ares-generate --list`
Tells you all the options

`ares-generate -t hosted_webapp ./SpotifyViz`
Points to an external site, webapp is effectively a container for a url pointing to your app.

The above creates an `index.html` file that you'll update with the webapp's url

#### Package

For development (and debugging) run `ares-package --no-minify ./SpotifyViz`

For production, use `ares-package ./SpotifyViz`

### Deploy to local LG WEBOS

#### Get list of tv devices

Find out the name of your device
`ares-setup-device --list`

#### Install onto device

`ares-install --device avt-lg ./com.domain.app_0.0.1_all.ipk`

#### Remove from device

`ares-install --device avt-lg --remove com.domain.app`

#### Launch

`ares-launch --device avt-lg com.domain.app`

#### Debug (aka inspect)

Launch the app, then run `ares-inspect --device avt-lg --app com.domain.app --open`

#### Close

`ares-launch --device avt-lg --close com.domain.app`

### All In One

`ares-package --no-minify ./spotifyviz && ares-install --device avt-lg ./com.domain.app_0.0.3_all.ipk && ares-inspect --device avt-lg --app com.domain.app --open`

### Simulator Commands

No need to build, you can install the folder directly
`ares-launch -s 23 ./spotifyviz`

## Heroku Settings

Add these env variables.

`NPM_CONFIG_PRODUCTION=false`
`YARN_PRODUCTION=false`

### Check logs from terminal for current deployment

`heroku logs --tail`

# Running Webpack

`index.html` imports a `bundle.js` that lives in the `dist` folder that Webpack creates. Run the below to update `bundle.js` with anything from **npm**.

`npm run build`

# Encoding background video

source: https://pixelpoint.io/blog/web-optimized-video-ffmpeg/

First Try
`ffmpeg -i input.mov -c:v libx265 -crf 32 -vf scale=3840:-2 -preset veryslow -tag:v hvc1 -movflags faststart -an output.mp4`

Using rain.mp4 setting for universality
`ffmpeg -i star_loop.webm -c:v libx264 -pix_fmt yuv420p -movflags +faststart star_loop.mp4`

Add loop during encoding
`stream_loop 10` --> 10x loops
NOTE: `stream_loop` must come before `-i`

Revised encoding as of 8.1.23
`ffmpeg -stream_loop 10 -i 200922_LoopStars.mov -c:v libx265 -crf 28 -vf scale=3940:-2 -preset veryslow -tag:v hvc1 -pix_fmt yuv420p -movflags faststart -an output3.mp4`

`ffmpeg -i 200922_LoopStars.mov -c:v libvpx-vp9 -crf 28 -vf scale=3840:-2 -pix_fmt yuv420p -deadline best -an output_420_10x.webm`

TODO: Consider doing two-pass compression on the webm. I don't know what bitrate, but pick something around 2k (??)
`ffmpeg -i 200922_LoopStars.mov -c:v libvpx-vp9 -b:v 0 -crf 20 -vf scale=3840:-2 -pix_fmt yuv420p -deadline best -an -f null /dev/null && \ ffmpeg -i 200922_LoopStars.mov -c:v libvpx-vp9 -crf 20 -pix_fmt yuv420p -deadline best -pass 2 -an output_420.webm`

## ffmpeg docs for vp9 encoding

`https://trac.ffmpeg.org/wiki/Encode/VP9`

## encoding video file as base64 via terminal

`echo "data:video/webm;base65,"$(cat ./star_loop_short.webm | base64) >> encode.txt`

## Testing

Note: There are two testing suites. One runs while no song is playing, the other runs while the song is playing. Due to Spotify's restrictions on controling playback via a simulated browser, you'll need to manually play the below linked playlist before running `currently-playing`.
https://open.spotify.com/playlist/6hUrtuxWmdur8A7DFkZAYY

Run Tests without window
`npx cypress run`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
