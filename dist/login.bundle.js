(()=>{"use strict";const e="userData";function o(){console.log("getting userData from localStorage");const o=window.localStorage.getItem(e);if(!o)return console.log("could not find userData in local storage, returning undefined"),{accessToken:void 0,refreshToken:void 0,expiresAt:void 0,email:void 0,displayName:void 0};const a=JSON.parse(o);return console.log("userData pulled from localStorage: ",a),console.log("returning from getUserData"),a}console.log("hello from login.js"),function(){const a=window.location.search,s=new URLSearchParams(a);console.log("starting saveQueryParamsToUserData");const l=s.get("accessToken"),n=s.get("refreshToken"),r=s.get("expiresAt"),t=s.get("email"),i=s.get("displayName");l||console.log("failed to parse accessToken from params"),n||console.log("failed to parse refreshTokenfrom params"),r||console.log("failed to parse expiresAt from params"),t||console.log("failed to parse email from params"),i||console.log("failed to parse displayName from params"),function({accessToken:a,refreshToken:s,expiresAt:l,email:n,displayName:r}){console.log("updatingUserData");const t=o();a&&(t.accessToken=a),s&&(t.refreshToken=s),l&&(t.expiresAt=l),n&&(t.email=n),r&&(t.displayName=r),console.log("updating localStorage userData to ",t),window.localStorage.setItem(e,JSON.stringify(t))}({accessToken:l,refreshToken:n,expiresAt:r,email:t,displayName:i}),console.log("exiting saveQueryParamsToUserData")}();const a=o();console.log(a);const s=window.location.toString().split("/login")[0];console.log(`baseURL: ${s}`);const l=s;console.log(`redirecting to: ${l}`),window.location.replace(l),console.log("exiting login.js")})();