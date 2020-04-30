const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let perroSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es necesario']
    },
   
    raza:{
        
        type:String,
        required: true
    },
    
})
perroSchema.methods.toJSON = function() {
 let user = this;
 let userObject =user.toObject();
 delete userObject.password;

 return userObject;
}
perroSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});
module.exports = mongoose.model('perro', perroSchema);