const express = require('express');
let router = express.Router();
const Usuarios = require('../models/usuario');
const fs = require("fs");
const auth = require('../utils/auth');


// router.post('/login', async (req, res) => {
//     try {
//         const usuarioRecibido = new Usuarios(req.body);
        
//         const usuario = await Usuarios.findOne({ nombre: usuarioRecibido.nombre, password: usuarioRecibido.password });

//         if (usuario) {
//             req.session.usuario = usuario.nombre;
//             return res.status(200).send('login');
//         } else {
//             return res.status(401).send({ error: "Usuario o contraseña incorrectos" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Error interno del servidor');
//     }
// });


router.post('/login', async (req, res) => {
    try {
        const usuarioRecibido = new Usuarios(req.body);
        
        const usuario = await Usuarios.findOne({ nombre: usuarioRecibido.nombre, password: usuarioRecibido.password });

        if (usuario) {
            // req.session.usuario = usuario.nombre;
            return res.status(200).send({accessToken: auth.generarToken(usuario)});
        } else {
            return res.status(401).send({ error: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
});


router.post('/register', async (req, res) => {
    const usuario = new Usuarios(req.body);

    const imagenBase64 = usuario.imagen;
    const imagenData = Buffer.from(imagenBase64, "base64");
    const ruta = "public/uploads/" + usuario.nombre + ".jpg";
    try {
        const usuario = new Usuarios(req.body);
        await usuario.save();
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    //res.redirect('/');
});

module.exports = router;