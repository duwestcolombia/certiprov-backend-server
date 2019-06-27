var express = require('express');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

//Middleware
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

//Modelos

var Cuenta = require('../models/cuentas');
var Proveedor = require('../models/proveedores');
var Usuario = require('../models/usuarios');

//=======================================
// Busqueda General en todas las entidades
//========================================
app.get('/entidad/:tabla/:busqueda', mdAutenticacion.verificaToken, (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var promesa;

    switch (tabla) {
        case 'cuentas':
            promesa = buscarCuentas(busqueda);

            break;
        case 'usuarios':
            promesa = buscarUsuarios(busqueda);

            break;
        case 'proveedores':
            promesa = buscarProveedores(busqueda);

            break;

        default:

            return res.status(400).json({
                result: false,
                message: 'Los tipos de busqueda solo son: Cuenta, Usuarios, Proveedores',
                error: { message: 'La entidad o tabla enviada no es valida ' }
            })

            break;

    }

    promesa.then(data => {

        res.status(200).json({
            result: true,
            [tabla]: data
        })

    }).catch(err => {
        return res.status(400).json({
            result: false,
            message: 'Los tipos de busqueda solo son: Cuenta, Usuarios, Proveedores',
            error: { message: 'La entidad o tabla enviada no es valida ' }
        })
    })

});
//=======================================
// Busqueda General en todas las entidades
//========================================

app.get('/todo/:busqueda', mdAutenticacion.verificaToken, (req, res) => {

    var busqueda = req.params.busqueda;

    //Promise All permite enviar un arreglo de promesas y si todas se resuelven se ejecuta el then, si no el catch
    Promise.all([

        buscarCuentas(busqueda),
        buscarUsuarios(busqueda),
        buscarProveedores(busqueda)

    ]).then(respuestas => {

        res.status(200).json({
            result: true,
            cuentas: respuestas[0],
            usuarios: respuestas[1],
            proveedores: respuestas[2]
        })

    }).catch(err => {

        res.status(500).json({
            result: false,
            message: 'Error al realizar la busqueda',
            error: 'Se presento un error al realizar las busquedas ' + err
        })

    })



})


//Script para hacer busquedas asincronas
function buscarCuentas(busqueda) {

    return new Promise((resolve, reject) => {

        Cuenta.findAll({
            where: {
                NOM_CUENTA: {
                    [Op.substring]: busqueda
                }
            }
        }).then((cuentas) => {

            resolve(cuentas);

        }).catch((err) => {

            reject(' Error al cargar cuentas ' + err);

        })

    })


}

function buscarProveedores(busqueda) {

    return new Promise((resolve, reject) => {

        Proveedor.findAll({
            where: {
                NOMBRE_CLIENTE: {
                    [Op.substring]: busqueda
                }
            }
        }).then((proveedores) => {

            resolve(proveedores);

        }).catch((err) => {

            reject(' Error al cargar proveedores ' + err);

        })

    })

}

function buscarUsuarios(busqueda) {

    return new Promise((resolve, reject) => {

        Usuario.findAll({
            where: {
                [Op.or]: [{
                        NOMBRE_USUARIO: {
                            [Op.substring]: busqueda,

                        }
                    },
                    {
                        EMAIL_USUARIO: {
                            [Op.substring]: busqueda
                        }
                    }
                ]
            }
        }).then((usuarios) => {

            resolve(usuarios);

        }).catch((err) => {

            reject(' Error al cargar usuarios ' + err);

        })

    })
}


module.exports = app;