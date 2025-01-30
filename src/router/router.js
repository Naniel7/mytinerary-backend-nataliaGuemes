const express = require("express");
const router = express.Router();
const { getCities, getCity, addCity, deleteCity } = require('../controllers/citiesController');
const { getItineraries, getItinerariesByCity, getItinerary, createItinerary, updateItinerary, deleteItinerary } = require('../controllers/itinerariesControllers');
const authRouter = require("./auth");
//const { authMiddleware: authMiddleware } = require('../middlewares/auth');
const { assignAdminRole } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Rutas generales
router.get("/cities", getCities);
router.get("/cities/:id", getCity);
router.post("/cities", addCity);
router.delete("/cities", deleteCity);

router.get("/itineraries", getItineraries);
router.get("/itineraries/:cityId", getItinerariesByCity);
router.get("/itineraries/:id", getItinerary);
router.post("/itineraries", createItinerary);
router.put("/itineraries/:id", updateItinerary);
router.delete("/itineraries/:id", deleteItinerary);

// Ruta para asignar rol de admin a un usuario
router.put("/user/:id/make-admin", authMiddleware, roleMiddleware("admin"), assignAdminRole);

// Otras rutas
router.use("/user", authRouter);

module.exports = router;
