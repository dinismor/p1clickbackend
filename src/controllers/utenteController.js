const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
/*^ ^ ^ ^ - - - REQUIRES TOKENS ETC - - -  ^ ^ ^ ^ */

// ------------ MODELS ------------ 
//var User = require("../model/User");
var Utente = require("../model/Utente");
//var Utente_responsavel = require("../model/Utente_responsavel");
//var Marcacao = require("../model/Marcacao");

var Funcionario = require("../model/Funcionario");
var Consulta = require("../model/Consulta");

/*--------------------------------------------*/
const sequelize = require('../model/database');
const config = require('../config');
const controllers_utente = {}
sequelize.sync()
 

controllers_utente.user_list = async (req, res) => {
    const data = await Login.findAll()
      .then(function (data) {
        return data;
      })
      .catch((error) => {
        return error;
      });
    res.json({ success: true, data: data });
  };
  controllers_utente.register = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await User.create({
      nome: name,
      email: email,
      palavra_passe: password,
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
      message: "Registado",
      data: data,
    });
  };
  
  controllers_utente.login = async (req, res) => {
    const { n_utente_saude, palavra_passe } = req.body;
    
    var pass;
    var login = await Utente.findOne({ where: { n_utente_saude: n_utente_saude } })
      .then(function (data) {
        if (data===null) pass="";
        else pass=data.palavra_passe; 
          return data;
      })
      .catch((error) => {
        console.log("Erro: " + error);
        return error;
      });
      if (login===null && pass==="") {
          res.status(403).json({
          success: false,
          message: "Login errado",
        });
        console.log("----");
        console.log("Sem dados ...");
        console.log("----");
      }
      else{
      if (parseInt(n_utente_saude)===parseInt(login.n_utente_saude)) {
        let bool=bcrypt.compareSync(palavra_passe, pass);
        console.log( "bool "+bool);
        console.log( "TAMOS AQUUIIIIII2 " + login.n_utente_saude);
        console.log( "password " + palavra_passe);
        console.log( "utente saude " + n_utente_saude);
        console.log("pass da BD "+pass);
        if (bool){
          let token = jwt.sign({ n_utente_saude: n_utente_saude }, config.jwtSecret, { expiresIn: '1h' } //expira em 1 hora
          );
          res.json({
            success: true,
            message: "Autenticação realizada com sucesso!",
            token: token,
          });
        }
        else {
          res.status(403).json({
            success: false,
            message: "Dados de autenticação inválidos.",
          });
        }
      }
     else {
      res.status(400).json({
        success: false,
        message: "Erro no processo de autenticação. Tente de novo mais tarde.",
      });
    }
  }
    };
 //---------------------------------------REGISTO---------------------------------------------  

//criar utente
controllers_utente.registo_create = async (req, res) => {
  // data
  const { nome, apelido, email,data_nascimento,localidade, codigopostal, telefone, prioritario, autonomo, n_utente_saude, palavra_passe} = req.body;
  // create
  const data = await Utente.create({
      nome: nome,
      apelido: apelido,
      email: email,

      data_nascimento: data_nascimento,
      localidade: localidade,
      codigo_postal: codigopostal,
      telefone: telefone,
      prioritario: prioritario,
  
      autonomo: autonomo,
      n_utente_saude: n_utente_saude,
      palavra_passe: palavra_passe
      
      
  })
      .then(function (data) {
          return data;
      })
      .catch(error => {
          console.log("Erro: " + error)
          return error;
      })
  // return res
  res.status(200).json({
      success: true,
      message: "Utente Registado",
      data: data
  });
}


 
 //---------------------------------------ADMIN LISTAR UTENTE---------------------------------------------  
 controllers_utente.utente_list = async (req, res) => {
  
    const data = await Utente.findAll({
       
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
  }
  
  //id do utente
  controllers_utente.utente_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Utente.findAll({
        where: { id: id },
        
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
  }
  


  controllers_utente.utente_delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Utente.destroy({
      where: { id: id },
    });
    res.json({ success: true, deleted: del, message: "Utente removido!" });
  };




  controllers_utente.utente_update = async (req, res) => {
    //get id
    const {id} = req.params;
  
    const { nome, apelido, email, localidade, telefone } = req.body;
    // Update
    const data = await Utente.update(
      {
        nome: nome,
        apelido: apelido,
        email: email,
        localidade: localidade,
        telefone: telefone
      },
      {
        where: { id:id},
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
      message: "Utente editado com sucesso",
    });
  };







  module.exports = controllers_utente;