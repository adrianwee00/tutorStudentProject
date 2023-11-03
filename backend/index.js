import express, { response } from "express";
import { port, mongodbURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { user } from "./models/userModel.js";
import { userRouter } from "./routes/usersRoute.js";
import cors from 'cors';


const app = express();

app.use(express.json());

// Middleware for handling cors policy 
//option 1: allow custom origins
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const userIds = await user.find({});
        return res.json(userIds);
    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})

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
