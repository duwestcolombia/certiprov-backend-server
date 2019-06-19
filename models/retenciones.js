var Sequelize = require('sequelize');

var db = require('../config/database');

 

var Retenciones = db.define('retenciones',{
    //atributos de la tabla
    ANIO_RETENCION:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        validate:{
            len: [3,4],
            notNull:false
            
        }
    },
    NOMBRE_CLIENTE:{
        type: Sequelize.STRING,
        validate:{
            len: [5,200]
        }
    },
    NIT_CLIENTE:{
        type: Sequelize.STRING,
        validate:{
            len: [3,12]
        }
    },
    COD_CUENTA:{
        type: Sequelize.STRING,
        validate:{
            len: [3,15]
        }
    },
    NOM_CUENTA:{
        type: Sequelize.STRING,
        validate:{
            len: [5,200]
        }
    },
    PORCENTAJE_RETENCION:{
        type: Sequelize.DOUBLE,
        validate:{
            len: [5,200]
        }
    },
    BASEIMPO_RETENCION:{
        type: Sequelize.DOUBLE,
        validate:{
            len: [5,200]
        }
    },
    IMPORTE_RETENCION:{
        type: Sequelize.DOUBLE,
        validate:{
            len: [5,200]
        }
    }
},
{
    tableName:'view_retencion_cliente',
    timestamps:false,
    paranoid:true
})

	

module.exports = Retenciones;