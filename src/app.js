const express = require("express")
const router = require("./router/router")
const connectDB = require("./config/db")


const app = express()

app.use(express.json())

app.use("/api", router)


app.listen(3000, () => {
    console.log("listening on port 3000")
})