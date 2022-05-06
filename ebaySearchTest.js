

// const fetch = require('node-fetch')

const ebaySearch = require('./ebaySearch.js').ebaySearch;

ebaySearch("rtx 2060", 1)
.then((response) => {
    // console.log(response);
    if(response['findItemsAdvancedResponse']['ack'] == 'Failure'){
        throw response['findItemsAdvancedResponse']['errorMessage'][0]['error'][0];
    }
    
    let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
        
    let two_items = listings.slice(0, 2);
    console.log(two_items);

})
.catch((err) => {
    console.error(err);
});
