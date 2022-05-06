const facebookSearch = require('./facebookSearch.js').facebookSearch;
// import facebookSearch from 'facebookSearch.js'

facebookSearch("rtx 2060")
.then((resp) => {console.log(resp)})
.catch(err => {console.log(err)});
