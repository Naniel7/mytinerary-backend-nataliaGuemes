const bcrypt = require('bcrypt');

const hashPassword=(req, res, next) =>{
    try {
        const passwordPlain = req.body.password
      const hashPassword =  bcrypt.hashSync(passwordPlain, 10)
      req.body.password =hashPassword
      next()
    } catch (err) {
        res.status(500).json ({error:err})
    }
}

const verifyPassword = (passwordPlain, hashPassword)=>{
    const isValid = bcrypt.compareSync(passwordPlain, hashPassword)
return isValid
}

module.exports = {
    hashPassword,
    verifyPassword
}