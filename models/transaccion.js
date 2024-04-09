const mongoose = require('mongoose');
const Videojuego = require('./videojuego');
const Usuario = require('./usuario');


let transaccionSchema = new mongoose.Schema({
    idArticulo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'videojuegos'
    },
    idComprador:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuarios'
    },
    idVendedor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'usuarios'
    },
    okComprador:{
        type: Boolean,
        default: true
    },
    okVendedor:{
        type: Boolean,
        default: false
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    estado:{
        type: String,
        enum: ['Pendiente', 'Aceptada', 'Rechazada', 'Finalizada'],
        default: 'Pendiente'
    }
})

let Transaccion = mongoose.model('transacciones', transaccionSchema);
module.exports = Transaccion