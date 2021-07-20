const Sequelize = require("sequelize");
const sequelize = require("./database");
// const bcrypt = require("bcrypt"); //encripta a pass a guardar na BD

//var Consulta = require("./Consulta");
const Utente = require("./Utente");

var Funcionario = sequelize.define('funcionario',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },  
    tipo_funcionario: Sequelize.INTEGER,
    n_utente_saude: {
      type: Sequelize.INTEGER,
      references:{
        model: Utente,
        key:"id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Funcionario;