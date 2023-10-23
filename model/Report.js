const mongoose = require('mongoose');
const infractionSchema = require('./Infraction');
const incidentSchema = require('./Incident');


const reportSchema = new mongoose.Schema({
    // Des champs communs aux infractions et aux incidents
    // Par exemple : lieu, date, description, etc.
    location: String,
    date: Date,
    description: String,
    commitedBy: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    // Propriété pour distinguer s'il s'agit d'une infraction ou d'un incident
    reportType: {
        type: String,
        required: [true, 'Infraction ou Incidents']
    }, // "Infraction" ou "Incident" par exemple

    // Propriété spécifique à l'infraction (null pour les incidents)
    infraction: infractionSchema,

    // Propriété spécifique à l'incident (null pour les infractions)
    incident: incidentSchema,
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;