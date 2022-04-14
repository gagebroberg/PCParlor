// const fetch = require('node-fetch')
const ebaySearch = require('./ebaySearch.js').ebaySearch;

ebaySearch("rtx 2060")
.then((response) => {
    console.log("successful eBay search call");
    let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];

    
    let two_items = listings.slice(0, 2);
    console.log(two_items);

})
.catch((err) => {
    console.error(err);
});
