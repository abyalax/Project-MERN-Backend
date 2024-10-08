import cloudinary from "cloudinary"
import multer from "multer";
import { responseAPI, responseData } from "../../utils/response.js";
import User from "../../models/schema/user.js";
import { Product } from "../../models/schema/product.js";

const storage = new multer.memoryStorage();
const upload = multer({
    storage,
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    if (!res) {
        return responseAPI(res, false, 400, "Failed to upload image at cloudinary");
    }
    return res;
}

const uploadController = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return responseAPI(res, false, 400, "No files were uploaded.");
        }
        const uploadResults = await Promise.all(
            req.files.map(async (file) => {
                const b64 = Buffer.from(file.buffer).toString("base64");
                let dataURI = "data:" + file.mimetype + ";base64," + b64;
                const cldRes = await handleUpload(dataURI);
                return cldRes;
            })
        );
        if (uploadResults.length > 0) {
            console.log("Success Upload Image Product");
            return responseData(res, uploadResults);
        } else {
            console.log("Failed Upload Image Product");
            return responseAPI(res, false, 400, "Failed to upload image at cloudinary");
        }
    } catch (error) {
        console.log(error);
        return responseAPI(res, false, 500, `Internal Server Error: ${error}`);
    }
}


export { upload, uploadController }