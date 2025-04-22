import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');

export const POST = testConnect(async (req) => {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });

<<<<<<< HEAD
    if (user) {
        const bytes = CryptoJS.AES.decrypt(user.password,process.env.PASSWORD_SECRET_);

       

        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (body.password === userPassword) {
            const token = jwt.sign(
                { success: true, email: body.email, name: user.name },
                process.env.JWT_SECRET_,
                { expiresIn: '1d' }
            );

            return new Response(JSON.stringify({ success: true, token }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: "Invalid password" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
=======
 
export const POST  = async(req,res)=>{
    const body = await req.json()
    const user = await User.findOne({"email":body.email})

    if(user){

        const bytes = CryptoJS.AES.decrypt(user.password, 'mohit');
        const userpasswordd = bytes.toString(CryptoJS.enc.Utf8);


        if(user.email == body.email && body.password == userpasswordd){
            var token = jwt.sign({success:true,email:body.email ,name:user.name }, 'jwttokenn', { expiresIn: '1d' } );


            return new Response(JSON.stringify({success:true,token}))
>>>>>>> 8a0bc6e9f7810a64536b0335014b221e854f03da
        }
    }

    // If user not found
    return new Response(JSON.stringify({ success: false, error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
});
