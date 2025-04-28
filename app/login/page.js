"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("email", email);
          localStorage.setItem("token", res.token);
        }

        alert("Welcome back!"); // Replaced toast with alert
        setTimeout(() => router.push("/"), 1000);
      } else {
        alert(res.error || "Login failed"); // Replaced toast with alert
      }
    } catch (error) {
      alert("Something went wrong!"); // Replaced toast with alert
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
            <Link href="/" className="text-sm text-indigo-600 hover:underline">
              <button

                type="submit"
                className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
              >
                Sign In
              </button>
            </Link>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/forgot-password" className="hover:underline text-indigo-600">
              Forgot password?
            </Link>
            <p className="mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
                Create New Account
              </Link>
            </p>

            <p className="mt-4">
              <Link href="/facultylogin" className="text-indigo-600 font-medium hover:underline">
                Faculty Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center p-8">
          {/* Replace with your actual image import */}
          {/* <Image
            src="/login-illustration.png"
            alt="Login Illustration"
            width={500}
            height={500}
            className="w-full h-auto object-contain rounded-lg"
            priority
          /> */}
          <div className="text-white text-center">
            <p className="text-2xl font-bold mb-4">Welcome to Our Platform</p>
            <p className="text-lg">Your journey starts here</p>
          </div>
        </div>
      </div>
    </div>
  );
}