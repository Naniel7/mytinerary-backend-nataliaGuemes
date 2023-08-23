const mongoose = require("mongoose");
require('./db')

const City = require("../models/City")

const cities = [
    {
        "place": "Château Guillard",
        "country": "France",
        "image": "//s.imgur.com/min/embed.js"
    },
    {
        "place": "Busan",
        "country": "South Korea",
        "image": "https://i.imgur.com/3eoE618.jpg"
    },
    {
        "place": "Rialto",
        "country": "Italy",
        "image": "https://imgur.com/g6Bb1ev"
    },
    {
        "place": "Katmandú",
        "country": "Nepal",
        "image": "https://imgur.com/AmEI7Ml"
    },
    {
        "place": "Hollywood",
        "country": "USA",
        "image": "https://imgur.com/y7lDFtS"
    },
    {
        "place": "Petra",
        "country": "Jordan",
        "image": "https://imgur.com/0BIf5YM"
    },
    {
        "place": "Paris",
        "country": "France",
        "image": "https://imgur.com/jEu3lTw"
    },
    {
        "place": "Ayutthaya",
        "country": "Tailand",
        "image": "https://imgur.com/8Me4Ffh"
    },
    {
        "place": "Eichenwalde",
        "country": "Germany",
        "image": "https://imgur.com/BRzgE6R",
    },
    {
        "place": "Lijang",
        "country": "China",
        "image": "https://imgur.com/dOe7MbB",
    },
    {
        "place": "Colosseo",
        "country": "Italy",
        "image": "https://imgur.com/CAUVDPo",
    },
    {
        "place": "Ilios",
        "country": "Greek",
        "image": "https://imgur.com/0XonWLl"
    }
]

const insertCities = async (req, res) => {
    try {

        await City.insertMany(cities);

        res.status(200).json({ message: "Collection has been added" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

module.exports = insertCities;

/*
City.insertMany(cities)
  .then(() => {
    console.log("cities loading")
  })
  .catch((error) => {
    console.error("error loading cities", error.message)
  }); /*/


