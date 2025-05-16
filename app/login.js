import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');

export const POST = async (req, res) => {
    try {
        const payload = await req.json();
        const fetchedUser = await User.findOne({ "email": payload.email });

        if (!fetchedUser) {
            return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const decryptedBytes = CryptoJS.AES.decrypt(fetchedUser.password, 'mohit');
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (fetchedUser.email === payload.email && payload.password === decryptedPassword) {
            const authToken = jwt.sign({ success: true, email: payload.email, name: fetchedUser.name }, 'jwttokenn', { expiresIn: '1d' });
            return new Response(JSON.stringify({ success: true, token: authToken }));
        }

        return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
