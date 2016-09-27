var express = require("express");
var app = express();
var mongojs =  require('mongojs');						
var db = mongojs('listadiscos', ['listadiscos']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));

app.use(bodyParser.json());

//requisicao do catalogo de discos em formaton JSON
app.get('/listadiscos', function (req,res) {
  db.listadiscos.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//requisicao de insercao de disco
app.post('/listadiscos', function (req, res) {
  db.listadiscos.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

//requisicao de remover disco
app.delete('/listadiscos/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.listadiscos.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//requisicao de um disco especifico por id para ser editado
app.get('/listadiscos/:id', function (req, res) {
  var id = req.params.id;
  db.listadiscos.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//requisicao de salvar o que foi editado de um disco
app.put('/listadiscos/:id', function (req, res) {
  var id = req.params.id;
  db.listadiscos.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {nome: req.body.nome, genero: req.body.genero, genero: req.body.genero}},
    new: true}, function (err, doc) {
      res.json(doc);
    });
});

//servidor escutando porta 4000 para receber conexoes
app.listen(process.env.PORT || 4000);
console.log("Servidor escutando porta 4000");