require('dotenv').config()
const express = require('express');
const { range } = require('express/lib/request');
const path = require('path');
const { Pool } = require('pg');
const { ConsoleMessage } = require('puppeteer');
const PORT = process.env.PORT || 5000;
const ebaySearch = require('./ebaySearch.js').ebaySearch;
const youtubeSearch = require('./youTubeSearch.js').youtubeData;
const facebookSearch = require('./facebookSearch.js').facebookSearch;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
    }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async (req, res) => {
    res.render('pages/index');
  })
  .get('/search', async (req, res) => {
    try {
      const client = await pool.connect();
      if ((req.query['brand1']==undefined)&&(req.query['brand2']==undefined)&&(req.query['brand3']==undefined)) { 
        req.query['brand1'] = '';
        req.query['brand2'] = '';
        req.query['brand3'] = '';
      }
      const result = await client.query("SELECT * FROM cpu WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) UNION "
                                      + "SELECT * FROM gpu WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) UNION "
                                      + "SELECT * FROM ssd WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) UNION "
                                      + "SELECT * FROM hdd WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) UNION "
                                      + "SELECT * FROM ram WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) UNION "
                                      + "SELECT * FROM usb WHERE LOWER(model) LIKE LOWER('%" + req.query['searchquery'] + "%') "
                                      + "AND (LOWER(brand) LIKE LOWER('%" + req.query['brand1'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand2'] + "%') "
                                      + "OR LOWER(brand) LIKE LOWER('%" + req.query['brand3'] + "%')) " 
                                      + "ORDER BY rank");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/search', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/cpu', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM cpu");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/cpu', results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/gpu', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM gpu");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/gpu', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/ssd', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM ssd");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/ssd', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/hdd', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM hdd");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/hdd', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/ram', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM ram");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/ram', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/usb', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM usb");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/usb', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/signin', async (req, res) => {
    try {
      res.render('pages/signin');
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/signup', async (req, res) => {
    try {
      res.render('pages/signup');
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/about', async (req, res) => {
    try {
      res.render('pages/about');
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/howto', async (req, res) => {
    try {
      res.render('pages/howto');
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/product/:search', async (req, res) => {
    try {
      let searchTerm = req.params['search'];
      let ebayData = new Array();
      ebaySearch(searchTerm, 1)
      .then((searchResponse) => {
        let listings = searchResponse['findItemsAdvancedResponse']['searchResult'][0]['item'];
        
        for (let itemnum = 0; itemnum < 100; itemnum++) {
          if (listings == undefined) {
            break;
          }
          let item = listings[itemnum];
          if (item == undefined) {
            break;
          }
          let id = item['itemId'][0];
          let title = item['title'][0];
          let picture = item['galleryURL'][0];
          let link = item['viewItemURL'][0];
          let location = item['location'][0];
          location = location.replace(/,/g, ", ");
          let country = item['country'][0];        
          let sellingStatus = item['sellingStatus'];
          let price = "$" + sellingStatus[0]['currentPrice'][0]['_']
          if (/\.[0-9]$/.test(price)) {
            price = price + "0";
          }
          let currency = sellingStatus[0]['currentPrice'][0]['$']['currencyId'];

          ebayData[itemnum] = {
            'id': id,
            'title': title,
            'picture': picture,
            'link': link,
            'location': location,
            'country': country,
            'price': price,
            'currency': currency
          }
        }

        facebookSearch(searchTerm)
        .then((facebookData) => {
          res.render('pages/product', {
            'ebayData': ebayData, 
            'ebayItemCount': ebayData.length,
            'facebookData': facebookData, 
            'facebookItemCount': facebookData.length, 
            'searchTerm': searchTerm});
        })
        .catch((err) => {
          console.error(err);
        })
      })
      .catch((err) => {
        throw err;
      });

    
      } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/details/:searchItem/:searchId', async (req, res) => {
    try {
      // TODO: Change from just CPU to all 
      const client = await pool.connect();
      // query grab the rank of the item model
      console.log("SELECT rank FROM cpu WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "')")
      var cpuRank = await client.query("SELECT rank FROM cpu WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var gpuRank = await client.query("SELECT rank FROM gpu WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var ssdRank = await client.query("SELECT rank FROM ssd WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var hddRank = await client.query("SELECT rank FROM hdd WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var ramRank = await client.query("SELECT rank FROM ram WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var usbRank = await client.query("SELECT rank FROM usb WHERE LOWER(model) = LOWER('" + req.params['searchItem'] + "');");
      var result;
      if (cpuRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM cpu WHERE rank > " + cpuRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM cpu WHERE rank < " + cpuRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      } else if (gpuRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM gpu WHERE rank > " + gpuRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM cpu WHERE rank < " + gpuRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      } else if (ssdRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM ssd WHERE rank > " + ssdRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM ssd WHERE rank < " + ssdRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      } else if (hddRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM hdd WHERE rank > " + hddRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM hdd WHERE rank < " + hddRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      } else if (ramRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM ram WHERE rank > " + ramRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM ram WHERE rank < " + ramRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      } else if (usbRank['rowCount'] != 0) {
        result = await client.query("(SELECT * FROM usb WHERE rank > " + usbRank.rows[0]['rank'] + " LIMIT 3) UNION ALL (SELECT * FROM usb WHERE rank < " + usbRank.rows[0]['rank'] + " ORDER BY rank DESC LIMIT 3);"); 
      }
      console.log(result.rows)
      let searchTerm = req.params['searchId'];
      ebaySearch(searchTerm, 1)
      .then((searchResponse) => {
        let listings = searchResponse['findItemsAdvancedResponse']['searchResult'][0]['item'];
        let item = listings[0];
        let title = item['title'][0];
        let picture = item['galleryURL'][0];
        picture = picture.replace("140.jpg", "500.jpg")
        let link = item['viewItemURL'][0];
        let location = item['location'][0];
        location = location.replace(/,/g, ", ");
        let country = item['country'][0];        
        let sellingStatus = item['sellingStatus'];
        let price = "$" + sellingStatus[0]['currentPrice'][0]['_']
        let currency = sellingStatus[0]['currentPrice'][0]['$']['currencyId'];

        ebayData = {
          'title': title,
          'picture': picture,
          'link': link,
          'location': location,
          'country': country,
          'price': price,
          'currency': currency
        }

        youtubeSearch(title)
        .then((response) => {
          var videoTitle;
          var videoId;
          var youtubeData;
          
          if (response['items'] == undefined) {
            youtubeData = {
              'videoTitle': 'Ran out of youtube requests', 
              'videoId': 'dQw4w9WgXcQ'
              }
          } else {
            if (response['items'][0] == undefined) {
              youtubeData = {
              'videoTitle': 'Couldn\'t find a video, so enjoy this instead', 
              'videoId': 'dQw4w9WgXcQ'
              }
            } else {
              videoTitle = response['items'][0]['snippet']['title'];
              videoId = response['items'][0]['id']['videoId'];
              youtubeData = {
                'videoTitle': videoTitle, 
                'videoId': videoId
              }
            }
          }
          
          let img = new Array();
          if (result.rows[0] != undefined) {
            ebaySearch(result.rows[0]['model'], 1)
            .then((response) => {
              let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
              if (listings != undefined) {
                let item = listings[0];
                let picture = item['galleryURL'][0];
                picture = picture.replace("140.jpg", "500.jpg");
                img[0] = picture;
              }
              if (result.rows[1] != undefined) {
                ebaySearch(result.rows[1]['model'], 1)
                .then((response) => {
                  let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
                  if (listings != undefined) {
                    let item = listings[0];
                    let picture = item['galleryURL'][0];
                    picture = picture.replace("140.jpg", "500.jpg");
                    img[1] = picture;
                  }
                  if (result.rows[2] != undefined) {
                    ebaySearch(result.rows[2]['model'], 1)
                    .then((response) => {
                      let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
                      if (listings != undefined) {
                        let item = listings[0];
                        let picture = item['galleryURL'][0];
                        picture = picture.replace("140.jpg", "500.jpg");
                        img[2] = picture;
                      }
                      if (result.rows[3] != undefined) {
                        ebaySearch(result.rows[3]['model'], 1)
                        .then((response) => {
                          let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
                          if (listings != undefined) {
                            let item = listings[0];
                            let picture = item['galleryURL'][0];
                            picture = picture.replace("140.jpg", "500.jpg");
                            img[3] = picture;
                          }
                          if (result.rows[4] != undefined) {
                            ebaySearch(result.rows[4]['model'], 1)
                            .then((response) => {
                              let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
                              if (listings != undefined) {
                                let item = listings[0];
                                let picture = item['galleryURL'][0];
                                picture = picture.replace("140.jpg", "500.jpg");
                                img[4] = picture;
                              }
                              if (result.rows[5] != undefined) {
                                ebaySearch(result.rows[5]['model'], 1)
                                .then((response) => {
                                  let listings = response['findItemsAdvancedResponse']['searchResult'][0]['item'];
                                  if (listings != undefined) {
                                    let item = listings[0];
                                    let picture = item['galleryURL'][0];
                                    picture = picture.replace("140.jpg", "500.jpg");
                                    img[5] = picture;
                                  }
                                  res.render('pages/details', {'ebayData': ebayData, 'cutoff': '3', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
                                })
                              } else {
                                res.render('pages/details', {'ebayData': ebayData, 'cutoff': '2', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
                              }
                            })
                          } else {
                            res.render('pages/details', {'ebayData': ebayData, 'cutoff': '1', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
                          }
                        })
                      } else {
                        res.render('pages/details', {'ebayData': ebayData, 'cutoff': '3', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
                      }
                    })
                  } else {
                    res.render('pages/details', {'ebayData': ebayData, 'cutoff': '3', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
                  }
                })
              } else {
                res.render('pages/details', {'ebayData': ebayData, 'cutoff': '3', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
              }
            })
          } else {
            res.render('pages/details', {'ebayData': ebayData, 'cutoff': '3', 'youtubeData': youtubeData, 'results': result.rows, 'img': img, 'searchTerm': req.params['searchItem']});
          }

      })
      .catch((err) => {
          console.error(err);
      });
        
      })
      .catch((err) => {
        throw err;
      });
    
      } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
