import express from "express";
import { user } from "../models/userModel.js";

const userRouter = express.Router();

//registering a user
userRouter.post("/", async(req, res) => {
    console.log(req.body.email);
    try {
        if(
            !req.body.email ||
            !req.body.password
        ){
            return res.status(400).send({
                message: "Send all required fields",
            });
        }
        const newUser = {
            email: req.body.email,
            password: req.body.password,
        };
        const userId = await user.create(newUser);

        return res.send(userId);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//getting a userId details(a function just for learning)
userRouter.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const userId = await user.findById(id);
        return res.json(userId);
    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})

// updating a user password
userRouter.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await user.findByIdAndUpdate(id, req.body);
        if (!result){
            return res.send({message: "user not found"});
        }else{
            return res.send({message: "Password updated successfully"})
        }
    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})

//deleting a user
userRouter.delete('/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const userId = await user.findByIdAndDelete(id);
        if(!userId){
            return res.send({message:"User not found"});
        }else{
            return res.send({message: "User deleted successfully"})
        }
    } catch (error) {
        console.log(error.message)
        res.send({message:error.message});
    }
})

export {userRouter};