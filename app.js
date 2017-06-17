// const http = require('http');
//
// const server = http.createServer(function(req, res){
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Vai 123');
// });
//
// server.listen(3000,() => {
//   console.log('oba!!! deu tudo certo');
// });

const express = require('express')
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  // res.send('<h1>tudo certo por enquanto!</h1>')
  res.render('index')
})

app.get('/form', function(req, res) {
  // res.send('aqui vamos cadastrar')
  res.render('formulario')
})

app.get('/lista', function(req, res) {
  // res.send('vamos listar os dados aqui')
  res.render('lista')
})

app.get('/listaCarregada', function(req, res) {
  res.status(200).json({a:1,b:2,c:3})
})

app.listen(process.env.PORT || 3000, function() {
  console.log('obaaaaa ')
})
