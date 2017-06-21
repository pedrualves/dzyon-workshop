const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/views', express.static('views/assets'))

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

app.listen(process.env.PORT || 3000, function() {
  console.log('obaaaaa ')
})
