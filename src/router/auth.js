const express = require("express")
const { register, login } = require("../controllers/authController")
const { verifyAuthData } = require("../middlewares/verifications")
const { hashPassword } = require("../middlewares/auth")

const authRouter = express.Router()

authRouter.post('/register', verifyAuthData, hashPassword, register)
authRouter.post('/login', verifyAuthData, login)

module.exports = authRouter