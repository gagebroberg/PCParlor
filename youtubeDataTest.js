// const fetch = require('node-fetch')
const youtubeData = require('./youtubeData.js').youtubeData;

youtubeData("rtx_2060")
.then((response) => {
    console.log("successful youtube search call");
    let video = response['items'][0]['snippet']['title'];
    console.log(video);
})
.catch((err) => {
    console.error(err);
});
