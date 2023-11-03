import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type:String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },  
    },
    {
        timestamps: true,
    }
);

export const user = mongoose.model("User", userSchema);