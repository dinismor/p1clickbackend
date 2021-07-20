const Sequelize = require("sequelize");
const sequelize = require("./database");
//const bcrypt = require("bcrypt"); //encripta a pass a guardar na BD

var Funcionario = require('./Funcionario');

var Utente = require('./Utente');

//var Marcacao = require('./Marcacao');
/*
*/
var Consulta = sequelize.define('consulta', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      },
      tipo_consulta: Sequelize.STRING,
      hora_consulta: Sequelize.TIME,
      dia_consulta: Sequelize.STRING,
      utente_prioritario: Sequelize.BOOLEAN,

      id_utente: {
        type: Sequelize.INTEGER,
        references: {
          model: Utente,
          key: "id",
        },
      },

//Chave estrangeira (id funcionario de funcionario)
      

   /*  */
},
{
  freezeTableName: true,
timestamps: false,
});

//////////////////////////////////////
//                                  //
//----------- RELAÇÕES -------------//
//                                  //
//////////////////////////////////////


/*Consulta.hasOne(Funcionario, {foreignKey: { allowNull: false, type: Sequelize.INTEGER }});
Funcionario.belongsTo(Consulta);  // vai retornar a FK id_funcionario relativo a tabela funcionario */

//Funcionario

Consulta.associate= (models) =>
{
  
  Consulta.hasOne(models.Utente,{
  
    foreignKey:'id_utente',
    allowNull:false,
  });

  Consulta.hasOne(models.Funcionario,{
  
    foreignKey:'id_funcionario',
    allowNull:false,
  });

/**/
};



module.exports = Consulta;