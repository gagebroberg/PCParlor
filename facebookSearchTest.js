const facebookSearch = require('./facebookSearch.js').facebookSearch;

facebookSearch("gpu")
.then((resp) => {console.log(resp)})
.catch(err => {console.log(err)});
