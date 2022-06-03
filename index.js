const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient

// Connection URL
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/db';

app.get('/', (req, res) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOTOK');
    } else {
      var dbo = db.db("db");
      dbo.createCollection("tablaA", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    }
  });
  var db = MongoClient.connection;
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))
