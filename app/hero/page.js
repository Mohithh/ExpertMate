"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Data

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const steps = [
    {
      number: "1",
      title: "File a Dispute",
      description: "Submit details through our secure online form",
      icon: "📝",
    },
    {
      number: "2",
      title: "Match with Expert",
      description: "Our AI matches you with the perfect professional",
      icon: "🤝",
    },
    {
      number: "3",
      title: "Virtual Resolution",
      description: "Conduct proceedings securely online",
      icon: "💻",
    },
    {
      number: "4",
      title: "Get Binding Outcome",
      description: "Legally enforceable resolution in 30 days",
      icon: "⚖️",
    },
  ];

  const stats = [
    { value: "500+", label: "Cases Resolved" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "30", label: "Days Average" },
    { value: "70%", label: "Cost Savings" },
  ];

  return (
    <div className="relative bg-white overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0"></div>
      <motion.div

        className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"

        className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"

        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Dual marquee banner */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 py-2 overflow-hidden">

      {/* Animated gradient border */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Marquee */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-900 dark:to-blue-950 py-2 overflow-hidden">
        <motion.div
          className="text-white font-bold text-sm md:text-base whitespace-nowrap"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="mx-8">
            • SETTLESMART SOLUTIONS • INDIA&rsquo;s LEADING DISPUTE RESOLUTION PLATFORM • TRUSTED BY 500+ BUSINESSES •
          </span>
        </motion.div>
        <motion.div
          className="text-blue-200 text-xs md:text-sm whitespace-nowrap"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          • FAST • AFFORDABLE • CONFIDENTIAL • LEGALLY BINDING • 95% SUCCESS RATE • MEDIATION • ARBITRATION •
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">

      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32">
        {/* Logo section - Mobile first */}
       

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 items-center">
          {/* Left content */}
          <div className="lg:w-1/2">
            <motion.div
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4"
              variants={itemVariants}
            >
              INNOVATIVE DISPUTE RESOLUTION
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-tight mb-6"
              variants={itemVariants}
            >
              <span className="block">From Vivaad se Samadhan</span>
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Tak within Days
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              SettleSmart Solutions leverages cutting-edge technology and a network of 200+ legal experts to resolve disputes fairly, confidentially, and at a fraction of traditional legal costs.
            </motion.p>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              variants={itemVariants}
            >
              <Link href="/StartDispute">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all flex items-center gap-2 group shadow-lg hover:shadow-blue-200/50"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Start a Dispute</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.button>
              </Link>

              <Link href="/JoinAsArbitrator">
                <motion.button
                  className="px-8 py-4 border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all flex items-center gap-2 group"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Join as Arbitrator/Mediator</span>
                </motion.button>
              </Link>

            {/* Enhanced Meeting Scheduling Section */}
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-blue-200 dark:border-gray-700 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Schedule a Consultation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Get expert advice on your dispute resolution options</p>
                
                <Link href="https://cal.com/settlesmart/schedule-meeting">
                  <motion.div
                    className="relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <motion.button
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-800/30"
                      animate={pulseAnimation}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Book Meeting Now</span>
                    </motion.button>
                  </motion.div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/JoinAsArbitrator">
                  <motion.button
                    className="px-6 py-3 border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Join as Arbitrator/Mediator</span>
                  </motion.button>
                </Link>
              </div>
 
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              className="mb-12"
              variants={containerVariants}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Simple 4-Step Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    variants={itemVariants}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-200 p-3 rounded-full text-blue-600 text-xl font-semibold mr-4">
                        {step.number}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            className="lg:w-1/2"
            variants={scaleUp}
          >
            <img
              src="/assets/hero-image.png"
              alt="Dispute resolution"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
            <div className="relative w-full max-w-lg aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700">
              {/* Main illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <motion.div 
                    className="relative w-28 h-28 mx-auto mb-4"
                    animate={pulseAnimation}
                  >
                    <Image
                      src={Logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fast & Fair Dispute Resolution</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Technology-powered solutions for modern legal challenges</p>
                  
                  {/* Enhanced process steps visualization */}
                  <div className="relative h-28 w-full">
                    {steps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border border-gray-100 dark:border-gray-600 flex items-center gap-3"
                        style={{
                          width: '160px',
                          left: `${i * 22}%`,
                          top: `${i % 2 === 0 ? 0 : 50}px`,
                          zIndex: steps.length - i,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.2 * i }
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div className="text-2xl">{step.icon}</div>
                        <div>
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">STEP {step.number}</div>
                          <div className="text-sm font-medium dark:text-white">{step.title}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-20 dark:opacity-10"></div>
            </div>
          </motion.div>
        </div>

        {/* Process steps section */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-10"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How It Works</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  borderColor: theme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-3xl mb-4"
                    whileHover={{ rotate: 10 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-xs mb-2">STEP {step.number}</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
