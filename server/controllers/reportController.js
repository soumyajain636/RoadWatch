const Report = require("../models/Report");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const createReport = async (req, res) => {
    try {
        let {
            title,
            description,
            category,
            severity,
            location,
        } = req.body;

        if (typeof location === "string") {
            location = JSON.parse(location);
        }

        if (
            !title ||
            !description ||
            !location ||
            !location.address ||
            !location.city ||
            !location.state ||
            location.latitude === undefined ||
            location.longitude === undefined
        ) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        location.coordinates = {
            type: "Point",
            coordinates: [
                Number(location.longitude),
                Number(location.latitude),
            ],
        };

        const images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uploadedImage = await uploadToCloudinary(file.path);
                images.push(uploadedImage);
            }
        }

        const report = await Report.create({
            user: req.user._id,
            title,
            description,
            category,
            severity: severity?.trim(),
            location,
            images,
        });

        res.status(201).json({
            message: "Report created successfully",
            report,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: reports.length,
            reports,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            count: reports.length,
            reports,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate("user", "name email");

        if (!report) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        res.status(200).json({
            report,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const updateReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                message: "Report not found",
            });
        }

        if (report.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        let data = { ...req.body };

        if (typeof data.location === "string") {
            data.location = JSON.parse(data.location);
        }

        if (data.location) {
            data.location.coordinates = {
                type: "Point",
                coordinates: [
                    Number(data.location.longitude),
                    Number(data.location.latitude),
                ],
            };
        }

        if (data.severity) {
            data.severity = data.severity.trim();
        }

        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Report updated successfully",
            report: updatedReport,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
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

        if (report.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        await report.deleteOne();

        res.status(200).json({
            message: "Report deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
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

        res.status(200).json({
            message: "Report verified successfully",
            report,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
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

        res.status(200).json({
            message: "Report resolved successfully",
            report,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getNearbyReports = async (req, res) => {
    try {
        const { lat, lng, distance = 5000 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                message: "Latitude and longitude are required",
            });
        }

        const reports = await Report.find({
            "location.coordinates": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            Number(lng),
                            Number(lat),
                        ],
                    },
                    $maxDistance: Number(distance),
                },
            },
        }).populate("user", "name email");

        res.status(200).json({
            count: reports.length,
            reports,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    createReport,
    getReports,
    getNearbyReports,
    getMyReports,
    getReportById,
    updateReport,
    deleteReport,
    verifyReport,
    resolveReport,
};