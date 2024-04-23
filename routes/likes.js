const express = require('express');
let router = express.Router();

const Like = require('../models/like');

router.post('/', async (req, res) => {
    const like = new Like(req.body);
    try {
        const resultado = await like.save();
        res.status(200).send({ resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});


router.get('/:id', (req, res) => {
    try {
        const idUsuario = req.params.id;
        Like.find({ idUsuario: idUsuario })
        .populate({
            path: "idUsuario"
        })
        .populate({
            path: "idArticulo"
        })
        .then((resultado) => {
            res.json({ likes: resultado });
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

router.get('/:id/total', (req, res) => {
    const idArticulo = req.params.id;
    Like.countDocuments({ idArticulo: idArticulo })
    .then((resultado) => {
        res.json({ totalLikes: resultado });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    });
});


router.delete('/:idArticulo/:idUsuario', (req, res) => {
    const idArticulo = req.params.idArticulo;
    const idUsuario = req.params.idUsuario;

    Like.findOneAndDelete({ idArticulo: idArticulo, idUsuario: idUsuario })
    .then((resultado) => {
        res.json({ resultado });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    });
});
module.exports = router;