const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cpu', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM comp_parts WHERE type='CPU'");
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
      const result = await client.query("SELECT * FROM comp_parts WHERE type='GPU'");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/gpu', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://hmzgcfxxfupocw:db0051069cbafc30ce2a903328d4611dc7d8da5f385da1113043067f297ba1b5@ec2-18-215-96-22.compute-1.amazonaws.com:5432/d5c9oa1b7747vs',
  ssl: process.env.DATABASE_URL ? true : false
});