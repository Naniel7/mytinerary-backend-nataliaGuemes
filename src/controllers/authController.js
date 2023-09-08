const { hashPassword, verifyPassword } = require('../middlewares/auth');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const payload = req.body
        const userExist = await User.findOne({ email: payload.email })

        if (userExist) {
            return res.status(403).json({ message: "User already exist" },)
        }
        const userCreated = await User.create(payload)
        res.status(200).json({
            message: "User created sucessfuly",
            userCreated
        })

    } catch (e) {
        res.status(400).json({ message: e.message })

    }
}

const login = async (req, res) => {
    try {
        const { password, email } = req.body
        const userFounded = await User.findOne({ email: email })
        if (userFounded) {
            if (verifyPassword(password, userFounded.password)) {
                return res.status(200).json({ message: "Sucessfuly logged in" })
            } else {
                return res.status(200).json({ message: "Wrong password" })
            }

        }
        else {
            res.status(400).json("User not founded");
        }


    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

module.exports = { register, login }