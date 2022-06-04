const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient

// Connection URL process.env.MONGO_URL || 
const mongoURL = 'mongodb://localhost:27017/db';

app.get('/', (req, res) => {
  MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, db) => {
    if (err) {
      res.status(500).send('NOTOK');
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
      res.status(500).send('NOTOK');
      console.log('notok')
    } else {
      let id=req.params.IDES
      let date = Date.now()
      let hash = id+date
      var dbo = db.db("db");
      var myobj = { ID: id, timestamp: date, hash:hash};
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
      res.status(500).send('NOTOK'); 
      console.log('notok')
    } else {
      var dbo = db.db("db");
      let id=req.params.IDESA
      let hash = req.params.HASH
      var query = { id: id, hash:hash };
      dbo.collection("tablas").find(query).toArray(function(err, result) {
        if (err){
          res.send('problema con la busqueda')
        }else{
          if(result.length!=0){
            console.log(result)
            res.send('encontrado')
          }else{
            console.log(result)
            res.send('no encontrado')
          }
          
        }
      });
      //db.close();
    }
  });
});


app.get('/:p/:t/:s',(req,res)=>{
  MongoClient.connect(mongoURL, {useNewUrlParser:true},(err,db)=>{
    if(error){
      res.send ('La tabla no se ha creado')
    }else{
      let tabla=req.params.s
      var dbo= db.db("db")
      console.log(tabla)
      dbo.collection(tabla).find({}).toArray(function(err, result) {
        if (err) console.log(err);
        res.send(result)
      });
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
