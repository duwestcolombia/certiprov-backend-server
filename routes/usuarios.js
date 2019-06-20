var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');

//Model
var usuario = require('../models/usuarios');

var app = express();

//=======================================
// Obtener todos los clientes
//========================================
app.get('/', mdAutenticacion.verificaToken, (req, res) => {

    usuario.findAll({
        attributes: {
            exclude: ['PASSWORD_USUARIO']
        }
    }).then(usuarios => {

        res.status(200).json({
            result: true,
            usuarios: usuarios
        })

    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al obtener los Usuarios',
            errors: err
        })
    })

})


//=======================================
// Crear nuevo usuario
//========================================
app.post('/', (req, res) => {

    var body = req.body;

    //valida si enviaron la contraseña, de ser asi se encripta con un cifrado de 1 via
    if (body.PASSWORD_USUARIO) {
        body.PASSWORD_USUARIO = bcrypt.hashSync(body.PASSWORD_USUARIO, 10);
    }

    usuario.create(body).then((usu) => {
        res.status(200).json({
            result: true,
            usuario: usu
        })
    }).catch(err => {
        return res.status(400).json({
            result: false,
            message: 'Error al registrar el usuario',
            errors: err
        })
    })

})



//=======================================
// Actualizar usuario
//========================================

app.put('/actualizar/:cod', mdAutenticacion.verificaToken, (req, res) => {

    var cod = req.params.cod;
    var body = req.body;

    usuario.findByPk(cod).then((user) => {

        if (user === null) {
            res.status(400).json({
                result: false,
                message: "El usuario con el codigo " + cod + " no existe",
                errors: { message: "No existe el usuario registrado con ese Codigo, verifique e intente nuevamente." }
            })
        }

        if (body.PASSWORD_USUARIO) {
            body.PASSWORD_USUARIO = bcrypt.hashSync(body.PASSWORD_USUARIO, 10);
        }

        usuario.update(body, {
            where: {
                DOC_USUARIO: cod
            }
        }).then((usuaUpdate) => {
            res.status(200).json({
                result: true,
                usuario: usuaUpdate,
                message: "Usuario actualizado correctamente"
            })
        }).catch(err => {
            return res.status(400).json({
                result: false,
                message: "Error al actualizar el usuario",
                errors: err
            })
        })


    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: "Error al buscar el usuario con el codigo " + cod,
            errors: err
        })
    })





})

module.exports = app;