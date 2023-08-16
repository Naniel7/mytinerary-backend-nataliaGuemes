const express = require("express")
const router = express.Router()
const { getCities, getCity } = require('../controllers/citiesControllers')

router.get("/cities", getCities)
router.get("/city/:id", getCity)

module.exports = router