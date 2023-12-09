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

const userPosting = async(req, res) => {
    try {
        const {qualification, subjects, selfAppeal} = req.body;
        console.log(qualification);
        const newData = {
            Qualification: qualification,
            Subjects: subjects,
            SelfAppeal: selfAppeal,
        }

        /*
        const msg = await user.findByIdAndUpdate(req.params.id,
            { $push: { personalPost: newData } },
            { new: true })
        */

        const msg = await user.findOneAndUpdate(
            { email: req.params.email },
            { $push: { personalPost: newData } },
            { new: true }
            );
        res.send(msg)
    } catch(err){
        console.log(err);
        res.send(err);
    }
}

const userName = async(req, res) => {
    try{
        const {name} = req.body;
        const filter = {email: req.params.email}
        const option = {new: true}
        const update = {name: name}

        const msg = await user.findOneAndUpdate(filter, update, option)
        res.send(msg)
    }
    catch(err){
        console.log(err);
    }
}

const userPosts = async(req, res) => {
    try{
        /*
        let dictionary = {
            email: "",
            qualification : "",
            subject: "",
        };
        */ //if dictionary is created outside, since dictionary is an object, pushing this dictionary will push the same 
           //object over and over again resulting in having same dictionaries in the whole list 
        const postDetails = [];
        const allPosts = await user.find({});
        const newPosts = allPosts.filter(post => post.email !== req.params.email)
        const finalPosts = [];
        newPosts.forEach(post => {
            if (post.personalPost.length !== 0) {
                finalPosts.push(post);
            }
        });
        finalPosts.forEach(post => {
            let name = post.name
            let email = post.email;
            console.log(email)
            post.personalPost.forEach(element => {
                let dictionary = {
                    id : "",
                    name: "",
                    email: "",
                    qualification : "",
                    subject: "",
                    selfAppeal: "",
                }; //This will create a new dictionary for each iteration 
                dictionary.name = name;
                dictionary.id = element._id;
                dictionary.email = email;
                dictionary.qualification = element.Qualification;
                dictionary.subject = element.Subjects;
                dictionary.selfAppeal = element.SelfAppeal;
                console.log(dictionary)
                console.log(element.Qualification)
                postDetails.push(dictionary);
                console.log(postDetails);
            })
        });

        res.send(postDetails)
    }
    catch(err){
        console.log(err)
    }
}


export {
    test, 
    loginUser,
    getProfile,
    userPosting,
    userPosts,
    userName,
}