const router = require("express").Router();
const reportController = require("../controller/report.controller");


// report DB
router.get("/", reportController.getAllReports);
router.get("/:id", reportController.ReportInfo);
router.post('', reportController.createReport)
router.put("/:id", reportController.updateReport);
router.delete("/:id", reportController.deleteReport);

// upload
module.exports = router;