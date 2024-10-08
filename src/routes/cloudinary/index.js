import { Router } from "express";
import { uploadController, upload } from "../../controller/cloudinary/index.js";

const cldRoutes = Router();

cldRoutes.post('/upload', upload.array("my_file"), uploadController)

export default cldRoutes