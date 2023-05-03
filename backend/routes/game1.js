const express = require('express');
const router = express.Router();
const game1Controller = require('../controllers/game1');

// Obtener todas las partidas
router.get('/', game1Controller.obtenerPartidas);

// Obtener una partida por su ID
router.get('/:id', game1Controller.obtenerPartidaPorId);

// Crear una nueva partida
router.post('/', game1Controller.crearPartida);

// Actualizar una partida existente
router.put('/:id', game1Controller.actualizarPartida);

// Eliminar una partida existente
router.delete('/:id', game1Controller.eliminarPartida);

module.exports = router;
