import { user } from "../models/userModel.js";

const appPost = async (req, res) => {
    try {
        const updatedUser = await user.findOneAndUpdate(
          { email: req.params.email },
          { appPassword: req.body.appPassword },
          { new: true } // Return the modified document
        );

        if (!updatedUser) {
          // User not found
          res.send({ success: false, message: 'User not found' });
        }
    
        res.send({ success: true, user: updatedUser });
      } catch (error) {
        console.error('Error updating user appPassword:', error);
        res.send({ success: false, message: 'Error updating user appPassword' });
      }
} 

const getPassword = async (req, res) => {
    try {
        const userFound = await user.findOne({ email: req.params.email });
    
        if (!userFound) {
          // User not found
          res.send({ success: false, message: 'User not found' });
        }
    
        res.send({ success: true, appPassword: userFound.appPassword });
      } catch (error) {
        console.error('Error finding user appPassword:', error);
        res.send({ success: false, message: 'Error finding user appPassword' });
      }
}

export {getPassword, appPost}