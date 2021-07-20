const Sequelize = require("sequelize");
const sequelize = require("./database");
const Utente = require("./Utente");

var Tipo = sequelize.define('tipoUtente',
  {
    id: {
      type: Sequelize.INTEGER,
     primaryKey: true,
     allowNull: false,
      autoIncrement: true,
    },
    tipo_utente: Sequelize.STRING,
  },
  {    
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Tipo;