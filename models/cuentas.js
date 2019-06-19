var Sequelize = require('sequelize');

var db = require('../config/database');

 

var Cuentas = db.define('cuentas',{
    //atributos de la tabla
    COD_CUENTA:{
        type: Sequelize.STRING,
        primaryKey: true,
        validate:{
            len: [2,15],
            notNull:false
            
        }
    },
    NOM_CUENTA:{
        type: Sequelize.STRING,
        validate:{
            len: [5,200]
        }
    }
},
{
    tableName:'cuentas',
    timestamps:false,
    paranoid:true
})

module.exports = Cuentas;