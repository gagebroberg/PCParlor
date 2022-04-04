const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

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
      const cpu_result = await client.query("SELECT * FROM cpu WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const gpu_result = await client.query("SELECT * FROM gpu WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const ssd_result = await client.query("SELECT * FROM ssd WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const hdd_result = await client.query("SELECT * FROM hdd WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const ram_result = await client.query("SELECT * FROM ram WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const usb_result = await client.query("SELECT * FROM usb WHERE model LIKE '%" + req.query['searchquery'] + "%'");
      const result = Promise.all([cpu_result, gpu_result, ssd_result, hdd_result, ram_result, usb_result]);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/cpu', results );
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