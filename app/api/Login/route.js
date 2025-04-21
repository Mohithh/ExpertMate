import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');


 
export const POST  = async(req,res)=>{
    const body = await req.json()
    const user = await User.findOne({"email":body.email})

    if(user){

        const bytes = CryptoJS.AES.decrypt(user.password, 'mohit');
        const userpasswordd = bytes.toString(CryptoJS.enc.Utf8);


        if(user.email == body.email && body.password == userpasswordd){
            var token = jwt.sign({success:true,email:body.email ,name:user.name }, 'jwttokenn', { expiresIn: '1d' } );


            return new Response(JSON.stringify({success:true,token}))
        }
        else{
            return new Response(JSON.stringify({success:false ,error:"invalid information"}),
            {status:400,headers:{"context-type":"application/json"}})
        }


    }

    

    return new Response(JSON.stringify({success:false ,error:"invalid info"}),
    {status:400,headers:{"context-type":"application/json"}})
} 