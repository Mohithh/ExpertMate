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

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            router.push("/");
        }
    }, [router])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === "name") setName(value);
        else if(name === "email") setEmail(value);
        else if(name === "password") setPassword(value);
    }   

    const submitform = async(e) => {     
        e.preventDefault() 
        setIsSubmitting(true)
    
        const data = {name, email, password}  
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/FacultyNewLogin`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            
            const res = await response.json();
            
            if(!response.ok) {
                throw new Error(res.message || "Registration failed");
            }

            toast.success("Account created successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            setEmail("");
            setName("");
            setPassword("");
            
        } catch (error) {
            toast.error(error.message || "Account already exists", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Image Section with Animation */}
                <div className="hidden md:block md:w-1/2 lg:w-2/5 animate-fade-in">
                    <Image
                        src={Email}
                        alt="Sign Up Illustration"
                        className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
                        placeholder="blur"
                        priority
                    />
                </div>
                
                {/* Form Section with Animations */}
                <div className="w-full md:w-1/2 lg:w-2/5 bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl animate-slide-up">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            <FaRegUserCircle className="text-6xl text-indigo-600" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-gray-800 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                            Create Your Account
                        </h2>
                        <p className="text-gray-600 text-center mt-2">
                            Join our community today
                        </p>
                    </div>

                    <form onSubmit={submitform} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    required
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
                                    placeholder="Enter your name"
                                    value={name}
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    required
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
                                    placeholder="Enter your email"
                                    value={email}
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    required
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:border-indigo-400"
                                    type="password"
                                    name="password"
                                    value={password}
                                    id="password"
                                    placeholder="Create a password"
                                    minLength="6"
                                />
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                                isSubmitting 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : 'Sign Up'}
                        </button>
                        
                        <div className="flex items-center justify-between mt-4">
                            <Link href="/facultylogin" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">
                                Already have an account? Login
                            </Link>
                            <Link href="/forgot" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            
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