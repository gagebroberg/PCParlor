const facebookSearch = require('./facebookSearch.js').facebookSearch;

facebookSearch("rtx 2060")
.then((resp) => {console.log(resp)})
.catch(err => {console.log(err)});
