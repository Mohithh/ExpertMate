"use client";
import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [email, setemail] = useState(""); 
  const [password, setpassword] = useState("");

  useEffect(() => {
    // Check authentication more securely
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Add token validation API call here if needed
          router.push("/FacultyHome");
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }
      }
    };
    checkAuth();
  }, [router]);

  const submitbottton = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN_URL || '/api/FacultyLogin'}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // For httpOnly cookies if using them
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token more securely (consider httpOnly cookies instead)
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        
        toast.success("Successfully logged in", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

      setTimeout(() => {
        router.push("/FacultyHome");
      }, 1000);
    } else {
      toast.error(res.error, {
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
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Faculty Login</h2>
          <p className="text-gray-500 text-sm mb-6">Enter your credentials to access the faculty portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="faculty@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              minLength="8"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg font-semibold transition duration-200 shadow-md ${
              isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="flex justify-between mt-4 text-sm text-blue-600">
            <Link href="/newfaculty" className="hover:underline hover:text-blue-800">
              Register new faculty
            </Link>
            <Link href="/forgot-password" className="hover:underline hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {/* Animation styles */}
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
  );
};

export default page;
