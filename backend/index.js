import express, { response } from "express";
import { port, mongodbURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { user } from "./models/userModel.js";
import { userRouter } from "./routes/usersRoute.js";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Middleware for handling cors policy 
//option 1: allow custom origins
app.use(cors({
    credentials: true,
    origin:"http://127.0.0.1:5173",
}));

app.use('/user', userRouter);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("App connected to mongodb database.");
        app.listen(port, () => {
            console.log("App is listening to port 5555.");
        })
    })
    .catch((error) => {
        console.log(error);
    })
