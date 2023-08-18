const { Schema, model } = require("mongoose");

let collection = "City"
const schemaCity = new Schema({
    place: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

const City = model("City", schemaCity)

module.exports = City