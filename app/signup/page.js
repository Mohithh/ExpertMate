"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

// ✅ Import your signup illustration image
// import SignupIllustration from "@/public/signup-illustration.png"; // Make sure you have this image inside /public folder

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { name, email, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/LoginNew`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(res.error || "Account already exists", {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-emerald-600 mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign up to access all features.
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="John Doe"
                required
                minLength={3}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 text-white rounded-lg font-semibold transition duration-200 shadow-md ${
                isLoading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-emerald-400 to-green-500 p-8">
          {/* <Image
            src={SignupIllustration}
            alt="Signup Illustration"
            width={500}
            height={500}
            className="w-full h-auto object-contain rounded-lg"
            priority
          /> */}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
