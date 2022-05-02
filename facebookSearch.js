const puppeteer = require("puppeteer");


async function facebookSearch(searchTerm) {
  let browser;
  const HEADLESS = true;
  
  browser = await puppeteer.launch({ headless: HEADLESS });
  const page = await browser.newPage();

  try {
    searchTerm = searchTerm.replaceAll(' ','%20');
  } catch (error) {
    // do nothing
  }

  const location = 109349102424072;  // To-do, replace with a variable
  const url = `https://www.facebook.com/marketplace/109349102424072/search/?query=${searchTerm}`;


  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  // await page.waitForTimeout(1000);

  // function used by puppeteer to get facebook listings
  function getItems(){
    var titlesAndLocations = document.getElementsByClassName('a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7'); //start titles at 14
    var titles = [];
    var prices = document.getElementsByClassName('d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em mdeji52x a5q79mjw g1cxx5fr lrazzd5p oo9gr5id');
    var locations = document.getElementsByClassName('a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5 ojkyduve');
    var links = document.links
    var productLinks=[];
    var result = [];
    var titleStartIndex = 0;
    for(let i = 0; i < titlesAndLocations.length; i++) {
      if(titlesAndLocations[i].textContent.indexOf("Notify Me") > -1)
        titleStartIndex = i+1;
    }

    for(let i = titleStartIndex; i < titlesAndLocations.length; i += 2) {
      titles.push(titlesAndLocations[i]);
    }

    for(let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf("post") > -1)
        productLinks.push(links[i].href.toString());
    }

    for(let i = 0; i < prices.length; i++) {
      var tempTitle;
      var tempPrice;
      var tempLocation;
      var tempLink;
      tempTitle = titles[i].textContent;
      tempPrice = prices[i].textContent;
      tempLocation = locations[i].textContent;
      tempLink = productLinks[i];
      
      const product = {
        title: tempTitle,
        price: tempPrice,
        location: tempLocation,
        link: tempLink
      };
     result.push(product);
    }
    
    return JSON.stringify(result);
  }

  const items = await page.evaluate(getItems);
  // resend request up to 3 times
  for (let i = 0; (i < 5) && (items.length == 0); i++){
    items = await page.evaluate(getItems);    
  }


  
  //convert big string into array of items
  var parsingProducts = items.split('},{');
  var listOfProducts = [];

  let success = false
  for (let i = 0; (i < 5) && (!success); i++){

    try {
      for(let i = 0; i < parsingProducts.length; i++) {
        var variables = parsingProducts[i].split('\",\"');
        var indexTitle = variables[0].indexOf('title') + 8;
        var indexPrice = variables[1].indexOf('price') + 8;
        var indexLocation = variables[2].indexOf('location') + 11;
        var indexLink = variables[3].indexOf('link') + 7;

        var indexLinkEnd = variables[3].indexOf('=post') + 5;

        var tempTitle = variables[0].substring(indexTitle);
        var tempPrice = variables[1].substring(indexPrice);
        var tempLocation = variables[2].substring(indexLocation);
        var tempLink = variables[3].substring(indexLink,indexLinkEnd);
        
        const product = {
          title: tempTitle,
          price: tempPrice,
          location: tempLocation,
          link: tempLink
        };

        listOfProducts.push(product);
      }
      success = true
    } catch (error) {
      console.log("Error getting facebook listings, trying again...")
    }

    if (!success && i == 4){
      throw "Error getting facebook listings, execution stopped.";
    }
  }

  

  // console.log(listOfProducts);
  // console.log("done");
  await browser.close();
  return listOfProducts;
}
module.exports.facebookSearch = facebookSearch
