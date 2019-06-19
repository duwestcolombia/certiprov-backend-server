var express = require('express');

//Model
var cliente = require('../models/clientes');

var app = express();

//=======================================
// Obtener todos los clientes
//========================================
app.get('/', (req, res, next)=>{
    
    cliente.findAll().then(clientes =>{

        res.status(200).json({
            result:true,
            clientes:clientes
        })

    }).catch(err=>{
        return res.status(500).json({
            result:false,
            message: 'Error al obtener los Clientes',
            errors:err
        })
    })

})

//=======================================
// Obtener cliente por NIT
//========================================
app.get('/:nit_cliente', (req, res)=>{
    
    var cod = req.params.nit_cliente;


    cliente.findByPk(cod).then(cliente =>{

        if (cliente === null) {
            res.status(400).json({
                result:false,
                message:"El cliente identificado con el NIT "+cod+ " no existe",
                errors:{message:"No existe un cliente registrado con este NIT, verifique la informacion y vuelva a intentar."}
            })
        }
        res.status(200).json({
            result:true,
            clientes:cliente
        })

    }).catch(err=>{
        return res.status(500).json({
            result:false,
            message: 'Error al obtener el cliente identificado con NIT '+cod,
            errors:err
        })
    })

})




module.exports = app;