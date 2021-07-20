const express = require('express');
const router = express.Router();

const middleware = require('../middleware');

//importar os controladores

const userController = require('../controllers/userController') 
const utenteController = require('../controllers/utenteController') //controlador utente

router.get('/list_user', middleware.checkToken, utenteController.user_list);
router.post('/register',utenteController.register);
router.post('/login',utenteController.login);
router.get('/createlogin',userController.create);


//----------------------Consultas----------------------
router.get("/list", userController.consulta_list);
router.get("/get/:id", userController.consulta_detail);
router.post("/create", userController.consulta_utente); //marcar consulta utente e administração
router.post('/create_temp', userController.consulta_temporaria); //marcar consulta utente temporária
router.post("/update/:id", userController.consulta_update);
router.post("/delete", userController.consulta_delete);

//------------------------Utentes----------------------
router.get("/list_utente/:id", utenteController.utente_list);
router.get("/get_utente/:id", utenteController.utente_detail);
router.post('/registo_create',utenteController.registo_create);

module.exports = router;