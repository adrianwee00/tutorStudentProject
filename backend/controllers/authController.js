import { user } from "../models/userModel.js";
import { comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

const test = (req, res) => {
    res.json("Test is working.")
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(process.env.JWT_SECRET)
        
        const userFound = await user.findOne({email});
        if(!user){
            return res.json({
                error:"User is not found"
            })
        }
        const match = await comparePassword(password, userFound.password)
        if(match){
            const token = jwt.sign({email: userFound.email, id: userFound._id}, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.cookie('token', token,  {httpOnly:true, secure:true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000})
            res.json(userFound);
            console.log("password matched")
        }else{
            res.json({
                error: "Password is wrong"
            })
            console.log("password is wrong")
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        res.json(user)
       })
     } else{
            console.log("No token")
        }
}


export {
    test, 
    loginUser,
    getProfile,
}