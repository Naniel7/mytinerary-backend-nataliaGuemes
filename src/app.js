const express = require("express")
const router = require("./router/router")
const connectDB = require("./config/db")
const cors = require('cors');

const app = express()

app.use(express.json())
app.use(cors());
app.use("/api", router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
});