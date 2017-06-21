const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/views', express.static('views/assets'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workshop')
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/form', function(req, res) {
  res.render('formulario')
})

app.get('/lista', function(req, res) {
  res.render('lista')
})

app.get('/listaCarregada', function(req, res) {
  res.status(200).json({
    a: 1,
    b: 2,
    c: 3
  })
})

app.post('/registrar', function(req, res) {
  console.log(req.body);
  res.render('formulario')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('obaaaaa ')
})
