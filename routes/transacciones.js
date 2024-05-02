const express = require('express');
let router = express.Router();

const Transaccion = require('../models/transaccion');


router.post('/', async (req, res) => {
    const transaccion = new Transaccion(req.body);
    try {
        const resultado = await transaccion.save();
        res.status(200).send({ resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});


router.get("/", (req, res) => {
    Transaccion.find()
      .populate({
        path: "idVendedor"
      })
      .populate({
        path: "idComprador"
      })
      .populate({
        path: "idArticulo"
      })
      .then((resultado) => {
        if (resultado.length === 0) {
          res.status(404).send({ error: "No existen transacciones" });
        } else {
          res.status(200).send({ transacciones: resultado });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: "Error interno del servidor" });
      });
})


router.get('/:id', (req, res) => {
    try {
        const idUsuario = req.params.id;
        Transaccion.find({
            $or: [
                { idComprador: idUsuario },
                { idVendedor: idUsuario }
            ]
        })
        .populate({
            path: "idVendedor"
        })
        .populate({
            path: "idComprador"
        })
        .populate({
            path: "idArticulo"
        })
        .then((resultado) => {
            res.json({ transacciones: resultado });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.get('/:id/finalizadas', (req, res) => {
  try {
      const idUsuario = req.params.id;
      Transaccion.find({
          $or: [
              { finalComprador: idUsuario },
              { finalVendedor: idUsuario }
          ]
      })
      .populate({
          path: "idVendedor"
      })
      .populate({
          path: "idComprador"
      })
      .populate({
          path: "idArticulo"
      })
      .populate({
          path: "finalComprador"
      })
      .populate({
          path: "finalVendedor"
      })
      .then((resultado) => {
          res.json({ transacciones: resultado });
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Error del servidor' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
  }
});

// router.get('/:id/articulo', (req, res) => {
//     try {
//         const idArticulo = req.params.id;
//         Transaccion.findById({
//             idArticulo: idArticulo
//         .populate({
//             path: "idArticulo"
//         })
//         .then((resultado) => {
//             res.json({ transacciones: resultado });
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).json({ error: 'Error del servidor' });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error del servidor' });
//     }
// });

router.get('/:id/articulo', (req, res) => {
    const id = req.params.id;
    Transaccion.findById(id)    
    .populate({
        path: "idArticulo"
    })
    .populate({
        path: "idComprador"
    })
    .populate({
        path: "idVendedor"
    })
    .populate({
        path: "finalComprador"
    })
    .populate({
        path: "finalVendedor"
    })
    .then((resultado) => {
        res.json({ transaccion: resultado });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    });
});



router.get('/:id/total', (req, res) => {
    const idArticulo = req.params.id;
    Transaccion.countDocuments({ idArticulo: idArticulo })
    .then((resultado) => {
        res.json({ totalTransacciones: resultado });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    });
});

router.post('/:id/true', (req, res) => {
    const id = req.params.id;
  
    let estadoActualizado = 'Aceptada' ;
  
    Transaccion.findByIdAndUpdate(id, { estado: estadoActualizado, okVendedor: true }, { new: true })
      .then((resultado) => {
        res.status(200).send({ transaccion: resultado });
      })
      .catch((error) => {
        res.status(500).send({ error: 'Error interno del servidor' });
      });
  });
  
  router.post('/:id/false', (req, res) => {
    const id = req.params.id;
  
    let estadoActualizado = 'Rechazada';
  
    Transaccion.findByIdAndUpdate(id, { estado: estadoActualizado, okVendedor: false }, { new: true })
      .then((resultado) => {
        res.status(200).send({ transaccion: resultado });
      })
      .catch((error) => {
        res.status(500).send({ error: 'Error interno del servidor' });
      });
  });

  router.post('/:id/:idComprador/:idVendedor/finalizar', (req, res) => {
    const id = req.params.id;
  
    let estadoActualizado = 'Finalizada';
  
    Transaccion.findByIdAndUpdate(id, { estado: estadoActualizado, finalComprador: req.params.idComprador, finalVendedor: req.params.idVendedor }, { new: true })
      .then((resultado) => {
        res.status(200).send({ transaccion: resultado });
      })
      .catch((error) => {
        res.status(500).send({ error: 'Error interno del servidor' });
      });
  });

module.exports = router;