const mongoose = require('mongoose');
let usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    valoracion:{
        type: Number,
        default: null
    },
    plan:{
        type: String,
        enum: ['Básico', 'Premium', 'Profesional']
    },
    saldo:{
        type: Number,
        default: 0
    }
})

let Usuario = mongoose.model('usuarios', usuarioSchema);
module.exports = Usuario