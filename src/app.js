const express = require("express");
const router = require("./router/router");
const connectDB = require("./config/db");
const cors = require("cors");

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Rutas
app.use("/api", router);

// Ruta para verificar autenticación del usuario
app.get("/api/auth/me", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }
  res.json({ message: "Usuario autenticado correctamente" });
});

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Puerto dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
