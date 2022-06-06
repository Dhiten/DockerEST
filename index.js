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
      let date = new Date()
      let times =date.getDate().toString()+'-'+date.getMonth()+'-'+date.getFullYear()+'-'+date.getHours()+':'+date.getMinutes()
      date= date.getDate().toString()+date.getMonth()+date.getFullYear()+date.getHours()+date.getMinutes()
      let hash = ides+date
      var dbo = db.db("db");
      var myobj = { ID: ides, timestamp: times, hash:hash,};
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
      let date= new Date()
      let times =date.getDate().toString()+'-'+date.getMonth()+'-'+date.getFullYear()+'-'+date.getHours()+':'+date.getMinutes()
      let answer
      var query = { ID: id.toString(), hash:hash.toString() };
      dbo.collection("tablas").find(query).toArray(function(err, result) {
        if (err){
          res.send('problema con la busqueda')
        }else{
          if(result.length!=0){
            console.log(result)
            console.log(hash.toString().substring(1))
            datetest=result[0].timestamp.split('-')
            datenow=times.split('-')
            if((datenow[0]-datetest[0])===0 && (datenow[1]-datetest[1])===0 && (datenow[2]-datetest[2])===0 && (datenow[3].split(':')[0]-datetest[3].split(':')[0])<=4){
              answer="ok"
              res.send('ok')
            }else{
              answer ='nok'
              res.send('nok')
            }
            var myobj={ID:id, timestamp:times, hash:hash, res:answer}
            dbo.collection("tablaa").insertOne(myobj, function(err, res) {
            if (err) console.log(err);
            });
            console.log(myobj)
          }else{
            console.log(result)
            answer="nok"
            var myobj={ID:id, timestamp:times, hash:hash, res:answer}
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
      let tablasTex= 'Tabla S'
      var dbo= db.db("db")
      dbo.collection('tablas').find({}).toArray(function(err, result) {
        if (err) console.log(err);
        console.log('Tabla S',JSON.stringify(result))
        tablasTex=tablasTex+'\n'+JSON.stringify(result)
        res.send(tablasTex)
      });
    }
  })
});
app.get('/p/t/a',(req,res)=>{
  MongoClient.connect(mongoURL, {useNewUrlParser:true},(err,db)=>{
    if(err){
      res.send ('La tabla no se ha creado')
    }else{
      let tablasTex= 'Tabla A'
      var dbo= db.db("db")
      dbo.collection('tablaa').find({}).toArray(function(err, result) {
        if (err) console.log(err);
        console.log('Tabla A',JSON.stringify(result))
        tablasTex=tablasTex+'\n'+JSON.stringify(result)
        res.send(tablasTex)
      });
    }
  })
});

app.get('/deletetables',(req,res)=>{
       var dbo= db.db("db")
        dbo.collection("tablas").drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        }); 
        dbo.collection("tablaa").drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        }); 
})
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
