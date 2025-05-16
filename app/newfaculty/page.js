"use client"
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 
import Email from "@/app/assets/login.png";

const page = () => {
    const router = useRouter();
  
   useEffect(() => {
      const token = localStorage.getItem('token')
  
      if(token){
        router.push("/");
      }
      
    }, [router])
 
  
  

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const onchangeinput = (e)=>{
    if(e.target.name=="name"){
      setname(e.target.value)
    }
     else if(e.target.name=="email"){
      setemail(e.target.value)
    }
   else if(e.target.name=="password"){
      setpassword(e.target.value)
    } 
  }   

  const submitform =async(e)=>{     
    e.preventDefault() 
 
    const data = {name,email,password}  
  
    try {
      
    //  const response = await fetch("http://localhost:3000/api/signin", {
     const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/FacultyNewLogin`, {
      method: "POST",
      headers:{"context-type":"application/json"},
      body:JSON.stringify(data)
    });
    const res = await response.json()
    toast.info("Account has been created", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        
    setemail("");
    setname("")
    setpassword("")
      
    } catch (error) {
      toast.error("account Already exist", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }




  }
  return (
    <div className=' '>
       <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            {/* Add these styles for animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slideUp 0.6s ease-out forwards;
                }
                .bg-gradient-to-r {
                    background-size: 200% auto;
                    transition: background-position 0.5s ease;
                }
                .bg-gradient-to-r:hover {
                    background-position: right center;
                }
            `}</style>
        </div>
    )
}

export default Page
