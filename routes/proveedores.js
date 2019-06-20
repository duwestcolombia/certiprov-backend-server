var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

//Model
var proveedor = require('../models/proveedores');

var app = express();

//=======================================
// Obtener todos los proveedores
//========================================
app.get('/', mdAutenticacion.verificaToken, (req, res) => {

    proveedor.findAll().then(proveedores => {

        res.status(200).json({
            result: true,
            proveedores: proveedores
        })

    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al obtener los Proveedores',
            errors: err
        })
    })

})

//=======================================
// Obtener proveedor por NIT
//========================================
app.get('/:nit_proveedor', mdAutenticacion.verificaToken, (req, res) => {

    var cod = req.params.nit_proveedor;


    proveedor.findByPk(cod).then(proveedor => {

        if (proveedor === null) {
            res.status(400).json({
                result: false,
                message: "El proveedor identificado con el NIT " + cod + " no existe",
                errors: { message: "No existe un proveedor registrado con este NIT, verifique la informacion y vuelva a intentar." }
            })
        }
        res.status(200).json({
            result: true,
            proveedores: proveedor
        })

    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al obtener el proveedor identificado con NIT ' + cod,
            errors: err
        })
    })

})

//=======================================
// Asociar un usuario a un proveedor
//========================================


module.exports = app;