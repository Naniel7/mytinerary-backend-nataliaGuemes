const { Schema, model, Types } = require("mongoose");

const schemaUser = new Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    imageURL: {
        type: String,
        require: true,
    },
    country: {
        type: String,
    },
    role: {
        type: String,
        default: 'user', // Rol por defecto
        enum: ['user', 'admin'], // Roles permitidos
    },
});

const User = model("User", schemaUser);

module.exports = User;
