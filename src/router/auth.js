const express = require("express");
const { register, login, authenticated } = require("../controllers/authController");
const { verifyAuthData } = require("../middlewares/verifications");
const { 
  hashPassword, 
  verifyUserExist, 
  verifyPassword, 
  generateToken, 
  authMiddleware 
} = require("../middlewares/auth");

const roleMiddleware = require("../middlewares/roleMiddleware"); // Middleware de roles

const authRouter = express.Router();

// Registro
authRouter.post('/register', verifyAuthData, hashPassword, register);

// Login
authRouter.post('/login', verifyAuthData, verifyUserExist, verifyPassword, generateToken, login);

// Verificar si el usuario está autenticado
authRouter.get('/authenticated', authMiddleware, authenticated);

// Ejemplo de ruta protegida por rol
authRouter.post(
  '/admin-action', 
  authMiddleware, 
  roleMiddleware('admin'), 
  (req, res) => {
    res.json({ message: "Acción permitida solo para administradores" });
  }
);

module.exports = authRouter;
