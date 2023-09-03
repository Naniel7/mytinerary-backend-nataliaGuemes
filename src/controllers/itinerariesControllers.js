const express = require("express");
const router = express.Router();
const { Itinerary } = require("../models/Itinerary")

// To get all itineraries
const getItineraries = async (req, res) => {
    try {
        let itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: "Error getting all itineraries" });
    }
};

// to get all the itineraries of a city
const getItinerariesByCity = async (req, res) => {
    const cityId = req.params.cityId;
    try {
        const itineraries = await Itinerary.find({ id: cityId });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: "Error to get al  the itineraries of an city" });
    }
};

// to get itineraries by id
const getItinerary = async (req, res) => {
    const itineraryId = req.params.id;
    try {
        const itinerary = await Itinerary.findById(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: "Itinerary not found." });
        }
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: "Error to get an itinerary" });
    }
};

// to create a new itinerary
const createItinerary = async (req, res) => {
    const newItineraryData = req.body;
    try {
        const newItinerary = await Itinerary.create(newItineraryData);
        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(500).json({ error: "Error creating itinerary." });
    }
};

// to modify an itinerary
const updateItinerary = async (req, res) => {
    const itineraryId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(itineraryId, updatedData, { new: true });
        if (!updatedItinerary) {
            return res.status(404).json({ error: "Itinerary not found." });
        }
        res.json(updatedItinerary);
    } catch (error) {
        res.status(500).json({ error: "Error to modify an ininerary." });
    }
};

// to delete an itinerary
const deleteItinerary = async (req, res) => {
    const itineraryId = req.params.id;
    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryId);
        if (!deletedItinerary) {
            return res.status(404).json({ error: "Itinerary not found." });
        }
        res.json({ message: "Itinerary delete succesful." });
    } catch (error) {
        res.status(500).json({ error: "Error to delete an itinerary." });
    }
};

module.exports = {getItineraries, getItinerariesByCity, getItinerary, createItinerary, updateItinerary, deleteItinerary};
