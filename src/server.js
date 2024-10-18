import express from "express";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import AuthRoute from "./routes/auth/index.js"
import VerifyRoutes from "./routes/verify/index.js";
import StoreRoutes from "./routes/stores/index.js";
import userRoutes from "./routes/user/index.js";
import { authenticateToken } from "./middlewares/index.js";
import cldRoutes from "./routes/cloudinary/index.js";
import ProductRoutes from "./routes/products/index.js";

const app = express();
const mongoURL = process.env.MONGO_URL_CLOUD;

var corsOption = {
    origin: 'https://project-mern-frontend-phi.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: [
        'x-auth-token',
    ],
};
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.send("Hello API success runnning");
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

//Routes
app.use('/api/verify', VerifyRoutes)
app.use('/api/auth', AuthRoute);
app.use('/api/store', authenticateToken, StoreRoutes)
app.use('/api/user', authenticateToken, userRoutes)
app.use('/api/products', ProductRoutes)
app.use("/api/cloud", cldRoutes);

//Server
mongoose.connect(`${mongoURL}`)
    .then(() => console.log("Database is Connected Succesfully"))
    .catch((err) => console.log(err))

app.listen(4000, () => {
    console.log('Server running at port 4000');
});