//Librerias
var express = require('express');
var bodyParser = require('body-parser');

//Database
var db = require('./config/database');

//Inicializacion de variables
var app = express();
var port = process.env.port || 3300;



//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



db.authenticate().then(()=>{
    console.log('Estamos conectados a la bd con sequelize');
    
}).catch(err => {
    console.log('Coneccion no disponible', err);
    
})


//Rutas
var appRoutes = require('./routes/app_routes')
var cuenta = require('./routes/cuentas');
var clientes = require('./routes/clientes');
var retenciones = require('./routes/retenciones');

//Asignacion de ruta

app.use('/retenciones', retenciones);
app.use('/clientes', clientes);
app.use('/cuentas', cuenta);
app.use('/',appRoutes);



//Puerto de escucha servidor
app.listen(port, ()=> console.log('Estoy escuchando en el server' + port));
