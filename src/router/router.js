const express = require("express")
const router = express.Router()
const { getCities, getCity, addCity, deleteCity } = require('../controllers/citiesController')
const { verifyDataCity } = require('../middlewares/verifications');
const addAccount = require("../controllers/accountController");

router.get("/cities", getCities)
router.get("/cities/:id", getCity)
router.post("/cities", addCity)
router.delete("/cities", deleteCity)


module.exports = router