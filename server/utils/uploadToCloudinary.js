const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
    console.log("Uploading:", filePath);
    console.log("Exists:", fs.existsSync(filePath));

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "roadwatch",
        });

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return {
            public_id: result.public_id,
            url: result.secure_url,
        };
    } catch (error) {
        console.error(error);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        throw error;
    }
};

module.exports = uploadToCloudinary;