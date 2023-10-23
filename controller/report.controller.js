
const Report = require("../model/Report");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllReports = async (req, res) => {
    const Reports = await Report.find().select("-password");
    res.status(200).json(Reports);
}
module.exports.ReportInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Report.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
};
module.exports.createReport = async (req, res) => {

    const Report = new Report(req.body);

    Report.save().then((savedReport) => {
        return res.status(200).json(savedReport)
    })

}
module.exports.updateReport = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Report.findOneAndUpdate(
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

module.exports.deleteReport = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Report.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

