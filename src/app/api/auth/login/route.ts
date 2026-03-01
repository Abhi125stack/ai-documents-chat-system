import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // 1. Check for missing credentials
        if (!email || !password) {
            return NextResponse.json(
                { message: "Please provide email and password.", success: false },
                { status: 400 }
            );
        }

        // 2. Find user by email (include password field for comparison)
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        // 3. User not found, but we keep the error generic for security
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials.", success: false },
                { status: 401 }
            );
        }

        // 4. Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials.", success: false },
                { status: 401 }
            );
        }

        // 5. Generate token if login successful
        const token = generateToken(user._id.toString());

        // 6. Return user info and token
        return NextResponse.json(
            {
                message: "Login successful!",
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.error("Login Error:", err);
        return NextResponse.json(
            { message: "Login failed.", error: err.message, success: false },
            { status: 500 }
        );
    }
}
