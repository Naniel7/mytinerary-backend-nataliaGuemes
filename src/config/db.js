const { connect } = require("mongoose");

const MONGO_PASS = "Gyxy4JhZHEdp12lb"

const connectDB = async () => {
    try {
      const URI = `mongodb+srv://Naniel7:${MONGO_PASS}@cluster0.1zmxcdh.mongodb.net/?retryWrites=true&w=majority`;

      await connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log("Database connection successful");
    } catch (error) {
      console.error("Error connecting to the database:", error.message);
      process.exit(1); // Detiene la aplicación si no se puede conectar
    }
  };
  
  module.exports = connectDB;