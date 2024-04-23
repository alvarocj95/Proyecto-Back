const mongoose = require('mongoose');
const Videojuego = require('./videojuego');
const Usuario = require('./usuario');


let likeSchema = new mongoose.Schema({
    idArticulo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'videojuegos'
    },
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuarios'
    },
    fecha:{
        type: Date,
        default: Date.now
    }
})

let Like = mongoose.model('likes', likeSchema);
module.exports = Like