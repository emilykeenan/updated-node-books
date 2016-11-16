var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/:genre', function(req, res) {
  console.log('get request');
  console.log(req.params.genre);
  var genre = req.params.genre;
  var books = req.body;
  // get books from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM books WHERE genre = $1',
    [genre],
     function(err, result) {

      done(); // close the connection.


          if (err) {
            console.log('sort error: ', err);
            res.sendStatus(500);
          } else {
            res.send(result.rows);
            res.sendStatus(201);
          }




    });

  });
});


module.exports = router;
