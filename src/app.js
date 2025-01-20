const express = require("express");
const router = require("./router/router");
const connectDB = require("./config/db");
const cors = require("cors");

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", router);

// Puerto dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
