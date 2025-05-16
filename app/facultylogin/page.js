'use client';
import React, { useEffect, useState } from 'react';
import { FaRegUserCircle, FaMoon, FaSun } from "react-icons/fa";
import Link from 'next/link';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(initialMode);
    
    const token = localStorage.getItem('token');
    if (token) router.push("/");
  }, [router]);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
      return;
    }

    setIsLoading(true);
    const data = { email, password };

    try {
      const response = await fetch(`${process.env.LOCAL_URL}/api/FacultyLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();

      if (res.success) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', res.token);

        toast.success("Successfully logged in", {
          position: "top-center",
          autoClose: 3000,
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });

        setTimeout(() => {
          router.push("/FacultyHome");
        }, 1000);
      } else {
        toast.error(res.error, {
          position: "top-center",
          autoClose: 3000,
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An error occurred during login", {
        position: "top-center",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const AnimatedLoginIllustration = () => (
    <motion.svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="hidden lg:block"
    >
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill={darkMode ? "#312E81" : "#E0E7FF"}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.g
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="200" cy="120" r="40" fill={darkMode ? "#818CF8" : "#4F46E5"} />
        <rect x="180" y="160" width="40" height="80" rx="5" fill={darkMode ? "#818CF8" : "#4F46E5"} />
        <motion.line
          x1="160"
          y1="180"
          x2="120"
          y2="160"
          stroke={darkMode ? "#818CF8" : "#4F46E5"}
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
          stroke={darkMode ? "#818CF8" : "#4F46E5"}
          strokeWidth="10"
          strokeLinecap="round"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </motion.g>
      
      <motion.rect
        x="100"
        y="260"
        width="200"
        height="120"
        rx="10"
        fill={darkMode ? "#1E1B4B" : "white"}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="120"
        y="280"
        width="160"
        height="20"
        rx="5"
        fill={darkMode ? "#4338CA" : "#E5E7EB"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.rect
        x="120"
        y="310"
        width="160"
        height="20"
        rx="5"
        fill={darkMode ? "#4338CA" : "#E5E7EB"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.rect
        x="120"
        y="340"
        width="80"
        height="20"
        rx="5"
        fill={darkMode ? "#818CF8" : "#4F46E5"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      />
    </motion.svg>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 overflow-hidden">
      {/* Dark mode toggle */}
      {/* <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-yellow-300 shadow-lg hover:shadow-xl transition-all z-50"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
      </button> */}

      {/* Background animated elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-indigo-300 dark:bg-indigo-800 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-300 dark:bg-blue-800 blur-3xl"></div>
      </motion.div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl z-10 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col items-center mb-8">
            <FaRegUserCircle className="text-5xl text-indigo-600 dark:text-indigo-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Faculty Login</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all ${
                    activeField === 'email' 
                      ? 'border-indigo-500 dark:border-indigo-500' 
                      : 'border-gray-200 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 dark:text-white`}
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 focus:border-indigo-500 dark:focus:border-indigo-500 transition-all ${
                    activeField === 'password' 
                      ? 'border-indigo-500 dark:border-indigo-500' 
                      : 'border-gray-200 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 dark:text-white`}
                  placeholder="••••••••"
                  required
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-700 dark:to-indigo-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/newfaculty" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              Register here
            </Link>
          </div>
        </motion.div>

        {/* Right side - Animation */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <AnimatedLoginIllustration />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Welcome Back!</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Access your account to manage your courses and students</p>
          </motion.div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover={false}
        theme={darkMode ? "dark" : "light"}
        transition={Bounce}
      />
    </div>
  );
};

export default Page;