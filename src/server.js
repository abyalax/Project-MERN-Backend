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


const app = express();
const mongoURL = process.env.MONGO_URL;

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token', "Access-Control-Allow-Credentials"]
};
app.use(cors(corsOption));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

//Routes
app.use('/api/verify', VerifyRoutes)
app.use('/api/auth', AuthRoute);
app.use('/api/store', authenticateToken, StoreRoutes)
app.use('/api/user',authenticateToken, userRoutes)

//Server
mongoose.connect(mongoURL)
    .then(() => console.log("Database is Connected Succesfully"))
    .catch((err) => console.log(err))

app.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});