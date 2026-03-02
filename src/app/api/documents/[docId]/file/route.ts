import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Document from "@/models/Document";
import { getUserIdFromHeader } from "@/lib/auth";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ docId: string }> }
) {
    try {
        await connectDB();
        const userId = getUserIdFromHeader(req);
        const { docId } = await params;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const document = await Document.findOne({ _id: docId, userId });

        if (!document) {
            return NextResponse.json({ message: "Document not found.", success: false }, { status: 404 });
        }

        const db = mongoose.connection.db;
        if (!db) throw new Error("Database not connected");

        const bucket = new GridFSBucket(db, {
            bucketName: "documents",
        });

        // Check if file exists in GridFS
        const files = await bucket.find({ _id: document.fileId }).toArray();
        if (files.length === 0) {
            return NextResponse.json({ message: "File data not found in storage.", success: false }, { status: 404 });
        }

        const downloadStream = bucket.openDownloadStream(document.fileId);

        // Convert the Node.js Readable stream to a Web ReadableStream with proper chunking
        const webStream = new ReadableStream({
            start(controller) {
                downloadStream.on("data", (chunk) => {
                    // Buffer to Uint8Array for the Web Streams API
                    controller.enqueue(new Uint8Array(chunk));
                });
                downloadStream.on("end", () => controller.close());
                downloadStream.on("error", (err) => controller.error(err));
            },
            cancel() {
                downloadStream.destroy();
            },
        });

        return new NextResponse(webStream, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Length": document.size.toString(),
                "Content-Disposition": `inline; filename="${document.name}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });

    } catch (err: any) {
        console.error("Stream file error:", err);
        return NextResponse.json({ 
            message: "Failed to stream document.", 
            error: err.message, 
            success: false 
        }, { status: 500 });
    }
}
