const express = require('express');
const app = express();
const middleware = require('./middleware'); //Importar a middleware para a aplicação
const userRouters = require("./routes/userRoute.js");
//Configurações
app.set('port', process.env.PORT|| 3000);
//Middlewares
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }); 
  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//Rotas
app.use('/teste',(req,res)=>{
res.send("Rota TESTE.");
});

app.use('/consulta', userRouters); 
app.use('/utente', userRouters); 

app.use('/utilizador', userRouters); //Adicionar a camada de segurançaà rota dos funcionários com recurso à middleware
app.use('/utilizador', middleware.checkToken, userRouters); //Adicionar a camada de segurançaà rota dos funcionários com recurso à middleware

app.use('/',(req,res)=>{
res.send("Hello World");
});
app.listen(app.get('port'),()=>{
console.log("Start server on port "+app.get('port'))
});

//import { BrowserRouter as Router, Route, Link } from "react-router-dom";