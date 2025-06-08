"use client"
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


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

            //  const response = await fetch("http://localhost:3000/api/signin", {
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

            // setemail(""); 
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

        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const text = `Your OTP is ${otp}. It is valid for 5 minutesssss.`; // use inline here
        setcotp(otp)
        const subject = "verification Mail";


        try {
            const res = await fetch("/api/varificationMail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: finalmail, text: text, subject }), // pass email and generated text
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

        // console.log("cotp", cotp)
        // console.log("userotp", userotp)
        e.preventDefault();
        // console.log("submitotp")

        if (userotp == cotp) {

            // console.log("otp matched")
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

        <div>
            {first && (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4">
                    <form className="bg-white border border-blue-200 shadow-lg rounded-xl p-6 w-full max-w-sm space-y-4 animate-fade-in">

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                required
                                onChange={finalmaill}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Send Mail Button */}
                        <button
                            onClick={sendingmail}
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200"
                        >
                            {sendmail}
                        </button>

                        {/* Message */}
                        {message && <p className="text-sm text-red-500 font-medium">{message}</p>}
                        {/* {cotp && <p className="text-xs text-gray-400">OTP sent: {cotp}</p>} */}

                        {/* OTP Box */}
                        {otpbox && (
                            <div className="pt-2 space-y-3 border-t border-gray-200">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Enter OTP</label>
                                    <input
                                        required
                                        onChange={valueotp}
                                        type="number"
                                        placeholder="6-digit OTP"
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={submitotp}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Display entered email below form */}
                    <p className="absolute bottom-6 text-xs text-gray-500">{finalmail}</p>
                </div>
            )}


            {second && <div className=' '>


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





                <div className='w-64 md:w-1/4  m-auto mb-10 items-center text-center mt-20  '>

                    <FaRegUserCircle className='text-5xl items-center m-auto ' />


                    <h2 className='mt-5 font-bold text-2xl'>Sign up Your Account  </h2>


                    <form onSubmit={submitform} action="" method='POST' >

                        <div className='m-2 '>
                            <label className='' htmlFor="name">Name</label>
                            <input required onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' placeholder='Enter name ' value={name} type="name" name="name" id="name" />

                        </div>
                        <div className='m-2 '>
                            <label className='' htmlFor="email"></label>
                            <input readOnly required onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' placeholder='Email id' value={finalmail} type="email" name="email" id="email" />

                        </div>


                        <div className='m-2 '>
                            <label htmlFor="password">Password</label>
                            <input required onChange={onchangeinput} className='mt-2 w-full border border-gray-400 rounded p-1  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="password" name="password" value={password} id="password" placeholder='Password' />
                        </div>

                        <button className=" w-full m-auto items-center mt-5 mx-2 text-white bg-pink-500 border-0 py-3  focus:outline-none hover:bg-indigo-600 rounded">Sign in </button>
                        {/* <Link href="/login"> <p className='mx-10 mt-5 text-blue-500  font-extralight '> Login</p></Link>
<Link href="forgot"> <p className='mx-10 mt-5 text-blue-500 font-extralight'>forgot password</p></Link> */}

                        {/* <div className='flex '> */}
                        <Link href="/facultylogin"> <p className='mx-10 mt-5 text-blue-500  font-extralight '> Login</p></Link>
                        <Link href="forgot"> <p className='mx-10 mt-5 text-blue-500 font-extralight'>forgot password</p></Link>
                        {/* </div> */}

                    </form>
                </div>

            </div>}



        </div>
    )
}

export default page
