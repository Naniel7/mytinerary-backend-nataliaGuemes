const Joi = require('joi')

const userSchema = Joi.object({
 
    name: Joi.string().min(2).max(50).optional().messages({
        'string.min': "Name must be at least 2 characters",
        'string.max': "Name must be at most 50 characters",
        'string.empty': "Please enter your name",
        'any.required': "Please enter your name ",
    }),
    lastName: Joi.string().min(2).max(36).optional().messages({
        'string.min': "Last name must be at least 2 characters",
        'string.max': "Last name must be at most 50 characters",
        'string.empty': "Please enter your last name",
        'any.required': "Please enter your last name",
    }),
       email: Joi.string().email().min(4).max(25).required().messages({
        'string.email': "Please enter a valid email",
        'string.min': "Email must be at least 4 characters",
        'string.max': "Email must be at most 25 characters",
        'string.empty': "Please enter your email",
        'any.required': "Please enter your email",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        'string.min': "Password must be at least 6 characters",
        'string.max': "Password must be at most 30 characters",
        'string.empty': "Please enter your password",
        'any.required': "Please enter your password",
    }),
    imageURL: Joi.string().uri().optional().messages({
        'string.uri': "Image URL must be a valid URI",
    }),
    country: Joi.string().min(2).max(50).optional().messages({
        'string.min': "Country must be at least 2 characters",
        'string.max': "Country must be at most 50 characters",
    }),
});


const verifyDataClient = (req, res, next) => {
    let { name, lastName, age } = req.body
    if (name == "") {
        return res.status(400).json({ message: "Invalid name" })
    }
    if (lastName == "") {
        return res.status(400).json({ message: "Invalid last name" })
    }
    if (age == "") {
        return res.status(400).json({ message: "Invalid age" })
    }
    if (!name || !lastName || !age)
        return res.status(400).json({ message: "Invalid data" })
    next()
}

const verifyAuthData = (req, res, next) => {
    const payload = req.body;
    console.log(payload);
    const userValidated = userSchema.validate(payload, {abortEarly: false});
    if (userValidated.error) {
        return res.status(400).json({ message: userValidated.error.details.map((err) => err.message) })
    }
    next()
} 
module.exports = {
    verifyDataClient,
    verifyAuthData,
}