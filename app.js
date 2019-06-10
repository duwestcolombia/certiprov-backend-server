//Librerias

var express = require('express');

var app = express();
var port = 3300;

app.get('/', (req, res)=> res.send('Funciona estamos de nuevo'));

app.listen(port, ()=> console.log('Estoy escuchando en el server'));
