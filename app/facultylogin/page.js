"use client";

import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation"; 

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push("/");
  }, [router]);

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/FacultyLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error || "Login failed");
      }

      localStorage.setItem('email', email);
      localStorage.setItem('token', res.token);

      toast.success("Successfully logged in", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/FacultyHome");
      }, 1000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center">
          <FaRegUserCircle className='text-6xl text-indigo-500 mb-4' />
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Login to Your Account</h2>
          <p className="text-gray-500 text-sm mb-6">Welcome back, please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Sign In
          </button>

          <div className="flex justify-between mt-4 text-sm text-blue-600">
            <Link href="/newfaculty" className="hover:underline">Create new account</Link>
            <Link href="/forgot" className="hover:underline">Forgot password?</Link>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Page;