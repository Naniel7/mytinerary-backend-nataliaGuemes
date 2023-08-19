const City = require("../models/City");

const getCities = async (req, res) => {
    try {
        let cities = await City.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCity = async (req, res) => {
    try {
        const { id } = req.params;
        let cityFounded = await City.findById(id);
        res.status(200).json(cityFounded);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addCity = async (req, res) => {
    console.log("test");
    try {
        let payload = req.body;
        let cityCreated = await City.create(payload);
        res.json({
            message: "The place has been added",
            city: cityCreated
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        let { id } = req.params;
        await City.deleteOne({ _id: id });
        res.json({
            message: "The place has been deleted"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Update data is empty" });
        }
        const updatedCity = await City.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCity) {
            return res.status(404).json({ message: "City not found" });
        }
        res.json({
            message: "City information updated",
            city: updatedCity
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getCities, getCity, addCity, updateCity, deleteCity };
