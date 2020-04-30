require ('./config/config.js')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');


app.use(require('./rutas/usuarios.js'));
app.use(require('./rutas/perros.js'));

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 


mongoose.connect(process.env.urlDB,{useNewUrlParser:true, useCreateIndex:true}, (err,res)=>{
    if(err){
        throw err
    }

    console.log('Conectado a la base de datos')
});

app.listen(process.env.PORT,()=>{
    console.log('escuchando puerto '+ process.env.PORT );
})