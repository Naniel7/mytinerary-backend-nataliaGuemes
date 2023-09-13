const express = require("express")
const { register, login, authenticated } = require("../controllers/authController")
const { verifyAuthData } = require("../middlewares/verifications")
const { hashPassword, verifyUserExist, verifyPassword, generateToken, passportVerificator } = require("../middlewares/auth")

const authRouter = express.Router()

authRouter.post('/register', verifyAuthData, hashPassword, register)
authRouter.post('/login', verifyAuthData, verifyUserExist, verifyPassword,generateToken, login)
authRouter.post('/authenticated', passportVerificator.authenticate("jwt", {session: false}), generateToken, authenticated)

module.exports = authRouter 