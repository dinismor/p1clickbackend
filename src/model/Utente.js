const Sequelize = require("sequelize");
const sequelize = require("./database");
const bcrypt = require("bcrypt"); //encripta a pass a guardar na BD
const tipoUtente = require("./TipoUtente");

var Utente = sequelize.define('utente',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: Sequelize.STRING,
    apelido: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    data_nascimento: Sequelize.DATE,
    localidade: Sequelize.STRING,
    codigo_postal: Sequelize.STRING,
    telefone: Sequelize.INTEGER,
    prioritario: Sequelize.BOOLEAN,
    
    autonomo: Sequelize.BOOLEAN,
    n_utente_saude: Sequelize.INTEGER,
    palavra_passe: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipoUser:
    {
      type: Sequelize.INTEGER,
    //  primaryKey: true,
      references: {
        model: tipoUtente,
        key: "id",
      },
    },
  },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  Utente.beforeCreate((user, options) => {
    return bcrypt.hash(user.palavra_passe, 10)
    .then(hash => {
        user.palavra_passe = hash;
    })
    .catch(err => {
        throw new Error();
    });
});

  Utente.belongsTo(tipoUtente);
module.exports = Utente;


//------------------------------------------------------
