//A MODIFICAR


const getCities = (req, res) => {
    res.json({
        Cities: [{
            place: "sfsr",
            country: "dsdfsd",
            image: "25",
        },
        {
            place: "sfsr",
            country: "dsdfsd",
            image: "25",
        }]

    })
}


const getCity = (req, res) => {

    const { id } = req.params


    const { data } = req.query
    if (data) {
        res.json(
            {
                place: "sfsr",
                country: "dsdfsd",
                image: "25",
                paramId: id,
                queryData: data
            })
    } else {
        res.json({
            place: "jhgcesrt",
            country: "ycyfcjutrx",
            image: "52",
            paramId: id
        }
        )
    }



}

module.exports = { getCities, getCity }