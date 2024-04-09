const express = require('express');
let router = express.Router();
const Usuarios = require('../models/usuario');
const auth = require('../utils/auth');

router.get("/me", (req, res) => {

    let token = req.headers['authorization'];

  
    if (token && token.startsWith("Bearer "))
          token = token.slice(7);
  
    let resultado = auth.validarToken(token);
  
    res.status(200).send({ resultado : resultado.login });
  });

  
router.get('/:id', async (req, res) => {
    try {
        const resultado = await Usuarios.findById(req.params.id);
        res.status(200).send({ resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});



module.exports = router;