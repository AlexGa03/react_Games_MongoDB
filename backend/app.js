// Importar las librerías necesarias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
// Importar las rutas
const game1 = require('./routes/game1');
const game2 = require('./routes/game2');
// Conectar a la base de datos usando mongoose
mongoose.connect("mongodb+srv://ROOT:Monlau2021@clusterm9.feji1ev.mongodb.net/ReactGames", {
  useNewUrlParser: true, // Estos parámetros son recomendados por mongoose
  useUnifiedTopology: true
});

// Obtener la conexión y manejar errores
const db = mongoose.connection;
// Si ocurre un error, lo mostramos en la consola
db.on("error", console.error.bind(console, "Connection error:"));
// Cuando se establece la conexión correctamente, mostramos un mensaje en la consola
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Inicializar la aplicación de Express
const app = express();

// Configurar la aplicación
app.use(express.json());

// Configurar CORS para Vite-React
const allowedOrigins = ['http://localhost:3000','http://127.0.0.1:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Configurar las rutas
app.use('/partidas', game1);
app.use('/mascotas', game2);
// Manejar errores 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Manejar otros errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });


// Exportar la aplicación
module.exports = app;
