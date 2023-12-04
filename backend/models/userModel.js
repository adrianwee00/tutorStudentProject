import mongoose from "mongoose";

const subSchema = mongoose.Schema(
    {
        Qualification: String,
        Subjects: String,
        SelfAppeal: String,
    }
)

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
        personalPost: [subSchema],
    },
    {
        timestamps: true,
    }
);


export const user = mongoose.model("User", userSchema);