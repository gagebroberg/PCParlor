
const puppeteer = require("puppeteer");

const location = 109349102424072;

async function facebookSearch(searchTerm) {
    // setting up puppeteer
   const browser = await puppeteer.launch({
       args: ['--no-sandbox', '--disable-setuid-sandbox'],
   })
   
   try {
       const page = await browser.newPage()
    
        // create an empty list where we will store item objects
        var newItems = [];
        try{
            // format any spaces in the search term before inclusion in the search URL
            searchTerm = searchTerm.replace(/ /g,'%20');
        }
        catch(err){}//do nothing

        console.log(`\nResults for ${searchTerm}:\n`)
        // direct puppeteer to search URL
        // the url includes a parameter to only show items listed in the last day
        await page.goto(`https://www.facebook.com/marketplace/${location}/search/?sortBy=best_match&query=${searchTerm}&exact=true`, {
        waitUntil: 'networkidle2'
        });
        
        // evaluate the entire page HTML including script tags
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);
        // take out the search results and parse it as JSON
        let searchResult = JSON.parse(bodyHTML.split(/(?:"marketplace_search":|,"marketplace_seo_page")+/)[2]);
        let items = searchResult["feed_units"]["edges"]

        // console.log("Found " + items.length + " items\n");
        // console.log(items)
        if (items.length == 1){
            if (items[0]['node']['story_type'] == 'SERP_NO_RESULTS'){
                return []
            };
        }

        // check if there are any search results
        // loop through each item and create an item object with attributes
        if (items.length > 1){
            items.forEach(val => {
                if (val['node']['story_type'] == 'SERP_NO_RESULTS'){
                    return []  // prob an error with facebook query
                };

                var ID = val['node']['listing']['id'];
                var link = `https://www.facebook.com/marketplace/item/${val['node']['listing']['id']}`;
                var title = val['node']['listing']['marketplace_listing_title'];
                var price = val['node']['listing']['listing_price']['formatted_amount'];
                if (!price.includes('.')) {
                    price = price + ".00"
                }
                var imgLink = val['node']['listing']['primary_listing_photo']['image']['uri'];
                var sellerName = val['node']['listing']['marketplace_listing_seller']['name'];
                var sellerCity = val['node']['listing']['location']['reverse_geocode']['city_page']['display_name'];
                var delTypes = val['node']['listing']['delivery_types'];

                var item = {title: title, price: price, link: link, imgLink: imgLink, sellerName: sellerName, sellerCity: sellerCity, delTypes: delTypes, id:ID}
                // check if item exists in JSON file of pastItems
                newItems.push(item);  
            });
        }
        await browser.close();
        return newItems;
    } catch (error) {
        console.log("Error with facebook listings:", error)
        await browser.close();
        return [];
    }
   
}
// export {facebookSearch};
module.exports.facebookSearch = facebookSearch;