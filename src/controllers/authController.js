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

        return res.status(200).json({
            message: "User created sucessfuly",
            userCreated
        })

    } catch (e) {
        res.status(400).json({ message: e.message })

    }
}

const login = async (req, res) => {
    try {
        res.status(200).json({
            message: "Succesfully logged in",
            token: req.token,
            user:{
            email:req.user.email,
            id: req.user._id
        }
        
        })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}


const authenticated = async (req,res)=>{
    try {
        res.status(200).json({
            message: "Succesfully Authenticated",
            token: req.token,
            user:{
            email:req.user.email,
            id: req.user._id
        }
        
        })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

module.exports = { register, login, authenticated }