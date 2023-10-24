
const Vehicle = require("../model/Vehicle");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllVehicles = async (req, res) => {
    const Vehicles = await Vehicle.find().populate('owner');
    res.status(200).json(Vehicles);
}
module.exports.VehicleInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Vehicle.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
};
module.exports.createVehicle = async (req, res) => {
  
    const createVehicle = new Vehicle(req.body);
    createVehicle.save().then((savedVehiccreateVehicle) => {
        return res.status(200).json(savedVehiccreateVehicle)
    })

}
module.exports.updateVehicle = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Vehicle.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteVehicle = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Vehicle.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

