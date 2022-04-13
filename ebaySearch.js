
const fetch = require('node-fetch')
const xml2js = require('xml2js')


async function ebaySearch(search_term){
    let ebayURI = "https://svcs.ebay.com/services/search/FindingService/v1";

    let ebayReqHeaders = 
    {
        'X-EBAY-SOA-SECURITY-APPNAME': 'JacobPol-pcparlor-PRD-cdc51ba6c-43b0d70a',
        'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced'
    };

    let ebayReqBody = `
    <findItemsAdvancedRequest xmlns="http://www.ebay.com/marketplace/search/v1/services">
        <categoryId> 175673 </categoryId>
        <keywords> ${search_term} </keywords>
    </findItemsAdvancedRequest>
    `;
    
    const ebayParams = {    
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'X-EBAY-SOA-SECURITY-APPNAME': 'JacobPol-pcparlor-PRD-cdc51ba6c-43b0d70a',
            'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced'
        },
        body: ebayReqBody
    }

    const response = await fetch(ebayURI, ebayParams);
    const xml = await response.text();
    
    let parser = new xml2js.Parser();
    return parser.parseStringPromise(xml);  // response is a promise that will resolve to json
}
module.exports.ebaySearch = ebaySearch;

