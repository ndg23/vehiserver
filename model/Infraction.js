const mongoose = require('mongoose');

 const infractionSchema = new mongoose.Schema({
    typeInfraction: {
        type: String,
        required: true,
    },
    fineAmount: Number,
    // You can add other relevant fields here
});


module.exports = infractionSchema;
