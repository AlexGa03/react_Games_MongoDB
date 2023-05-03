const Tamagotchi = require("../models/game2");

// Obtener todas las mascotas
exports.obtenerTamagotchis = async (req, res) => {
  try {
    const tamagotchis = await Tamagotchi.find();
    res.json(tamagotchis);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener las mascotas");
  }
};

// Obtener una mascota por su ID
exports.obtenerTamagotchiPorId = async (req, res) => {
  try {
    const tamagotchi = await Tamagotchi.findById(req.params.id);
    if (!tamagotchi) {
      return res.status(404).json({ msg: "Mascota no encontrada" });
    }
    res.json(tamagotchi);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener la mascota");
  }
};

// Crear una nueva mascota
exports.crearTamagotchi = async (req, res) => {
  try {
    const tamagotchi = new Tamagotchi(req.body);
    await tamagotchi.save();
    res.json(tamagotchi);
  } catch (error) {
    res.status(500).send("Hubo un error al crear la mascota");
  }
};

// Actualizar una mascota existente
exports.actualizarTamagotchi = async (req, res) => {
  try {
    const tamagotchi = await Tamagotchi.findById(req.params.id);
    if (!tamagotchi) {
      return res.status(404).json({ msg: "Mascota no encontrada" });
    }
    tamagotchi.nombre = req.body.nombre;
    tamagotchi.nivelHambre = req.body.nivelHambre;
    tamagotchi.nivelEnergia = req.body.nivelEnergia;
    tamagotchi.nivelFelicidad = req.body.nivelFelicidad;
    tamagotchi.fechaNacimiento = req.body.fechaNacimiento;
    await tamagotchi.save();
    res.json(tamagotchi);
  } catch (error) {
    res.status(500).send("Hubo un error al actualizar la mascota");
  }
};

// Eliminar una mascota existente
exports.eliminarTamagotchi = async (req, res) => {
  try {
    const tamagotchi = await Tamagotchi.findById(req.params.id);
    if (!tamagotchi) {
      return res.status(404).json({ msg: "Mascota no encontrada" });
    }
    await tamagotchi.remove();
    res.json({ msg: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).send("Hubo un error al eliminar la mascota");
  }
};
