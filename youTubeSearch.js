const fetch = require('node-fetch')

async function youtubeData(search_term){
    let youtubeURI = 'https://www.googleapis.com/youtube/v3/search?';

    const response = await fetch(youtubeURI + new URLSearchParams({
        'part': 'snippet',
        'q': search_term,
        'maxResults': '1',
        'key': 'AIzaSyCE19kiCJOS7QECVs6iNGld28ujL0iJS-8'
    }))

    return response.json();
}
module.exports.youtubeData = youtubeData;