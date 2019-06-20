var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


//=======================================
// Middleware que verifica el token de la aplicacion
//========================================

exports.verificaToken = function(req, res, next) {

    //Recibo el token por la url
    //var token = req.query.token;

    //Recibo el token por el header
    var token = req.get('token');

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                result: false,
                message: 'Token incorrecto o no tiene acceso para usar nuestra aplicación.',
                errors: err
            })
        }

        next();

    })
}