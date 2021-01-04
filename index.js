const express = require('express');
const pool = require('./sql/connection');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  // res.send('Hello World!')
  pool.query('SELECT * FROM games', (err, rows) => {
    if(err) {
      console.log({err});
      return res.status(500).send('An unexpected error occurred.')
    }
    res.json(rows)
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))