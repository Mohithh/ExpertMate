"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const router = useRouter();
  const [showConsent, setShowConsent] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
    
    // Check if consent was already given
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
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Welcome to SettleSmart Solutions</h1>
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
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          I Agree and Proceed
        </motion.button>
      </div>
    </motion.div>
  </div>
)}
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white dark:from-gray-800/20 dark:to-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 dark:opacity-[0.03] z-0"></div>

      {/* Animated blobs */}
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
          className="text-white font-bold text-sm md:text-base whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="mx-8">• SETTLESMART SOLUTIONS • INDIA'S LEADING DISPUTE RESOLUTION PLATFORM • TRUSTED BY 500+ BUSINESSES •</span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            {/* Tagline */}
            <motion.div
              className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: theme === 'dark' ? 'rgba(30, 58, 138, 0.5)' : 'rgba(219, 234, 254, 1)'
              }}
            >
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

          {/* Right side - Visual element */}
          <div className="lg:w-1/2 relative">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative aspect-square w-full max-w-lg mx-auto">
                <motion.div 
                  className="absolute inset-0 bg-blue-500/10 rounded-3xl rotate-6"
                  animate={{
                    rotate: [6, 8, 6],
                    transition: { duration: 8, repeat: Infinity }
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-0 bg-blue-500/5 rounded-3xl -rotate-6"
                  animate={{
                    rotate: [-6, -8, -6],
                    transition: { duration: 10, repeat: Infinity }
                  }}
                ></motion.div>
                <motion.div 
                  className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center p-8"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="text-center space-y-6">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      How It Works
                    </motion.h3>
                    <div className="grid grid-cols-2 gap-4">
                      {steps.map((step, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg"
                          whileHover={{ 
                            y: -5,
                            scale: 1.05,
                            backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(219, 234, 254, 1)'
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div 
                            className="text-3xl mb-2"
                            animate={{
                              y: [0, -5, 0],
                              transition: { delay: index * 0.5, duration: 2, repeat: Infinity }
                            }}
                          >
                            {step.icon}
                          </motion.div>
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">STEP {step.number}</div>
                          <h4 className="font-bold text-gray-900 dark:text-white mt-1">{step.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{step.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;