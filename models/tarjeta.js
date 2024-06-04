const mongoose = require('mongoose');
let tarjetaSchema = new mongoose.Schema({
    idUsuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    numero:{
        type: String,
        required: true,
        maxlength: 16,
        minlength: 16,
        unique: true
    },
    cvv:{
        type: String,
        required: true,
        maxlength: 3,
        minlength: 3
    },
    mes:{
        type: String,
        default: 'Enero',
        required: true,
    }, 
    anyo: {
        type: String,
        required: true,
        maxlength: 4,
        minlength: 4,
        default: '2025'
    }
    
})

let Tarjeta = mongoose.model('tarjetas', tarjetaSchema);
module.exports = Tarjeta