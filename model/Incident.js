const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    incidentType: {
        type: String,
        required: true,
    },
    propertyDamage: Number,
    injuries: Number,
    // You can add other relevant fields here
});

module.exports = incidentSchema;
