const router = require("express").Router();
const vehicleController = require("../controller/vehicle.controller");

// user DB
router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.VehicleInfo);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

// upload
module.exports = router;