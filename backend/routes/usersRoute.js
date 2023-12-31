import express, { Router } from "express";
import { user } from "../models/userModel.js";
import { test, loginUser, getProfile, userPosting, userPosts, userName, logout } from "../controllers/authController.js";
import { getPersonalPost, deletePost, postEmail, handleCookies } from "../controllers/dashboardControllers.js";
import cors from 'cors';
import { hashPassword, comparePassword } from "../helpers/auth.js";
import { getPassword, appPost } from "../controllers/appPasswordController.js";


const userRouter = express.Router();

userRouter.post('/appPassword/:email', appPost);

userRouter.get('/appPassword/:email', getPassword);

userRouter.get('/profile', getProfile);

userRouter.post('/logout', logout);

userRouter.get('/myDashboard/:email', getPersonalPost);

userRouter.delete('/:id', deletePost)

userRouter.post('/email', postEmail)

userRouter.post('/cookies', handleCookies)

userRouter.get('/getCookie', (req, res) => {
    const decodedEmail = decodeURIComponent(req.cookies.email);
    res.send(decodedEmail);
  });


// get the id of users
userRouter.get('/:email', async (req, res) => {
    try {
        const userDetail = await user.findOne({email: req.params.email});
        return res.json(userDetail._id);
    } catch (error) {
        console.log(error.message);
        res.send({message: error.message});
    }
})

//find all the post from the database except the user own post
userRouter.get("/post/:email", userPosts)

//user inserting name
userRouter.post("/name/:email", userName)

//user posting a post
userRouter.post("/post/:email", userPosting)

//login a user 
userRouter.post("/login", loginUser)

//registering a user
userRouter.post("/", async(req, res) => {
    console.log(req.body.email);
    try {
        if(
            !req.body.email ||
            !req.body.password ||
            !req.body.name
        ){
            return res.status(400).send({
                error: "Send all required fields",
            });
        }
        const email = req.body.email;
        const emailExist = await user.findOne({email});

        if (emailExist){
            console.log("Email is taken");
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(req.body.password)

        const newUser = {
            email: req.body.email,
            password: hashedPassword,
            name : req.body.name,
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