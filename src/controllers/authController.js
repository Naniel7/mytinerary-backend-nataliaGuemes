const { hashPassword } = require('../middlewares/auth');
const User = require('../models/User');

// Registro de usuario
const register = async (req, res) => {
    try {
        const payload = req.body;

        // Verifica si el usuario ya existe
        const userExist = await User.findOne({ email: payload.email });
        if (userExist) {
            return res.status(403).json({ message: "User already exists" });
        }

        // Hashea la contraseña antes de crear el usuario
        hashPassword(req, res, async () => {
            const userCreated = await User.create({
                ...payload,
                role: 'user', // Asigna el rol 'user' automáticamente
            });

            return res.status(200).json({
                message: "User created successfully",
                user: {
                    email: userCreated.email,
                    id: userCreated._id,
                    role: userCreated.role,
                },
            });
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        res.status(200).json({
            message: "Successfully logged in",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user._id,
                role: req.user.role,
            },
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

// Verificación de autenticación (JWT)
const authenticated = async (req, res) => {
    try {
        res.status(200).json({
            message: "Successfully authenticated",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user._id,
                role: req.user.role,
            },
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

// Asignar rol de admin a un usuario (solo administradores pueden hacerlo)
const assignAdminRole = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({
            message: "User promoted to admin successfully",
            user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, authenticated, assignAdminRole };
