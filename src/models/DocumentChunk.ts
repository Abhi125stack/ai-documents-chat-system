import mongoose, { Document } from "mongoose";

export interface IDocumentChunk extends Document {
    documentId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    text: string;
    chunkIndex: number;
    embedding?: number[];
    createdAt: Date;
    updatedAt: Date;
}

const DocumentChunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Document",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: true,
        },
        chunkIndex: {
            type: Number,
            required: true,
        },
        embedding: {
            type: [Number],
            default: undefined,
        },
    },
    { timestamps: true }
);

const DocumentChunk =
    mongoose.models.DocumentChunk ||
    mongoose.model("DocumentChunk", DocumentChunkSchema, "documentchunks");

export default DocumentChunk;

