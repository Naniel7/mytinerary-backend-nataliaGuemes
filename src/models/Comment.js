const { Schema, model } = require("mongoose");
const schemaComment = new Schema({

});


const Comment = model("Comment", schemaComment);

module.exports = {Comment,
};
