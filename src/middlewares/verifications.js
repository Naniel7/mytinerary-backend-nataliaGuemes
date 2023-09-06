const Joi = require ('joi')

const userSchema = Joi.object ({
    email: Joi.string().email,
    password: Joi.string().alphanum,
})





const verifyDataClient = (req,res,next) =>{
    let {name, lastName, age} =req.body
    if (name==""){
        return res.status(400).json({message:"Invalid name"})
    }
    if (lastName==""){
        return res.status(400).json({message:"Invalid last name"})
    }
    if (age==""){
        return res.status(400).json({message:"Invalid age"})
    }
    if (!name || !lastName || !age)
    return res.status(400).json ({message: "Invalid data"})
next()
}

const verifyAuthData= (req, res, next) => {}

module.exports = {
    verifyDataClient,
}