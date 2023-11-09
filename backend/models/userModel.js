import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type:String,
            unique:true,
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