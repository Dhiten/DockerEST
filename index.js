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
      res.send('OK! 😎');
      console.log('notok')
      var dbo = db.db("db");
      dbo.createCollection("tablaa", function(err, res) {
      if (err) throw err;
      });
      dbo.createCollection("tablas", function(err, res) {
        if (err) throw err;
        });
      res.send('tables created')
      db.close();
    }
  });
});

app.get('/:ID',(req,res)=>{
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOTOK');
      console.log('notok')
    } else {
      res.send('hola');
      //db.close();
    }
  });
});

app.get('/:ID/:HASH',(req, res)=>{
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOTOK');
      console.log('notok')
    } else {
      res.send('hola');
      //db.close();
    }
  });
});


app.listen(port, () => console.log(`Server listening on port ${port}!`))
