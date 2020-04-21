require ('./config/config.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/usuarios', function (req, res) {
  res.json('Get usuarios')
})

app.post('/usuarios', function (req, res) {
    let body = req.body;
    if(body.name === undefined){
        res.status(400).json({
            ok:false,
            message: "no ingreso el nombre"
        })
    }else{
        res.json({
            body
        });
    }
    
    
    
})

app.put('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/usuarios', function (req, res) {
    res.json('delete usuarios')
})
 
app.listen(process.env.PORT,()=>{
    console.log('escuchando puerto '+ process.env.PORT +pedo);
})