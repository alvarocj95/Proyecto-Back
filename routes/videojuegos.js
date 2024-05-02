const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videojuego");
const fs = require("fs");
const Usuario = require("../models/usuario");

router.get("/", (req, res) => {
  Videojuego.find()
    .then((resultado) => {
      if (resultado.length === 0) {
        res.status(404).send({ error: "No existen videojuegos" });
      } else {
        res.status(200).send({ videojuegos: resultado });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "Error interno del servidor" });
    });
});

router.get("/:id", (req, res) => {
  Videojuego.findById(req.params.id)
    .then((resultado) => {
      if (resultado) {
        res.status(200).send({ videojuego: resultado });
      } else {
        res
          .status(404)
          .send({ error: "No existe ningún videojuego con ese ID" });
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "Error buscando videojuego" });
    });
});

router.get("/:idUsuario/jugador", (req, res) => {
  const idUsuario = req.params.idUsuario;

  // Busca al usuario por su ID
  Usuario.findById(idUsuario)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({ error: "No se encontró ningún usuario con ese ID" });
      }
      
      // Busca todos los videojuegos asociados a ese usuario
      Videojuego.find({ idUsuario: idUsuario })
        .then((videojuegos) => {
          res.status(200).send({ videojuegos: videojuegos });
        })
        .catch((error) => {
          res.status(500).send({ error: "Error buscando videojuegos" });
        });
    })
    .catch((error) => {
      res.status(500).send({ error: "Error buscando usuario" });
    });
});



router.post("/", (req, res) => {
  let videojuego = new Videojuego(req.body);

  const imagenBase64 = videojuego.imagenPrincipal;
  const imagenData = Buffer.from(imagenBase64, "base64");
  const ruta = "public/uploads/" + videojuego.titulo + "principal" + ".jpg";

  const imagen2Base64 = videojuego.imagenSecundaria;
  const imagen2Data = Buffer.from(imagen2Base64, "base64");
  const ruta2 = "public/uploads/" + videojuego.titulo + "secundaria" + ".jpg";

  const imagen3Base64 = videojuego.imagenTerciaria;
  const imagen3Data = Buffer.from(imagen3Base64, "base64");
  const ruta3 = "public/uploads/" + videojuego.titulo + "terciaria" + ".jpg";

  const imagen4Base64 = videojuego.imagenCuaternaria;
  const imagen4Data = Buffer.from(imagen4Base64, "base64");
  const ruta4 = "public/uploads/" + videojuego.titulo + 'cuaternaria' + ".jpg";

  videojuego
    .save()
    .then(() => {
      res.status(200).send({ videojuego: videojuego });
      fs.writeFile(ruta, imagenData, (error) => {
        if (error) {
          res.status(500).send({ error: "Error guardando imagen" });
        }
      });
      fs.writeFile(ruta2, imagen2Data, (error) => {
        if (error) {
          res.status(500).send({ error: "Error guardando imagen" });
        }
      });

      fs.writeFile(ruta3, imagen3Data, (error) => {
        if (error) {
          res.status(500).send({ error: "Error guardando imagen" });
        }
      });
      fs.writeFile(ruta4, imagen4Data, (error) => {
        if (error) {
          res.status(500).send({ error: "Error guardando imagen" });
        }
      });
    })
    .catch((error) => {
      res.status(500).send({ error: "Error interno del servidor" });
    });
});


router.post('/:id/vendido', (req, res) => {
  const id = req.params.id;


  Videojuego.findByIdAndUpdate(id, { vendido: true }, { new: true })
    .then((resultado) => {
      res.status(200).send({ videojuego: resultado });
    })
    .catch((error) => {
      res.status(500).send({ error: 'Error interno del servidor' });
    });
});

module.exports = router;
