"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png"; // Make sure this is your company logo
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
// Removed nageshwar import as it's not directly used in this component's JSX
import nageshwar from "@/app/assets/nageshwar.jpg"; // Example image for the lawyer

// --- RightSideDisplay Component (Previously provided, now integrated) ---
// This component displays your company logo, name, tagline, and legal icons
const RightSideDisplay = () => {
  // Variants for staggered animation of the legal icons within this component
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
        delayChildren: 0.3,   // Delay before child animations start
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center p-8 text-center"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
    >
      {/* Company Logo - Larger Size with detailed framing */}
      <motion.div
        className="rounded-full border-4 border-blue-500 dark:border-blue-400 p-2 mb-8 bg-blue-50 dark:bg-blue-900/20"
        whileHover={{ rotate: 5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-56 h-56 flex items-center justify-center overflow-hidden">
          <Image
            src={Logo} // Ensure Logo import is correct for your company
            alt="SettleSmart Solutions Logo"
            width={180}
            height={180}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Company Name */}
      <motion.h2
        className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        SettleSmart Solutions
      </motion.h2>

      {/* Tagline */}
      <motion.p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6 italic">
        Your Trusted Legal Resolution Partner
      </motion.p>

      {/* Decorative Divider with subtle animation */}
      <motion.div
        className="w-48 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full my-6 shadow-md"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />

      {/* Enhanced Legal Service Icons */}
      <motion.div
        className="grid grid-cols-2 gap-x-8 gap-y-10 mt-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon 1: Fast Resolution */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full mb-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-600 dark:text-blue-400">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Fast Resolution</span>
        </motion.div>

        {/* Icon 2: Fair Outcomes */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full mb-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-600 dark:text-blue-400">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Fair Outcomes</span>
        </motion.div>

        {/* Icon 3: Confidential */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full mb-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-600 dark:text-blue-400">
              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Confidential</span>
        </motion.div>

        {/* Icon 4: Transparent */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-5 rounded-full mb-3 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-600 dark:text-blue-400">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Transparent</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


const Hero = () => {
  const { theme, setTheme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const router = useRouter();
  const [showConsent, setShowConsent] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (inView) controls.start("visible");

    const consentGiven = localStorage.getItem('lawFirmConsent');
    if (!consentGiven) {
      setShowConsent(true);
    }
  }, [controls, inView]);

  const acceptConsent = () => {
    localStorage.setItem('lawFirmConsent', 'true');
    setShowConsent(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  const popAnimation = {
    scale: [1, 1.1, 1],
    backgroundColor: ["#2563eb", "#1d4ed8", "#2563eb"],
    transition: { duration: 0.5 }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 500);

    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem("token");
    if (isLoggedIn) {
      router.push("https://cal.com/settlesmart/schedule-meeting");
    } else {
      router.push("/login");
    }
  };

  const stats = [
    { value: "500+", label: "Cases Resolved" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "30", label: "Days Average" },
    { value: "70%", label: "Cost Savings" },
  ];

  const steps = [
    { number: "1", title: "File a Dispute", description: "Submit details through our secure online form", icon: "📄" },
    { number: "2", title: "Match with Expert", description: "Our AI matches you with the perfect professional", icon: "🤝" },
    { number: "3", title: "Virtual Resolution", description: "Conduct proceedings securely online", icon: "💻" },
    { number: "4", title: "Get Binding Outcome", description: "Legally enforceable resolution in 30 days", icon: "⚖️" },
  ];

  // Define your services here, including an icon or a placeholder
  const services = [
    {
      title: "Arbitration",
      description: "Neutral third-party resolves disputes, leading to a binding decision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
          <path fillRule="evenodd" d="M3.75 3.75c-.828 0-1.5.672-1.5 1.5V19.5c0 .828.672 1.5 1.5 1.5h16.5c.828 0 1.5-.672 1.5-1.5V5.25c0-.828-.672-1.5-1.5-1.5H3.75zM8.25 6a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75h-7.5zM7.5 9.75a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V15a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75v-5.25z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Mediation",
      description: "Facilitated negotiation to help parties reach a mutually agreeable settlement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Conciliation",
      description: "A non-binding process where a conciliator assists parties in reaching a mutually agreeable settlement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
          <path fillRule="evenodd" d="M11.54 22.351A8.724 8.724 0 0012 22.5c2.486 0 4.757-.791 6.643-2.126A8.724 8.724 0 0022.5 12c0-2.486-.791-4.757-2.126-6.643C19.093 3.791 16.822 3 14.25 3A8.724 8.724 0 005.15 4.417 8.724 8.724 0 003 12c0 2.486.791 4.757 2.126 6.643C6.907 20.209 9.178 21 11.75 21a8.724 8.724 0 00.209.001zM13.75 12.25a.75.75 0 011.06 0l2 2a.75.75 0 01-1.06 1.06L14.5 14.06v3.19a.75.75 0 01-1.5 0v-3.19l-1.47 1.47a.75.75 0 01-1.06-1.06l2-2a.75.75 0 010-1.06zM8.5 9.75a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v5.25a.75.75 0 00.75.75h3.25a.75.75 0 000-1.5H5.25v-2.25h3.25z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Online Dispute Resolution (ODR)",
      description: "Resolving disputes entirely online, leveraging technology for efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
          <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>
      )
    },
  ];

  // Legal-themed SVG icons (if not already defined)
  const LegalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
      <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
      <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
    </svg>
  );

  const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  );

  const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );

  if (!mounted) return null;

  return (
    <div ref={ref} className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Legal Consent Popup */}
      {showConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex justify-center mb-4">
              <div className="rounded-full border-4 border-blue-500 p-1">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 w-32 h-32 flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="SettleSmart Solutions Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">Welcome to SettleSmart Solutions</h1>
            <h2 className="text-xl font-semibold mb-6 text-center text-blue-600 dark:text-blue-400">Powered by Shivaay Legal Professionals</h2>

            <div className="text-gray-700 dark:text-gray-300 mb-6 space-y-4">
              <p className="font-medium">Before you proceed, please read and accept the following disclaimer in accordance with the rules of the Bar Council of India (BCI) and applicable Indian laws:</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">No Advertisement or Solicitation:</h3>
                  <p>This website is not intended to advertise, solicit work, or offer legal advice. By accessing this platform, the user acknowledges that they are doing so voluntarily and of their own accord and that there has been no form of solicitation, personal communication, or inducement by SettleSmart Solutions or its Board of Directors.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Informational Purpose Only:</h3>
                  <p>The content provided on this website is intended only for general information purposes regarding our online dispute resolution services, and does not constitute legal advice or the formation of an attorney-client relationship.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Professional Relationship:</h3>
                  <p>Any use of this platform does not create a lawyer-client relationship between the user and SettleSmart Solutions, or with any of its Board Members. Users are advised to seek appropriate professional or legal advice before acting on any information provided here.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Compliant with BCI Guidelines:</h3>
                  <p>This website is designed to comply with Rule 36 of the BCI Rules and the relevant norms laid down by the Bar Council of India regarding lawyer websites and online presence. We do not seek to advertise or promote our services in violation of any BCI rules or laws of India.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Consent and Acknowledgement:</h3>
                  <p>By clicking "I Agree" below and proceeding further, the user acknowledges that they have read and understood this Disclaimer and wish to gain more information about SettleSmart Solutions for their own information and use.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <motion.button
                onClick={acceptConsent}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShieldIcon />
                I Agree and Proceed
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: [0, -180, -360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      {/* Marquee */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 py-2 overflow-hidden">
        <motion.div
          className="text-white font-bold text-sm md:text-base whitespace-nowrap flex items-center"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="mx-8 flex items-center gap-2">
            <LegalIcon />
            SETTLESMART SOLUTIONS • INDIA'S LEADING DISPUTE RESOLUTION PLATFORM • TRUSTED BY 500+ BUSINESSES •
            <LegalIcon />
          </span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            {/* Tagline */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: theme === 'dark' ? 'rgba(30, 58, 138, 0.5)' : 'rgba(219, 234, 254, 1)'
              }}
            >
              <LegalIcon />
              INNOVATIVE DISPUTE RESOLUTION
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <motion.span
                  className="block"
                  whileHover={{ x: 5 }}
                >
                  From Vivaad se Samadhan
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent"
                  whileHover={{ x: 5 }}
                >
                  Tak within Days
                </motion.span>
              </h1>
              <motion.p
                className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                whileHover={{ scale: 1.01 }}
              >
                SettleSmart Solutions leverages cutting-edge technology and a network of 200+ legal experts to resolve disputes fairly, confidentially, and at a fraction of traditional legal costs.
              </motion.p>
            </motion.div>

            {/* CTA Section */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-blue-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Schedule a Consultation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Get expert advice on your dispute resolution options</p>
                <div onClick={handleBooking}>
                  <motion.div
                    className="relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <motion.button
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200/50"
                      animate={buttonClicked ? popAnimation : pulseAnimation}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Book Meeting Now
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/JoinAsArbitrator" passHref>
                  <motion.button
                    className="w-full px-6 py-3 border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(239, 246, 255, 1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ScaleIcon />
                    Join as Arbitrator/Mediator
                  </motion.button>
                </Link>

                <Link href="/registerCase" passHref>
                  <motion.button
                    className="w-full px-6 py-3 border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(239, 246, 255, 1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <DocumentIcon />
                    Register a Case
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" variants={containerVariants}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(249, 250, 251, 1)'
                  }}
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Company branding (Now using the new RightSideDisplay component) */}
          <div className="hidden lg:block lg:w-1/2 relative min-h-[500px]"> {/* Added min-h for better visual */}
            <RightSideDisplay />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="relative z-10 py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}} // Trigger animation when in view
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} // Trigger animation when in view
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative z-10 py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} // Trigger animation when in view
                transition={{ duration: 0.6 }}
              >
                Mr. Nageshwar Singh
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}} // Trigger animation when in view
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Founder & Chief Managing Director at SettleSmart Solutions; Legal Intern at Khaitan & Co., LK & S, Reliance Retail Ltd. (Legal), H.K. Law Offices, Trilegal and the Ministry of External Affairs, Government of India
              </motion.p>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
              </motion.p>
            </div>
            {/* Added the image for Nageshwar Singh back, assuming you want to show it. */}
            <motion.div
              className="lg:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.6 }}
            >
              <Image
                src={nageshwar}
                alt="Mr. Nageshwar Singh"
                width={400}
                height={400}
                className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
