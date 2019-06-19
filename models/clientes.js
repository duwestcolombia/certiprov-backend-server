var Sequelize = require('sequelize');

var db = require('../config/database');

 

var Clientes = db.define('clientes',{
    //atributos de la tabla
    NIT_CLIENTE:{
        type: Sequelize.STRING,
        primaryKey: true,
        validate:{
            len: [2,12]
        }
    },
    NOMBRE_CLIENTE:{
        type: Sequelize.STRING,
        validate:{
            len: [5,200]
        }
    },
    ESTADO_CLIENTE:{
        type: Sequelize.STRING,
        validate:{
            len: [2,6]
        }
    }

},
{
    tableName:'clientes',
    timestamps:false,
    paranoid:true
})

module.exports = Clientes;