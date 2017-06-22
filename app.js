const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/views', express.static('views/assets'))

//aceitando requisicoes de qualquer origem
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//conexao com o mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/workshop');
mongoose.Promise = global.Promise;

//definindo uma colecao = tabela
const inscritoSchema = new mongoose.Schema({
  nome: String,
  email: String
})
const inscritoModel = mongoose.model('inscritos', inscritoSchema)

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/form', function(req, res) {
  res.render('formulario', {
    msg: '',
    erro: ''
  })
})

app.get('/lista', function(req, res) {
  //query de consulta
  inscritoModel.find({}, function(err, docs) {
    let erro = ''
    if (err) {
      erro = err
    }
    res.render('lista', {
      docs,
      erro
    })
  })
})

app.post('/registrar', function(req, res) {
  let inscrito = new inscritoModel(req.body)

  //query de insercao
  inscrito.save({}, function(err, doc) {
    let msg = '',
      erro = ''
    if (err) {
      erro = err
    } else {
      msg = 'inserido com sucesso!'
    }
    res.render('formulario', {
      msg,
      erro
    })
  })
})

app.get('/listaJSON', function(req, res) {
  //query de consulta
  inscritoModel.find({}, function(err, docs) {
    let erro = ''
    if (err) {
      res.status(204).json()
    }
    res.status(200).json(docs)
  })
})

app.post('/registrarJSON', function(req, res) {
  let inscrito = new inscritoModel(req.body)

  //query de insercao
  inscrito.save({}, function(err, doc) {
    if (err) {
      res.status(500).json({
        msg: err
      })
    } else {
      res.status(200).json({
        msg: 'inserido com sucesso!'
      })
    }
  })
})

app.use(function(req, res) {
  res.status(404).send('ops, pagina nao encontrada')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('obaaaaa ')
})
