import mongoose, { Document } from "mongoose";
import { DocumentStatus } from "@/types";

export interface IDocument extends Document {
    name: string;
    size: number;
    fileId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    pages?: number;
    status: DocumentStatus;
    createdAt: Date;
    updatedAt: Date;
}


const DocumentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Filename is required"],
        },
        size: {
            type: Number,
            required: true,
        },
        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "documents.files", // Correct reference to our GridFS bucket files
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        pages: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["processing", "processed", "error"],
            default: "processed",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);
