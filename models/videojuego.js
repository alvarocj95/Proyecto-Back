const mongoose = require('mongoose');
let videojuegoSchema = new mongoose.Schema({
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    titulo:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    lanzamiento:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    estado:{
        type: String,
        enum: ['Precintado', 'Como nuevo', 'Usado', 'Mal estado']
    },
    tipo:{
        type: String,
        enum: ['Juego', 'Consola']
    },
    imagenPrincipal:{
        type: String
    },
    imagenSecundaria:{
        type: String
    }
    ,
    imagenTerciaria:{
        type: String
    }
    ,
    imagenCuaternaria:{
        type: String
    },
    vendido:{
        type: Boolean,
        default: false
    }
})

let Videojuego = mongoose.model('videojuegos', videojuegoSchema);
module.exports = Videojuego;