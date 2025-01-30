const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

// Usar una clave secreta desde variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || "secretKey";

// 🔹 Configuración de Passport para JWT
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// 🔹 Middleware para encriptar la contraseña antes de guardar un usuario
const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // Asignar el rol predeterminado si no se proporciona
    req.body.role = req.body.role === "admin" ? "admin" : "user";

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Middleware para verificar la contraseña al iniciar sesión
const verifyPassword = async (req, res, next) => {
  try {
    if (!req.user || !req.user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(req.body.password, req.user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Middleware para verificar si un usuario existe antes de iniciar sesión
const verifyUserExist = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Middleware para generar un token JWT
const generateToken = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(500).json({ message: "User data missing" });
    }

    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      SECRET_KEY,
      { expiresIn: "1h" } // Expira en 1 hora
    );

    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Middleware para proteger rutas con autenticación
const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error", error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized", error: info?.message || "No user found" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyUserExist,
  generateToken,
  authMiddleware,
};
