import { user } from "../models/userModel.js";

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

export {getPersonalPost, deletePost}