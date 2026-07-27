const express = require("express");

const {
  getDashboardStats,
  getUsers,
  deleteUser,
  getReports,
  getReportById,
  verifyReport,
  resolveReport,
  deleteReport,
} = require("../controllers/adminController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/reports/:id/status",
  protect,
  admin,
  updateReportStatus
);

router.get("/dashboard", protect, admin, getDashboardStats);

router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

router.get("/reports", protect, admin, getReports);
router.get("/reports/:id", protect, admin, getReportById);

router.put("/reports/:id/verify", protect, admin, verifyReport);
router.put("/reports/:id/resolve", protect, admin, resolveReport);

router.delete("/reports/:id", protect, admin, deleteReport);

module.exports = router;