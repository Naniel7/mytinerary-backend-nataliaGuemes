const { Schema, model } = require("mongoose");

const schemaItinerary = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorPhoto: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    hashtags: {
        type: [String],
        required: true,
    },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});


const Itinerary = model("Itinerary", schemaItinerary);


module.exports = {Itinerary};
