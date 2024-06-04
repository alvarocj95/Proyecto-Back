const express = require('express');
let router = express.Router();
const Usuarios = require('../models/usuario');
const Tarjeta = require('../models/tarjeta');
const auth = require('../utils/auth');



router.get('/todos', async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.status(200).send({ usuarios });
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' });
  }
})

router.get("/me", async (req, res) => {
  try {
      let token = req.headers['authorization'];

      if (token && token.startsWith("Bearer ")) {
          token = token.slice(7);
      } 
      let resultado = auth.validarToken(token);

     
      const userId = resultado.login._id;
      console.log(resultado.login._id);

      const user = await Usuarios.findById(userId);

      res.status(200).send({ resultado: user });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const resultado = await Usuarios.findById(req.params.id);
        res.status(200).send({ resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

router.get('/:id/imagen', async (req, res) => {
    try {
        const resultado = await Usuarios.findById(req.params.id);
        res.status(200).send({ imagen: resultado.imagen });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}); 


router.get('/:id/tarjetas', async (req, res) => {
    try {
        const resultado = await Tarjeta.find({ idUsuario: req.params.id });
        res.status(200).send({ tarjetas: resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});


router.put('/:id/saldo', async (req, res) => {
    const userId = req.params.id;
    const nuevoSaldo = req.body.nuevoSaldo;
  
    try {
      const usuario = await Usuarios.findById(userId);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      usuario.saldo += parseFloat(nuevoSaldo);
      console.log('Nuevo saldo:', usuario.saldo);
      await usuario.save();
      
      return res.status(200).send(String(usuario.saldo));
    } catch (error) {
      console.error('Error al actualizar el saldo:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  });


  router.put('/:id/password', async (req, res) => {
    const userId = req.params.id;
    const nuevaContrasena = req.body.password;
  
    try {
      const usuario = await Usuarios.findById(userId);
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      usuario.password = nuevaContrasena;
      await usuario.save();
      
      return res.status(200).send({message: 'Contrasena cambiada'});
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  });

  // router.put('/:id/nombre', async (req, res) => {
  //   const userId = req.params.id;
  //   const nuevoNombre = req.body.nuevoNombre;
  
  //   try {
  //     const usuario = await Usuarios.findById(userId);
  
  //     if (!usuario) {
  //       return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  //     }
  
  //     usuario.nombre = nuevoNombre;
  //     await usuario.save();
  //     console.log(usuario);
      
  //     return res.status(200).send({message: 'Nombre cambiada'});
  //   } catch (error) {
  //     console.error('Error al actualizar el nombre:', error);
  //     return res.status(500).json({ mensaje: 'Error interno del servidor' });
  //   }
  // });

  router.put("/:id/nuevaTarjeta", async (req, res) => {
    const userId = req.params.id;
    const nuevaTarjeta = req.body.nuevaTarjeta;

    try {
        const tarjetaCreada = await Tarjeta.create(nuevaTarjeta);

        const resultado = await Usuarios.findByIdAndUpdate(
            userId,
            { $push: { tarjetas: tarjetaCreada._id } },
            { new: true }
        );

        if (!resultado) {
            return res.status(404).send({ error: "No existe el número de usuario" });
        }

        res.status(200).send({ resultado });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al actualizar el usuario" });
    }
});


  router.post("/:id/nombre", (req, res) => {
    Usuarios.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nuevoNombre,
    }).then((resultado) => {
      res.status(200).send(resultado);
    }).catch((error) => {
      res.status(500).send({ error: "No existe el número de usuario" });
  });
  });
  
  


module.exports = router;