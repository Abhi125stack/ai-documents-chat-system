import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
    role: "user" | "assistant" | "system";
    content: string;
    createdAt: Date;
}

export interface IChat extends Document {
    userId: mongoose.Types.ObjectId;
    documentId?: mongoose.Types.ObjectId;
    documentIds?: mongoose.Types.ObjectId[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
    role: {
        type: String,
        required: true,
        enum: ["user", "assistant", "system"],
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ChatSchema = new Schema<IChat>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        documentId: {
            type: Schema.Types.ObjectId,
            ref: "Document",
            required: false, // Optional for multi-doc chats
        },
        documentIds: [{
            type: Schema.Types.ObjectId,
            ref: "Document",
        }],
        messages: [MessageSchema],
    },
    { timestamps: true }
);

// Index for faster lookups
ChatSchema.index({ userId: 1, documentId: 1 });
ChatSchema.index({ userId: 1, documentIds: 1 });

export default mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
