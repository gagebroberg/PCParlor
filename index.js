const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const pages = ['cpu', 'gpu', 'ssd', 'hdd', 'ram', 'usb'];

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cpu', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM cpu");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/cpu', results );
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

function onClick($this) {
  var val = $this.previousElementSibling.value;
  if(val == ''){
      console.log('no input');
  }else{
     console.log(val);
  }
}