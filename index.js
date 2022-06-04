const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient

// Connection URL process.env.MONGO_URL || 
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/db';

app.get('/', (req, res) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOK');
      console.log(err)
    } else {
      var dbo = db.db("db");
      dbo.createCollection("tablaa", function(err, res) {
        if (err) console.log(err);
      });
      dbo.createCollection("tablas", function(err, res) {
        if (err) console.log(err);
        });
      res.send('OK!');
      //db.close();
    }
  });
});

app.get('/:IDES',(req,res)=>{
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOK');
    } else {
      let ides=req.params.IDES
      let date = Date.now()
      let hash = ides+date
      var dbo = db.db("db");
      var myobj = { ID: ides, timestamp: date, hash:hash};
      dbo.collection("tablas").insertOne(myobj, function(err, res) {
      if (err) console.log(err);
      });
      console.log("Insertado", myobj)
      res.send(hash);
      //db.close();
    }
  });
});

app.get('/:IDESA/:HASH',(req, res)=>{
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOK'); 
    } else {
      var dbo = db.db("db");
      let id=req.params.IDESA
      let hash = req.params.HASH
      let date = Date.now()
      let answer
      var query = { ID: id.toString(), hash:hash.toString() };
      dbo.collection("tablas").find(query).toArray(function(err, result) {
        if (err){
          res.send('problema con la busqueda')
        }else{
          if(result.length!=0){
            console.log(result)
            answer="ok"
            var myobj={ID:id, timestamp:date, hash:hash, res:answer}
            dbo.collection("tablaa").insertOne(myobj, function(err, res) {
            if (err) console.log(err);
            });
            console.log(myobj)
            res.send('ok')
          }else{
            console.log(result)
            answer="nok"
            var myobj={ID:id, timestamp:date, hash:hash, res:answer}
            dbo.collection("tablaa").insertOne(myobj, function(err, res) {
            if (err) console.log(err);
            });
            console.log(myobj)
            res.send('nok')
          }
        }
      });
      //db.close();
    }
  });
});


app.get('/p/t/s',(req,res)=>{
  MongoClient.connect(mongoURL, {useNewUrlParser:true},(err,db)=>{
    if(err){
      res.send ('La tabla no se ha creado')
    }else{
      let tablaa
      let tablas
      var dbo= db.db("db")
      dbo.collection('tablaa').find({}).toArray(function(err, result) {
        if (err) console.log(err);
        console.log('Tabla A',result)
        tablaa=result
      });
      dbo.collection('tablas').find({}).toArray(function(err, result) {
        if (err) console.log(err);
        console.log('Tabla S',result)
        tablas=result
      });
      dbo.collection("tablaa").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
      }); 
      dbo.collection("tablas").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
      }); 
      res.send(tablaa)
      res.send(tablas)
    }
  })
});


/**dbo.collection("tablas").find({}).toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});
dbo.collection("tablas").drop(function(err, delOK) {
  if (err) throw err;
  if (delOK) console.log("Collection deleted");
  db.close();
}); **/
app.listen(port, () => console.log(`Server listening on port ${port}!`))
