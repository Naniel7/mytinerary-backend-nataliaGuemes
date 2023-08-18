const express = require("express")
const router = express.Router()
const { getCities, getCity, addCity, deleteCity } = require('../controllers/citiesController')
const { verifyDataCity } = require('../middlewares/verifications');
const addAccount = require("../controllers/accountController");


router.get("/cities", getCities)
router.get("/cities/:id", getCity)
router.post("/cities",verifyDataCity, addCity)
router.delete("/cities", deleteCity)
//router.post("/accounts",addAccount)


module.exports = router