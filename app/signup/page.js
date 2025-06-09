
"use client";
import Logo from "@/app/assets/hello_logo.png";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();

  const [first, setfirst] = useState(true);
  const [second, setsecond] = useState(false);
  const [finalmail, setfinalmail] = useState("");
  const [sendmail, setsendmail] = useState("Send Verification");
  const [message, setMessage] = useState("");
  const [cotp, setcotp] = useState("");
  const [otpbox, setotpbox] = useState(false);
  const [userotp, setuserotp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = { name, email: finalmail, password };

    try {
      setIsAnimating(true);
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
        setPassword("");
        setIsAnimating(false);

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
        setIsAnimating(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      setIsAnimating(false);
    }
  };

  const finalmaill = (e) => {
    setfinalmail(e.target.value);
  };

  const sendingmail = async (e) => {
    e.preventDefault();
    setMessage("Sending verification email...");

    const otp = Math.floor(100000 + Math.random() * 900000);
    const text = `Your SettlesMarSolution verification code is ${otp}. Valid for 5 minutes.`;
    setcotp(otp);
    const subject = "SettlesMarSolution Account Verification";

    try {
      const res = await fetch("/api/varificationMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: finalmail, text: text, subject }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Verification email sent successfully!");
        setotpbox(true);
        setsendmail("Resend Verification");
      } else {
        setMessage(data.error || "Failed to send verification email");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const submitotp = (e) => {
    e.preventDefault();
    
    if (userotp == cotp) {
      setfirst(false);
      setsecond(true);
      setotpbox(false);
      toast.success("OTP verified successfully", {
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
      toast.error("Invalid verification code", {
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
  };

  const valueotp = (e) => {
    setuserotp(e.target.value);
  };

  // Custom SVG Components
  const LegalDocumentIllustration = () => (
    <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="300" height="200" rx="10" fill="#EFF6FF" />
      <rect x="70" y="80" width="260" height="30" rx="5" fill="#1E40AF" />
      <rect x="70" y="130" width="200" height="15" rx="3" fill="#BFDBFE" />
      <rect x="70" y="155" width="220" height="15" rx="3" fill="#BFDBFE" />
      <rect x="70" y="180" width="180" height="15" rx="3" fill="#BFDBFE" />
      <rect x="70" y="205" width="240" height="15" rx="3" fill="#BFDBFE" />
      <path d="M80 95H120" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 105H140" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M290 95H250" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <circle cx="320" cy="95" r="10" fill="#3B82F6" />
      <path d="M320 90V100M315 95H325" stroke="white" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <AnimatePresence mode="wait">
        {first && (
          <motion.div
            key="verification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center px-4 py-12"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-md"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-4">
                  <Image 
                    src={Logo} 
                    alt="SettlesMarSolution Logo" 
                    width={128} 
                    height={128} 
                    className="object-contain"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">SettlesMarSolution</h1>
                <p className="text-gray-600 mt-2">Legal Excellence • Trusted Counsel</p>
              </motion.div>
              
              <motion.form
                variants={itemVariants}
                className="bg-white shadow-xl rounded-2xl p-8 border border-blue-100"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-semibold text-gray-800 mb-6 text-center"
                >
                  Verify Your Email
                </motion.h2>
                
                <motion.div variants={itemVariants} className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Email Address
                  </label>
                  <input
                    required
                    onChange={finalmaill}
                    type="email"
                    id="email"
                    placeholder="your@lawfirm.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={sendingmail}
                  type="button"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md"
                >
                  {sendmail}
                </motion.button>

                {message && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-center font-medium"
                    style={{ color: message.includes("successfully") ? "#10B981" : "#EF4444" }}
                  >
                    {message}
                  </motion.p>
                )}

                <AnimatePresence>
                  {otpbox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-4 space-y-4 border-t border-gray-200 overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification Code
                        </label>
                        <input
                          required
                          onChange={valueotp}
                          type="number"
                          placeholder="Enter 6-digit code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                        />
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={submitotp}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
                      >
                        Verify & Continue
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </motion.div>
        )}

        {second && (
          <motion.div
            key="registration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center px-4 py-12"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
            >
              {/* Left Side - Form */}
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-1/2 p-10"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <Image 
                      src={Logo} 
                      alt="SettlesMarSolution Logo" 
                      width={128} 
                      height={128} 
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 text-center">SettlesMarSolution</h1>
                  <p className="text-sm text-gray-600 text-center">Complete Your Professional Registration</p>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  Create Your Account
                </motion.h2>
                <motion.p variants={itemVariants} className="text-sm text-gray-500 mb-8 text-center">
                  Register to access our exclusive legal platform
                </motion.p>

                <motion.form 
                  variants={containerVariants}
                  onSubmit={handleSignUp} 
                  className="space-y-5"
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Johnathan Doe, Esq."
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Verified Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={finalmail}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none cursor-not-allowed"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Create Secure Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="••••••••"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">Minimum 8 characters with uppercase, lowercase, and numbers</p>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isAnimating}
                    className={`w-full py-3.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition duration-200 shadow-md mt-4 ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isAnimating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      "Register Account"
                    )}
                  </motion.button>
                </motion.form>

                <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-gray-500">
                  Already registered?{" "}
                  <a href="/login" className="text-blue-600 hover:underline font-medium">
                    Sign In Here
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side - Illustration */}
              <motion.div 
                variants={itemVariants}
                className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-800 to-blue-600 p-10"
              >
                <div className="text-white text-center">
                  <div className="mb-8">
                    <LegalDocumentIllustration />
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-semibold mb-3"
                  >
                    Professional Legal Platform
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-blue-100 text-lg"
                  >
                    Access case files, legal documents, and premium resources
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}