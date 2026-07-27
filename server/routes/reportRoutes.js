const express = require("express");

const {
    createReport,
    getReports,
    getNearbyReports,
    getMyReports,
    getReportById,
    updateReport,
    deleteReport,
    verifyReport,
    resolveReport,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getReports);

router.get("/nearby", getNearbyReports);

router.get("/my-reports", protect, getMyReports);

router.get("/:id", getReportById);

router.post(
    "/",
    protect,
    upload.array("images", 5),
    createReport
);

router.put("/:id", protect, updateReport);

router.delete("/:id", protect, deleteReport);

router.put("/:id/verify", protect, verifyReport);

router.put("/:id/resolve", protect, resolveReport);

module.exports = router;