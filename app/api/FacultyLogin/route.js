import testConnect from "@/testConnect/page";
import User from "@/model/facultyLogin/page";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

export const POST = testConnect(async (req) => {
    try {
        const body = await req.json();
        
        if (!body.email || !body.password) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "Email and password are required" 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await User.findOne({ email: body.email });

        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "User not found" 
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (body.password !== userPassword) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "Invalid password" 
            }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        const token = jwt.sign(
            { success: true, email: body.email, name: user.name },
            process.env.JWT_SECRET_,
            { expiresIn: '1d' }
        );

        return new Response(JSON.stringify({ success: true, token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: "Internal server error" 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});