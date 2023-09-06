const User = require('../models/User');

const register = async (req, res) => {
    try {
        const payload = req.body
        const userExist = await User.findOne({ email: payload.email })

        if (userExist) {
            return res.status(403).json({ message: "User already exist" },)
        }
        const userCreated = await User.create(payload)
        console.log("User created");
        res.status(200).json({
            message: "User created sucessfuly",
            userCreated
        })

    } catch (e) {
        res.status(400).json({ message: e.message })

    }
}

module.exports = { register }