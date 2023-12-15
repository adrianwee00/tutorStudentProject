import { user } from "../models/userModel.js";
import nodemailer from 'nodemailer';

const getPersonalPost = async (req, res) => {
    try{
        const userFound = await user.findOne({email: req.params.email});
        if (userFound){
            res.send(userFound)
        }
        else{
            res.send({message:"No user found"})
        }
    }
    catch(err){
        res.send(err)
    }
}

const deletePost = async (req, res) => {
    try{
        const postDeleted = await user.findOneAndUpdate(
                                       { 'personalPost._id': req.params.id },
                                       { $pull: { personalPost: { _id: req.params.id } } },
                                       { new: true })
        res.send(postDeleted)
    }catch(err){
        console.log(err)
    }
}

const postEmail = async(req, res) => {
    try {
        const senderEmail = req.body.senderEmail;
        const receiverEmail = req.body.receiverEmail;
        const userText = req.body.text;
        const sub = req.body.sub;
        const appPassword = req.body.appPassword;

        console.log(sub)

        // Function to send an email using Gmail
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', // Explicitly set the host
            port: 587, // Explicitly set the port for Gmail SMTP
            secure: true, // Use TLS for secure connection
            auth: {
            user: senderEmail, // your Gmail email address
            pass: appPassword,   // the app password you generated
            },
        });

        // Define the email options
        const mailOptions = {
            from: senderEmail, // sender's email address
            to: receiverEmail,                           // recipient's email address
            subject: sub,                      // email subject
            text: userText                 // email body
        };
        // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.send("Email sent successfully")
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(400).send({
            error: "Something Wrong",
        });
    }
}

const handleCookies = async (req, res) => {
    try{
        const email = req.body.email
        console.log(email)
        res.cookie('email', encodeURIComponent(email),  {httpOnly: false ,secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000})
        res.send("cookies sent")
    }
    catch(err){
        console.log(err)
    }
}

export {getPersonalPost, deletePost, postEmail, handleCookies}