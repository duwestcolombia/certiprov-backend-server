var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');
//Model
var cuenta = require('../models/cuentas');

var app = express();




//=======================================
// Obtener todas las cuentas
//EL PARAMETRO mdAutenticacion.verificaToken HACE QUE SE DEBA USAR EL TOKEN PARA ACCEDER AL METODO
//========================================
app.get('/', mdAutenticacion.verificaToken, (req, res) => {
    //obtenemos todos los usuarios pero le excluimos la contraseña
    cuenta.findAll().then(cuenta_result => {

        res.status(200).json({
            result: true,
            cuentas: cuenta_result
        })

    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al obtener las Cuentas',
            errors: err
        })
    })


})

//=======================================
// Obtener cuenta por CODIGO_CUENTA (COD_CUENTA)
//========================================
app.get('/:cod_cuenta', mdAutenticacion.verificaToken, (req, res) => {

    var cod = req.params.cod_cuenta;


    cuenta.findByPk(cod).then(cuenta_result => {

        if (cuenta_result === null) {
            res.status(400).json({
                result: false,
                message: "La cuenta con el codigo " + cod + " no existe",
                errors: { message: "No existe una cuenta creada con ese Codigo, verifique la informacion y vuelva a intentar." }
            })
        }

        res.status(200).json({
            result: true,
            cuentas: cuenta_result
        })

    }).catch(err => {
        return res.status(500).json({
            result: false,
            message: 'Error al obtener las Cuentas',
            errors: err
        })
    })


})


//=======================================
// Crear cuenta
//========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    cuenta.create(body).then((nuevaCuenta) => {
        res.status(200).json({
            result: true,
            usuario: nuevaCuenta
        })
    }).catch(err => {
        return res.status(400).json({
            result: false,
            message: 'Error al registrar la cuenta',
            errors: err
        })
    })

})

//=======================================
// Actualizar Cuenta
//========================================

app.put('/actualizar/:cod_cuenta', mdAutenticacion.verificaToken, (req, res) => {

    var cod = req.params.cod_cuenta;
    var body = req.body;

    cuenta.findByPk(cod).then((cuenta_result) => {

        if (cuenta_result === null) {
            res.status(400).json({
                result: false,
                message: "La cuenta con el codigo " + cod + " no existe",
                errors: { message: "No existe una cuenta creada con ese Codigo, verifique la informacion y vuelva a intentar." }
            })
        }
        cuenta.update(body, { where: { COD_CUENTA: cod } }).then((cuentaUpdate) => {
            res.status(200).json({
                result: true,
                usuario: cuentaUpdate,
                message: "Cuenta actualizada correctamente"
            })
        }).catch(err => {
            res.status(400).json({
                result: false,
                message: "Error al actualizar la cuenta",
                errors: err
            })
        })


    }).catch(err => {
        res.status(500).json({
            result: false,
            message: "Error al buscar la cuenta con el codigo " + cod_cuenta,
            errors: err
        })
    })
});


//=======================================
// Eliminar cuenta
//========================================
app.delete('/:cod_cuenta', mdAutenticacion.verificaToken, (req, res) => {

    var cod = req.params.cod_cuenta;

    cuenta.findByPk(cod).then((cuenta_result) => {
        if (cuenta_result === null) {
            res.status(400).json({
                result: false,
                message: "La cuenta con el codigo " + cod + " no existe",
                errors: { message: "No existe una cuenta creada con ese Codigo, verifique la informacion y vuelva a intentar." }
            })
        }

        cuenta.destroy({
                where: { COD_CUENTA: cod }
            })
            .then(cuentaEliminada => {
                res.status(200).json({
                    result: true,
                    usuario: cuentaEliminada,
                    message: "La cuenta con el codigo " + cod + " fue eliminada satisfactoriamente."
                })
            }).catch(err => {
                return res.status(400).json({
                    result: false,
                    message: 'Error al eliminar la cuenta',
                    errors: err
                })
            })

    }).catch(err => {
        res.status(500).json({
            result: false,
            message: "Error al buscar la cuenta con el codigo " + cod_cuenta,
            errors: err
        })
    })




})



module.exports = app;