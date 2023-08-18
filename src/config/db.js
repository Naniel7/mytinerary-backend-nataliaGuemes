const { connect } = require("mongoose");

const MONGO_PASS = "Gyxy4JhZHEdp12lb"

const URI = `mongodb+srv://Naniel7:${MONGO_PASS}@cluster0.1zmxcdh.mongodb.net/?retryWrites=true&w=majority`;


connect(URI)
    .then(() => {
        console.log("Database connection succeful")
    })
    .catch(() => {
        console.log("Error connecting database")
    })