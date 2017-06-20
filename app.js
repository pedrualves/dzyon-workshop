const express = require('express'),
  app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/views', express.static('views/assets'))

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

app.listen(process.env.PORT || 3000, function() {
  console.log('obaaaaa ')
})
