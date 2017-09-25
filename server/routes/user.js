var express = require('express');
var router = express.Router();

const db = require('../db/dbcon');


app.get('/test/:id', (req, res, next) => {
  db.query('SELECT * FROM "User" WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err)
    }
    //res.send(res.rows[0])
    res.json(res.rows);
    console.log(res.rows);
  })
})

module.exports = router;