const express = require('express');
const router = express.Router();
const game2 = require('../controllers/game2');

// Obtener todas las mascotas
router.get('/', game2.obtenerTamagotchis);

// Obtener una mascota por su ID
router.get('/:id', game2.obtenerTamagotchiPorId);

// Crear una nueva mascota
router.post('/', game2.crearTamagotchi);

// Actualizar una mascota existente
router.put('/:id', game2.actualizarTamagotchi);

// Eliminar una mascota existente
router.delete('/:id', game2.eliminarTamagotchi);

module.exports = router;
