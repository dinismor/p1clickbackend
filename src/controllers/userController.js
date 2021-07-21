const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/*^ ^ ^ ^ - - - REQUIRES TOKENS ETC - - -  ^ ^ ^ ^ */

// ------------ MODELS ------------
//var User = require("../model/User");
var Utente = require("../model/Utente");
//var Utente_responsavel = require("../model/Utente_responsavel");
//var Marcacao = require("../model/Marcacao");

var Funcionario = require("../model/Funcionario");
var Consulta = require("../model/Consulta");

/*--------------------------------------------*/
const sequelize = require("../model/database");
const config = require("../config");
const controllers = {};
sequelize.sync();

//------------------------------MARCAR CONSULTA UTENTE JOSÉ PINHEIRO------------------------------------------------------

controllers.consulta_utente = async (req, res) => {
  const {
    n_utente_saude,
    tipo_consulta,
    hora_consulta,
    dia_consulta,
    utente_prioritario,
    email,
    telefone,
  } = req.body;
  // criar consulta
  const data = await Consulta.create({
    //id_consulta: id_consulta é autoincremento
    n_utente_saude: n_utente_saude,
    tipo_consulta: tipo_consulta,
    hora_consulta: hora_consulta,
    dia_consulta: dia_consulta,
    utente_prioritario: utente_prioritario,
    email: email,
    telefone: telefone,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });

  res.status(200).json({
    success: true,
    message: "Consulta registada",
    data: data,
  });
};

//-------------------------------------------MARCAR CONSULTA TEMPORÁRIA------------------------------------------------

controllers.consulta_temporaria = async (req, res) => {
  const {
    n_utente_saude,
    tipo_consulta,
    hora_consulta,
    dia_consulta,
    utente_prioritario,
    email,
    telefone,
  } = req.body;
  // criar consulta
  const data = await Consulta.create_temp({
    //id_consulta: id_consulta é autoincremento
    n_utente_saude: n_utente_saude,
    tipo_consulta: tipo_consulta,
    hora_consulta: hora_consulta,
    dia_consulta: dia_consulta,
    utente_prioritario: utente_prioritario,
    email: email,
    telefone: telefone,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });

  res.status(200).json({
    success: true,
    message: "Consulta temporária registada!",
    data: data,
  });
};
//----------------------------------LISTAR CONSULTAS e SELECIONAR ID PARA EDITAR CONSULTA-----------------------------
controllers.consulta_list = async (req, res) => {
  const data = await Consulta.findAll({
    //include: [role],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controllers.consulta_detail = async (req, res) => {
  const { id } = req.params;
  const data = await Consulta.findAll({
    where: { id: id },
    //include: [role],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

//---------------------------------------ADMIN EDITAR CONSULTA UTENTE---------------------------------------------
controllers.consulta_update = async (req, res) => {
  //get id
  const { id } = req.params;

  const {
    tipo_consulta,
    hora_consulta,
    dia_consulta,
    utente_prioritario,
    //email,
    //telefone,
  } = req.body;
  // Update
  const data = await Consulta.update(
    {
      //id_consulta: id_consulta é autoincremento
      //n_utente_saude: n_utente_saude,
      tipo_consulta: tipo_consulta,
      hora_consulta: hora_consulta,
      dia_consulta: dia_consulta,
      utente_prioritario: utente_prioritario,
      //email: email,
      //telefone: telefone,
    },
    {
      where: { id: id },
    }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({
    success: true,
    data: data,
    message: "Consulta editada com sucesso",
  });
};
//---------------------------------------ADMIN ELIMINAR CONSULTA UTENTE---------------------------------------------
controllers.consulta_delete = async (req, res) => {
  // parâmetros por post
  const { id } = req.body;
  // delete por sequelize
  const del = await Consulta.destroy({
    where: { id: id },
  });
  res.json({ success: true, deleted: del, message: "Consulta removida" });
};


controllers.create = async (req,res) => {         
  return bcrypt
          .hash('1234',10)//login.palavra_passe, 10)
                .then((hash) => {
                  //palavra_passe = hash;
                  console.log(hash,"TAMOS NO GRINDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
                })
                .catch(error =>{
                  console.log("Erro: "+error);
                  return error;
                  })
            };


module.exports = controllers;
