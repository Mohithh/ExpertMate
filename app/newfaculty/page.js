"use client"
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Logo from "@/app/assets/hello_logo.png";


const page = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            router.push("/");
        }
    }, [])

    const [finalmail, setfinalmail] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState(finalmail)
    const [password, setpassword] = useState("")
    const [first, setfirst] = useState(true)
    const [second, setsecond] = useState(false)
    const [sendmail, setsendmail] = useState("Send mail")
    const [message, setMessage] = useState("");
    const [cotp, setcotp] = useState("")
    const [otpbox, setotpbox] = useState(false)
    const [userotp, setuserotp] = useState("")

    const onchangeinput = (e) => {
        if (e.target.name == "name") {
            setname(e.target.value)
        }
        else if (e.target.name == "email") {
            setemail(e.target.value)
        }
        else if (e.target.name == "password") {
            setpassword(e.target.value)
        }
    }

    const submitform = async (e) => {
        e.preventDefault()
        const data = { name, finalmail, password }

        try {
            const response = await fetch(`${process.env.LOCAL_URL}/api/FacultyNewLogin`, {
                method: "POST",
                headers: { "context-type": "application/json" },
                body: JSON.stringify(data)
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

            setfinalmail("")
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

    const finalmaill = async (e) => {
        setfinalmail(e.target.value)
    }

    const sendingmail = async (e) => {
        e.preventDefault();
        setMessage("Sending...");

        const otp = Math.floor(100000 + Math.random() * 900000);
        const text = `Your OTP is ${otp}. It is valid for 5 minutesssss.`;
        setcotp(otp)
        const subject = "verification Mail";

        try {
            const res = await fetch("/api/varificationMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: finalmail, text: text, subject }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage(data.message);
                setotpbox(true)
                setsendmail("Resend mail")
            } else {
                setMessage(data.error || "Failed to send email");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    }

    const submitotp = async (e) => {
        e.preventDefault();
        if (userotp == cotp) {
            setfirst(false)
            setsecond(true)
            setotpbox(false)
            toast.success("OTP verified", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error("Invalid OTP", {
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
    const valueotp = (e) => {
        setuserotp(e.target.value)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Animated Background SVG */}
            <div className="fixed inset-0 overflow-hidden z-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <path 
                        fill="url(#gradient)" 
                        d="M0,0V900H1440V0ZM1440,517.32C1316.67,550.66 1200,566.66 1080,565.32C960,564 840,545.32 720,509.32C600,473.32 480,420 360,349.32C240,278.66 120,190.66 0,85.32L0,517.32Z"
                        className="animate-float"
                    />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {first && (
                    <div className="min-h-screen flex items-center justify-center px-4">
                        <form className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 animate-fade-in-up border border-gray-100">
                            {/* Logo */}
                            <div className="text-center">
                                <div className="flex justify-center">
                                    <Image 
                                        src={Logo} 
                                        alt="Company Logo" 
                                        width={120} 
                                        height={120} 
                                        className="object-contain"
                                    />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mt-4">Law Firm Portal</h1>
                                <p className="text-gray-600 mt-2">Attorney secure login</p>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Attorney Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        required
                                        onChange={finalmaill}
                                        type="email"
                                        id="email"
                                        placeholder="lawyer@firm.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-10"
                                    />
                                    <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Send Mail Button */}
                            <button
                                onClick={sendingmail}
                                type="button"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                                {sendmail}
                            </button>

                            {/* Message */}
                            {message && <p className={`text-sm font-medium ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}

                            {/* OTP Box */}
                            {otpbox && (
                                <div className="pt-4 space-y-4 border-t border-gray-200 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                        <div className="relative">
                                            <input
                                                required
                                                onChange={valueotp}
                                                type="number"
                                                placeholder="Enter 6-digit OTP"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-10"
                                            />
                                            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={submitotp}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {second && (
                    <div className="min-h-screen flex items-center justify-center px-4 py-12">
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

                        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md animate-fade-in-up">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <Image 
                                        src={Logo} 
                                        alt="Company Logo" 
                                        width={100} 
                                        height={100} 
                                        className="object-contain"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Attorney Registration</h2>
                                <p className="text-gray-600 mt-2">Complete your profile</p>
                            </div>

                            <form onSubmit={submitform} className="mt-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <input 
                                            required 
                                            onChange={onchangeinput} 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-10" 
                                            placeholder="John Doe" 
                                            value={name} 
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <input 
                                            readOnly 
                                            required 
                                            onChange={onchangeinput} 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-10 bg-gray-50" 
                                            placeholder="lawyer@firm.com" 
                                            value={finalmail} 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input 
                                            required 
                                            onChange={onchangeinput} 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pl-10" 
                                            type="password" 
                                            name="password" 
                                            value={password} 
                                            id="password" 
                                            placeholder="••••••••" 
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                    </svg>
                                    Complete Registration
                                </button>

                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <Link href="/facultylogin">
                                        <a className="text-sm text-blue-600 hover:text-blue-800 font-medium transition">Already registered? Login</a>
                                    </Link>
                                    <Link href="forgot">
                                        <a className="text-sm text-blue-600 hover:text-blue-800 font-medium transition">Forgot password?</a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                @keyframes fadeInUp {
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
                    animation: fadeIn 0.4s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}

export default page