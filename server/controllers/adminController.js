const User = require("../models/User");
const Report = require("../models/Report");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalReports,
      pendingReports,
      verifiedReports,
      resolvedReports,
    ] = await Promise.all([
      User.countDocuments(),
      Report.countDocuments(),
      Report.countDocuments({ status: "Pending" }),
      Report.countDocuments({ status: "Verified" }),
      Report.countDocuments({ status: "Resolved" }),
    ]);

    res.json({
      totalUsers,
      totalReports,
      pendingReports,
      verifiedReports,
      resolvedReports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    report.status = "Verified";
    report.verifiedBy = req.user._id;
    report.verifiedAt = new Date();

    await report.save();

    res.json({
      message: "Report verified successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resolveReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    report.status = "Resolved";
    report.resolvedAt = new Date();

    await report.save();

    res.json({
      message: "Report resolved successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    await report.deleteOne();

    res.json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  deleteUser,
  getReports,
  getReportById,
  verifyReport,
  resolveReport,
  deleteReport,
};