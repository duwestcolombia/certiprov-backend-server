var express = require('express');

//Model
var retencion = require('../models/retenciones');

var app = express();

//=======================================
// Obtener todas las retenciones
//========================================
app.get('/', (req, res, next)=>{
    
    retencion.findAll().then(retenciones =>{

        res.status(200).json({
            result:true,
            retenciones:retenciones
        })

    }).catch(err=>{
        return res.status(500).json({
            result:false,
            message: 'Error al obtener las retenciones',
            errors:err
        })
    })

})

//========================================
// Obtener retenciones por año y cliente
//========================================
app.get('/:anio/:nit_cliente', (req, res)=>{
    
    var anio = req.params.anio;
    var cod = req.params.nit_cliente;


    retencion.findAll({
        where:{
           ANIO_RETENCION: anio,
           NIT_CLIENTE: cod 
        }
    }).then(retenciones =>{

        //Valido que la promesa me arroje un resultado correcto, si es vacio, los datos estan mal
        if (retenciones.length == 0) {
            res.status(400).json({
                result:false,
                message:"No encontramos retenciones del año "+anio+ " para el cliente "+cod,
                errors:{message:"No se encuentran retenciones aplicadas al cliente, verifique la informacion y vuelva a intentar."}
            })
        }
        // Validacion exitosa, se encontraron los datos correspondientes y se mostraran
        res.status(200).json({
            result:true,
            retenciones:retenciones
        })
    }).catch(err =>{
        //Error al ejecutar el metodo findAll
        return res.status(500).json({
            result:false,
            message: 'Error al obtener las retenciones',
            errors:err
        })
    })

   
})




module.exports = app;