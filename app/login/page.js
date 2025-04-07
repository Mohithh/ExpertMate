"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Email from "@/app/assets/email.svg"; // make sure this file exists
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_LOGIN_URL || '/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        localStorage.setItem("email", email);
        localStorage.setItem("token", res.token);

        toast.success("Welcome back!", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => router.push("/"), 1000);
      } else {
        toast.error(res.error || "Login failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-indigo-700 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/forgot-password" className="hover:underline text-indigo-600">
              Forgot password?
            </Link>
            <p className="mt-4">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
                Create New Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center p-8">
          <img
                    src={Email.src}
                    alt="Signup Illustration"
                    className="w-full h-auto object-contain rounded-lg"
                  />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
