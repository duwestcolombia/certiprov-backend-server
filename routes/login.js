var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuarios');

// ==========================================
// Autenticacion normal
// ==========================================

app.post('/', (req, res) => {

    var body = req.body;
    var email = req.body.EMAIL_USUARIO;

    Usuario.findOne({
        where: {
            EMAIL_USUARIO: email
        }
    }).then(usuarioBd => {

        if (usuarioBd === null) {
            res.status(400).json({
                result: false,
                message: "El usuario " + email + " no existe",
                errors: { message: "No encontramos el usuario en nuestra base de datos, verifique e intenete de nuevo." }
            })
        }

        if (!bcrypt.compareSync(body.PASSWORD_USUARIO, usuarioBd.PASSWORD_USUARIO)) {
            res.status(400).json({
                result: false,
                message: "Error de contraseña",
                errors: { message: "La contraseña ingresada no es correcta, verifique y vuelva a intentar" }
            })
        }

        //crear token
        usuarioBd.PASSWORD_USUARIO = ';)';
        var token = jwt.sign({ usuario: usuarioBd }, SEED, { expiresIn: 14400 }) //expira en 4 horas


        res.status(200).json({
            result: true,
            usuario: usuarioBd,
            doc_usu: usuarioBd.DOC_USUARIO,
            token: token
        })


    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al buscar el Usuario ' + email,
            errors: err
        })
    })


})


module.exports = app;