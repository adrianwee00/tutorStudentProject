import { user } from "../models/userModel.js";
import { comparePassword } from "../helpers/auth.js";

const test = (req, res) => {
    res.json("Test is working.")
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const userFound = await user.findOne({email});
        if(!user){
            return res.json({
                error:"User is not found"
            })
        }
        const match = await comparePassword(password, userFound.password)
        if(match){
            res.json("passwords matched")
            console.log("password matched")
        }else{
            res.json("password wrong")
            console.log("password is wrong")
        }
        
    } catch (error) {
        console.log(error)
    }
}

export {
    test, 
    loginUser,
}