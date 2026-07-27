const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },

        category: {
            type: String,
            enum: [
                "Pothole",
                "Crack",
                "Waterlogging",
                "Road Block",
                "Street Light",
                "Traffic Signal",
                "Other",
            ],
            default: "Pothole",
        },

        severity: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Verified",
                "In Progress",
                "Resolved",
            ],
            default: "Pending",
        },

        location: {
            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            state: {
                type: String,
                required: true,
            },

            latitude: {
                type: Number,
                required: true,
            },

            longitude: {
                type: Number,
                required: true,
            },

            coordinates: {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },

                coordinates: {
                    type: [Number],
                    required: true,
                    default: [0, 0],
                },
            },
        },

        images: [
            {
                public_id: {
                    type: String,
                },

                url: {
                    type: String,
                },
            },
        ],

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        verifiedAt: {
            type: Date,
            default: null,
        },

        resolvedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

reportSchema.index({ status: 1 });
reportSchema.index({ severity: 1 });
reportSchema.index({ category: 1 });
reportSchema.index({ "location.city": 1 });
reportSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Report", reportSchema);