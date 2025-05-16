'use client'
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle, FaArrowRight } from "react-icons/fa";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) router.push("/");
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };  

    const handleSubmit = async (e) => {     
        e.preventDefault();
        
        // Form validation
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all fields", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/FacultyNewLogin`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });
            
            const res = await response.json();
            
            if(response.ok) {
                toast.success("Account created successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                });
                
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });

                setTimeout(() => {
                    router.push("/facultylogin");
                }, 2000);
            } else {
                throw new Error(res.error || "Account creation failed");
            }
        } catch (error) {
            toast.error(error.message || "Account already exists", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Custom animated SVG component
    const AnimatedSignupIllustration = () => (
        <motion.svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full h-auto"
        >
            {/* Background circle */}
            <motion.circle
                cx="200"
                cy="200"
                r="180"
                fill="#E0E7FF"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Person with signup form */}
            <motion.g
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Head */}
                <circle cx="200" cy="120" r="40" fill="#4F46E5" />
                
                {/* Body */}
                <rect x="180" y="160" width="40" height="80" rx="5" fill="#4F46E5" />
                
                {/* Arms */}
                <motion.line
                    x1="160"
                    y1="180"
                    x2="120"
                    y2="160"
                    stroke="#4F46E5"
                    strokeWidth="10"
                    strokeLinecap="round"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.line
                    x1="240"
                    y1="180"
                    x2="280"
                    y2="160"
                    stroke="#4F46E5"
                    strokeWidth="10"
                    strokeLinecap="round"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                
                {/* Signup form */}
                <motion.rect
                    x="120"
                    y="260"
                    width="160"
                    height="120"
                    rx="10"
                    fill="white"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                
                {/* Form fields */}
                <motion.rect
                    x="140"
                    y="280"
                    width="120"
                    height="20"
                    rx="5"
                    fill="#E5E7EB"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                />
                <motion.rect
                    x="140"
                    y="310"
                    width="120"
                    height="20"
                    rx="5"
                    fill="#E5E7EB"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                />
                <motion.rect
                    x="140"
                    y="340"
                    width="60"
                    height="20"
                    rx="5"
                    fill="#4F46E5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                />
                
                {/* Plus sign for signup */}
                <motion.g
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <rect x="280" y="280" width="40" height="40" rx="20" fill="#4F46E5" />
                    <rect x="295" y="290" width="10" height="20" rx="5" fill="white" />
                    <rect x="290" y="295" width="20" height="10" rx="5" fill="white" />
                </motion.g>
            </motion.g>
        </motion.svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
            {/* Background animated elements */}
            <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2 }}
            >
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-200 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-200 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </motion.div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Left side - Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl z-10 border border-gray-100"
                >
                    <motion.div 
                        className="flex flex-col items-center mb-8"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaRegUserCircle className='text-6xl text-indigo-500' />
                        </motion.div>
                        <h2 className='mt-4 font-bold text-3xl text-gray-800'>Create Account</h2>
                        <p className="text-gray-500 mt-2">Join us to get started</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                                <FiUser className="mr-2" /> Name
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    onChange={handleChange}
                                    onFocus={() => setActiveField('name')}
                                    onBlur={() => setActiveField(null)}
                                    className={`w-full px-4 py-3 pl-10 border ${activeField === 'name' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200 bg-white text-gray-800`}
                                    placeholder='Your name'
                                    value={formData.name}
                                    type="text"
                                    name="name"
                                />
                                {activeField === 'name' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-2 right-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                                    >
                                        Required
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                                <FiMail className="mr-2" /> Email
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    onChange={handleChange}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField(null)}
                                    className={`w-full px-4 py-3 pl-10 border ${activeField === 'email' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200 bg-white text-gray-800`}
                                    placeholder='your@email.com'
                                    value={formData.email}
                                    type="email"
                                    name="email"
                                />
                                {activeField === 'email' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-2 right-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                                    >
                                        Required
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className='block text-sm font-medium text-gray-700 mb-2 flex items-center'>
                                <FiLock className="mr-2" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    onChange={handleChange}
                                    onFocus={() => setActiveField('password')}
                                    onBlur={() => setActiveField(null)}
                                    className={`w-full px-4 py-3 pl-10 border ${activeField === 'password' ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200 bg-white text-gray-800`}
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder='••••••••'
                                    minLength="6"
                                />
                                {activeField === 'password' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-2 right-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                                    >
                                        Min. 6 chars
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition duration-200 shadow-md relative overflow-hidden mt-6"
                        >
                            {isLoading ? (
                                <motion.span
                                    className="flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="inline-block mr-2"
                                    >
                                        <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </motion.span>
                                    Creating Account...
                                </motion.span>
                            ) : (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center"
                                >
                                    Sign Up <FaArrowRight className="ml-2" />
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-between mt-4 text-sm"
                        >
                            <Link href="/facultylogin" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center">
                                Already have an account? Login
                            </Link>
                            <Link href="/forgot" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                                Forgot password?
                            </Link>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Right side - Animation */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hidden lg:flex flex-col items-center justify-center w-full max-w-lg"
                >
                    <div className="relative">
                        {/* Custom SVG Animation */}
                        <AnimatedSignupIllustration />
                        
                        {/* Floating elements */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-indigo-200 opacity-30 blur-xl"
                        ></motion.div>
                        <motion.div
                            animate={{
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-200 opacity-30 blur-xl"
                        ></motion.div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-8"
                    >
                        <h3 className="text-2xl font-semibold text-gray-700">Welcome Aboard!</h3>
                        <p className="text-gray-500 mt-3">Join our community to access exclusive features and resources</p>
                    </motion.div>
                </motion.div>
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
        </div>
    );
};

export default Page;