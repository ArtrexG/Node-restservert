const express = require('express')
const Perro = require('../models/perro.js');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 

app.get('/perros',  (req, res)=> {
    res.json('Get perros');
  });
  
  app.post('/perros', function (req, res) {
      let body = req.body;
      let perro = new Perro({
          nombre: body.nombre,
          raza:body.raza,
          
          
      });
      
      perro.save((err,usuaioDB)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }else{
            res.json({
                ok:true,
                perro:usuaioDB
            });
        }
      })
    })
  
  app.put('/usuarios/:id', function (req, res) {
      let id = req.params.id;
      let body = req.body;
      Usuario.findByIdAndUpdate(id)
      res.json({
          id
      })
  })
  
  app.delete('/usuarios', function (req, res) {
      res.json('delete usuarios')
  })

  module.exports = app;