"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
<<<<<<< HEAD


=======
import Link from "next/link";
<<<<<<< HEAD
import MeetingSchedule from "@/app/schedulemeeting/page"
>>>>>>> ad71e9fb9358202de220c3bd2e2dbb33c9a937b3
=======
>>>>>>> 8a0bc6e9f7810a64536b0335014b221e854f03da
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
        stiffness: 100
      }
    }
  };

  // Data
  const steps = [
    {
      number: "1",
      title: "File a Dispute",
      description: "Submit details through our secure online form",
      icon: "📝"
    },
    {
      number: "2",
      title: "Match with Expert",
      description: "Our AI matches you with the perfect professional",
      icon: "🤝"
    },
    {
      number: "3",
      title: "Virtual Resolution",
      description: "Conduct proceedings securely online",
      icon: "💻"
    },
    {
      number: "4",
      title: "Get Binding Outcome",
      description: "Legally enforceable resolution in 30 days",
      icon: "⚖️"
    }
  ];

  const stats = [
    { value: "500+", label: "Cases Resolved" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "30", label: "Days Average" },
    { value: "70%", label: "Cost Savings" }
  ];

  return (
    <div className="relative bg-white overflow-hidden" ref={ref}>
<<<<<<< HEAD


      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
=======
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white z-0"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0"></div>
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Dual marquee banner */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 py-2 overflow-hidden">
>>>>>>> 8a0bc6e9f7810a64536b0335014b221e854f03da
        <motion.div
          className="text-white font-bold text-sm md:text-base whitespace-nowrap"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
            ease: "linear"
          }}
        >
          • FAST • AFFORDABLE • CONFIDENTIAL • LEGALLY BINDING • 95% SUCCESS RATE • MEDIATION • ARBITRATION •
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-center">
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
              Tak within Days
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
                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)"
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
                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center font-medium text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right content - Animated showcase */}
          <div className="lg:w-1/2">
            <motion.div
              className="relative bg-white rounded-2xl overflow-hidden p-8 border border-gray-200 shadow-xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-white/30 z-0"></div>

              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Why Choose SettleSmart?</h3>
                </motion.div>

                {/* Animated benefits */}
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-green-100 text-green-600 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">5x Faster Than Courts</h4>
                      <p className="text-gray-600">Average resolution in 30 days compared to 6+ months in traditional litigation</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">70% Cost Savings</h4>
                      <p className="text-gray-600">Fraction of litigation costs with predictable pricing</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Confidential</h4>
                      <p className="text-gray-600">Private proceedings with enforceable NDAs</p>
                    </div>
                  </motion.div>
                </div>

                {/* Animated trust badges */}
                <motion.div
                  className="mt-8 flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                    <div className="bg-blue-600 text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Legally Binding</span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                    <div className="bg-green-600 text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated footer */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-200 text-white py-8 overflow-hidden" style={{ visibility: "visible", opacity: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Scrolling footer marquee - High Visibility Version */}
          <motion.div
            className="mt-1 pt-1 border-t border-blue-200 overflow-hidden"
            initial={{ opacity: 1 }} // Start fully visible
            animate={{ opacity: 1 }} // Stay fully visible
          >
            <motion.div
              className="flex whitespace-nowrap text-sm font-medium"
              style={{ color: "#bfdbfe" }} // Light blue-200 for better contrast
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span className="mx-8">
                • SETTLESMART SOLUTIONS • INDIA&rsquo;s #1 ONLINE DISPUTE RESOLUTION PLATFORM •
              </span>
              <span className="mx-8">• 95% SUCCESS RATE • 200+ CERTIFIED PROFESSIONALS • 30-DAY RESOLUTION GUARANTEE •</span>
              <span className="mx-8">• LEGALLY BINDING OUTCOMES • 70% COST SAVINGS • 100% CONFIDENTIAL •</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;