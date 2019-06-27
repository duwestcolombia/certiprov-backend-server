var Sequelize = require('sequelize');

var db = require('../config/database');



var Usuarios = db.define('usuarios', {
    //atributos de la tabla
    DOC_USUARIO: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
            len: [2, 12],
            notNull: false

        }
    },
    NOMBRE_USUARIO: {
        type: Sequelize.STRING,
        validate: {
            len: [5, 200],
            notNull: false
        }
    },
    TEL_USUARIO: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 12],
            notNull: false
        }
    },
    EMAIL_USUARIO: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
            len: [3, 200],
            isEmail: {
                args: true,
                msg: "Este no es un correo valido, verifique y vuelva a intentar."
            },
            notNull: false
        }
    },
    PASSWORD_USUARIO: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: 8,
                msg: "La contraseña debe tener minimo 8 caracteres entre Mayusculas, minusculas y caracteres especiales (*,.$/#)"
            }
        }
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
    paranoid: true
})



module.exports = Usuarios;