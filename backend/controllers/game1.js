const Partida = require("../models/game1");

// Obtener todas las partidas
exports.obtenerPartidas = async (req, res) => {
  try {
    const partidas = await Partida.find();
    res.json(partidas);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener las partidas");
  }
};

// Obtener una partida por su ID
exports.obtenerPartidaPorId = async (req, res) => {
  try {
    const partida = await Partida.findById(req.params.id);
    if (!partida) {
      return res.status(404).json({ msg: "Partida no encontrada" });
    }
    res.json(partida);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener la partida");
  }
};

// Crear una nueva partida
exports.crearPartida = async (req, res) => {
  try {
    const partida = new Partida(req.body);
    await partida.save();
    res.json(partida);
  } catch (error) {
    res.status(500).send("Hubo un error al crear la partida");
  }
};

// Actualizar una partida existente
exports.actualizarPartida = async (req, res) => {
  try {
    const partida = await Partida.findById(req.params.id);
    if (!partida) {
      return res.status(404).json({ msg: "Partida no encontrada" });
    }
    partida.jugador = req.body.jugador;
    partida.resultado = req.body.resultado;
    await partida.save();
    res.json(partida);
  } catch (error) {
    res.status(500).send("Hubo un error al actualizar la partida");
  }
};

// Eliminar una partida existente
exports.eliminarPartida = async (req, res) => {
  try {
    const partida = await Partida.findById(req.params.id);
    if (!partida) {
      return res.status(404).json({ msg: "Partida no encontrada" });
    }
    await partida.remove();
    res.json({ msg: "Partida eliminada correctamente" });
  } catch (error) {
    res.status(500).send("Hubo un error al eliminar la partida");
  }
};
