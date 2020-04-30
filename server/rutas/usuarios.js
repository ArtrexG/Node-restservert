const express = require('express')
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const app = express();
const _ = require('underscore');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 

app.get('/usuarios',  (req, res)=> {
    desde = req.query.desde || 0;
    desde = Number(desde);
    
    
    Usuario.find({estado:true},'email usuario role img estado google nombre').skip(desde).limit(20).exec((err,usuarios)=>{
        if(err){
            return res.status(400).json({
               ok:false,
               err
           })
       }else{
           Usuario.count({estado:true},(err,cuantos)=>{

               res.json({
                   ok:true,
                   usuarios,
                   conteo:cuantos
               });
           })
       }
    });
  });
  
  app.post('/usuarios', function (req, res) {
      let body = req.body;
      let usuario = new Usuario({
          nombre: body.nombre,
          email:body.email,
          password: bcrypt.hashSync(body.password,10) ,
          role:body.role
          
      });
      
      usuario.save((err,usuaioDB)=>{
        if(err){
             return res.status(400).json({
                ok:false,
                err
            })
        }else{
            res.json({
                ok:true,
                usuario:usuaioDB
            });
        }
      })
    })
  
  app.put('/usuarios/:id', function (req, res) {
      let id = req.params.id;
      let body = _.pick(req.body,['nombre','password','email']); 
      
      Usuario.findByIdAndUpdate(id,body,{new:true, runValidators:true,context: 'query',setDefaultsOnInsert: true,},(err, UsuarioDB)=>{
          if(err){
            return res.status(400).json({
                  ok:false,
                  err
                  
              })
              
          }
          
          res.json({
            ok: true,
            usuario:UsuarioDB
        })
      })
     
  })
  
  app.delete('/usuarios/:id', function (req, res) {
      let id = req.params.id;
      let estado={
          estado:false
      }
    //   Usuario.findByIdAndDelete(id,(err,UsuarioDB)=>{
    //     if(err){
    //         return res.status(400).json({
    //               ok:false,
    //               err
                  
    //           })
              
    //       }
    //       if(UsuarioDB === null){
    //         return res.status(400).json({
    //             ok:false,
    //             err: 'el usuario ya ha sido borrado'
                
    //         })
    //       }

    //       res.json({
    //         ok: true,
    //         usuario:UsuarioDB
    //     })
    //   })

    Usuario.findByIdAndUpdate(id,estado,{new:true},(err, UsuarioDB)=>{
        if(err){
          return res.status(400).json({
                ok:false,
                err
                
            })
            
        }
        
        res.json({
          ok: true,
          usuario:UsuarioDB
      })
    })
       
  })

  module.exports = app;