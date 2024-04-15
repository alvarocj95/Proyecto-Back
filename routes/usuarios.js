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

router.put('/:id/saldo', async (req, res) => {
    const userId = req.params.id;
    const nuevoSaldo = req.body.nuevoSaldo;
  
    try {
      // Obtener el usuario de la base de datos
      const usuario = await Usuarios.findById(userId);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      // Actualizar el saldo del usuario
      usuario.saldo += parseFloat(nuevoSaldo);
      await usuario.save();
  
      return res.status(200).json(usuario);
    } catch (error) {
      console.error('Error al actualizar el saldo:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  });



module.exports = router;