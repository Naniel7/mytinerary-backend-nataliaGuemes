/*const Account = require("../models/Account");
const City = require("../models/City");


const addAccount = async (req, res)=> {
    try {
        let {id} = req.query

       let cityFound = await City.findById(id)

       let newAccount = await Account.create({number:"VIN001",_city, cityFound})
       await cityFound.updateOne({accounts:[...cityFound.accounts, newAccount]})
let cityFoundUpdated = await City.findById(id)
       res.status(200).json({
        message: "City has been updated",
city: cityFoundUpdated
       })
    } catch (e) {
        res.status(400).json ({message: e.message})
    }
}

module.exports= addAccount*/