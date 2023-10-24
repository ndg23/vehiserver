
const User = require("../model/User");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
}
module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
};
module.exports.createUser = async (req, res) => {
    const { email } = req.body
    const userexist = await User.findOne({ email })
    if (userexist) {
        return res.status(409).json("Cet user exist already")
    }
    const user = new User(req.body);
    user.save().then((savedUser) => {
        return res.status(200).json(savedUser)
    })

}
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.findOneAndUpdate(
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

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await User.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

