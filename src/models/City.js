const { Schema, model, Types } = require("mongoose");

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
    },
    /*accounts: [{
        type: Types.ObjectId,
        ref: "Account"
    }]*/
})

const City = model("City", schemaCity)

module.exports = City