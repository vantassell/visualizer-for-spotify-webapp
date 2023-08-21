(()=>{"use strict";function e(e){window.location.replace(function(e){const o=window.location.href.toString();console.log(`originURL: ${o}`);const n=o.split(e)[0];return console.log(`newURL: ${n}`),n}(e))}const o=1e3,n="https://avt-sv-api-16ae49589f38.herokuapp.com/visualizers",t=2,r="userData";function i(){2===t&&console.log("getting userData from localStorage");const e=window.localStorage.getItem(r);if(!e)return console.log("could not find userData in local storage, returning undefined"),{accessToken:void 0,refreshToken:void 0,expiresAt:void 0,email:void 0,displayName:void 0};const o=JSON.parse(e);return 2===t&&(console.log("userData pulled from localStorage: ",o),console.log("returning from getUserData")),o}function s({accessToken:e,refreshToken:o,expiresAt:n,email:s,displayName:a}){2===t&&console.log("updatingUserData");const l=i();e&&(l.accessToken=e),o&&(l.refreshToken=o),n&&(l.expiresAt=n),s&&(l.email=s),a&&(l.displayName=a),t>=1&&console.log("updating localStorage userData to ",l),window.localStorage.setItem(r,JSON.stringify(l))}let a,l,c=o,g=!1,u=null;console.log("starting players_basic.js");const{accessToken:k,refreshToken:d}=i();k||(console.log("No accessToken found"),console.log("exiting login.js"),e("/visualizers/basic")),d||(console.log("No refreshToken found"),console.log("exiting login.js"),e("/visualizers/basic"));const p=document.createElement("source");var f,y;p.setAttribute("type","video/webm"),p.setAttribute("crossOrigin","anonymous"),p.setAttribute("src","./../assets/star_loop_10x.webm"),document.getElementById("video-player").appendChild(p),console.log(`signed into players_basic with accessToken: ${k}\n and refreshToken: ${d}`),f=k,y=d,console.log("initial accessToken",f),console.log("initial refreshTOken",y),a=f,l=y,g=!0,async function e({prevSpotifyTrackLink:r}){if(console.log("polling api"),!g)return void console.log("continuePolling is false");const{title:i,artist:k,album:d,artworkURL:p,spotifyTrackLink:f,currentlyPlayingNothing:y,error:m}=await async function(){2===t&&console.log("starting getCurrentTrackFromSpotify");const e=(r={accessToken:a,refreshToken:l},Object.keys(r).map((e=>encodeURIComponent(e)+"="+encodeURIComponent(r[e]))).join("&"));var r;const i=`${n}?${e}`;2===t&&console.log(`query: ${i}`);const g=await fetch(i).catch((e=>(console.log(`ERROR failed fetch !!!\nError: ${JSON.stringify(e)}`),{error:!0,title:"Failed to fetch"})));if(!g)return console.log("response from api was undefined"),{error:!0,title:"Failed to fetch"};if(!g.ok){const e=`An error occurred: ${g.statusText}`;return console.log(`no response from server, tell AVT!\t${e}`),{error:!0,title:"Failed to fetch"}}const{title:u,artist:k,album:d,artworkURL:p,spotifyTrackLink:f,backOff:y,currentlyPlayingNothing:m,newAccessToken:T,newExpiresAt:w,error:h}=await g.json();return m?{artworkURL:p,currentlyPlayingNothing:m}:h?{error:h}:(y?c*=2:c=Math.max(.95*c,o),T&&(console.log(`recieved updated accessToken: ${T}`),s({accessToken:T}),a=T),w&&(console.log(`received updated expiredAt: ${w}`),s({expiredAt:w})),2===t&&console.log("exiting getCurrentTrackFromSpotify"),{title:u,artist:k,album:d,artworkURL:p,spotifyTrackLink:f})}();y&&console.log("\n\n\tERROR: currentlyPlayingNothing\n\n"),m&&console.log(`\n\tERROR: ${m}\n`),f===r||m||function({title:e,artist:o,album:n,artworkURL:t,spotifyTrackLink:r,currentlyPlayingNothing:i}){console.log(`Updating Track Info to\n--\n\t${e}\n\t${o}\n\t${n}\n\t${t}\n--`),document.querySelector(".trackInfo").innerHTML=e&&o&&n?`\n      <p id="track_title">Track: ${e}</p>\n      <p id="track_artist">Artist: ${o}</p>\n      <p id="track_album">Album: ${n}</p>\n  `:"",i&&(document.querySelector(".trackInfo").innerHTML=`\n      <p>${i}\n    `),document.querySelector(".artworkContainer").innerHTML=t?`\n        <img\n           class="artwork"\n           id="track_artowrk"\n           src=${t}\n           alt="album art"\n       />\n  `:"",r&&document.getElementById("spotify-linkback-button").addEventListener("click",(()=>{console.log("linkback clicked!"),console.log(`linkback: ${r}`),window.location.assign(r)}))}({title:i,artist:k,album:d,artworkURL:p,spotifyTrackLink:f,currentlyPlayingNothing:y}),u=setTimeout((()=>{e({prevSpotifyTrackLink:f})}),c)}({prevSpotifyTrackLink:""}),console.log("leaving players_basic.js")})();