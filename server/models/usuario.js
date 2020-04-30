const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required:[true, 'El correo es necesario'],
        unique: true
        
        
    },
    password:{
        
        type:String,
        required: true
    },
    img:{
        type: String,
        required:false
    },
    role:{
        type: String,
        default: 'User_role',
        enum:{
            values:['User_role','Admin role'],
            message:'{VALUE} no es un rol valido'

        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default:false
    }
})

usuarioSchema.methods.toJSON = function() {
 let user = this;
 let userObject =user.toObject();
 delete userObject.password;

 return userObject;
}
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});
module.exports = mongoose.model('Usuario', usuarioSchema);