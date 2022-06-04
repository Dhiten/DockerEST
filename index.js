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
      console.log('notok')
      var dbo = db.db("db");
      dbo.createCollection("tablaa", function(err, res) {
      if (err) throw err;
      });
      dbo.createCollection("tablas", function(err, res) {
        if (err) throw err;
        });
      res.send('OK! 😎, tables created');
      //db.close();
    }
  });
});

app.get('/:ID',(req,res)=>{
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOTOK');
      console.log('notok')
    } else {
      let id=req.params.ID
      let date = Date.now()
      var dbo = db.db("db");
      var myobj = { ID: id, timestamp: date, hash:id+date };
      dbo.collection("tablas").insertOne(myobj, function(err, res) {
      if (err) {res.send(err)};
      });
      res.send('insertadocorrectamente',myobj);
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
