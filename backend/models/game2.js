const mongoose = require('mongoose');

const tamagotchiSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  nivelHambre: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  nivelEnergia: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  nivelFelicidad: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  fechaNacimiento: {
    type: Date,
    default: Date.now
  }
});

const Tamagotchi = mongoose.model('Tamagotchi', tamagotchiSchema);

module.exports = Tamagotchi;
