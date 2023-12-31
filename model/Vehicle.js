const mongoose = require("mongoose");
const insuranceSchema = new mongoose.Schema({
    provider: String,
    policyNumber: String,
    expirationDate: Date,
});

const technicalInspectionSchema = new mongoose.Schema({
    inspectionDate: Date,
    validUntil: Date,
})
const registration = new mongoose.Schema({
    plateNumber: Number,
    issueDate: Date
})
const VehicleSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        licencePlate: {
            type: String,
            unique: true,
        },
        year: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            trim: true,
        },
        technicalInspection: technicalInspectionSchema,
        insurance: insuranceSchema, // Sous-document pour l'assurance
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
