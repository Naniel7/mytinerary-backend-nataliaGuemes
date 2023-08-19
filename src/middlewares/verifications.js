/*
const verifyDataCity = (req, res, next) => {

    let { place, country, image } = req.body
    if (!place || !country || !image) {
        return res.status(400).json({ message: "Invalid data" })
    }
    if (place == "") {
        return res.status(400).json({ message: "Place not found" })
    }
    if (country == "") {
        return res.status(400).json({ message: "Country not found" })
    }
    if (image == "") {
        return res.status(400).json({ message: "Image not found" })
    }
    next
}

module.exports = { verifyDataCity }*/