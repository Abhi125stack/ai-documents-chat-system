import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, // Don't return password by default
        },
    },
    { timestamps: true }
);

// Check if model exists to prevent re-compilation (Next.js hot reloading)
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
