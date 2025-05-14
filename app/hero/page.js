"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();
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

  const steps = [
    {
      number: "1",
      title: "File a Dispute",
      description: "Submit details through our secure online form",
      icon: "📄",
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
    <div 
      className="relative bg-white dark:bg-gray-900 overflow-hidden" 
      ref={ref} 
      style={{ marginTop: '-1px' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white dark:from-gray-800/20 dark:to-gray-900 z-0"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 dark:opacity-[0.03] z-0"></div>

      {/* Animated blobs */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"
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
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"
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
            • SETTLESMART SOLUTIONS • INDIA'S LEADING DISPUTE RESOLUTION PLATFORM • TRUSTED BY 500+ BUSINESSES •
          </span>
        </motion.div>
        <motion.div
          className="text-blue-200 dark:text-blue-300 text-xs md:text-sm whitespace-nowrap"
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32">
        {/* Logo section - Mobile first */}
        <motion.div 
          className="lg:hidden w-full flex items-center justify-center mb-6"
          variants={scaleUp}
        >
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={Logo}
              alt="Company Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 items-center">
          {/* Left content */}
          <div className="lg:w-1/2">
            <motion.div
              className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-3"
              variants={itemVariants}
            >
              INNOVATIVE DISPUTE RESOLUTION
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
              variants={itemVariants}
            >
              <span className="block">From Vivaad se Samadhan</span>
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 bg-clip-text text-transparent">
                Tak within Days
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              SettleSmart Solutions leverages cutting-edge technology and a network of 200+ legal experts to resolve disputes fairly, confidentially, and at a fraction of traditional legal costs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              variants={itemVariants}
            >
              <Link href="/StartDispute">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 group shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-800/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Settle Dispute</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </Link>

              <Link href="/JoinAsArbitrator">
                <motion.button
                  className="px-6 py-3 border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all flex items-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Join as Arbitrator/Mediator</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right content - Image/Illustration (Desktop only) */}
          <motion.div 
            className="hidden lg:flex lg:w-1/2 items-center justify-center"
            variants={scaleUp}
          >
            <div className="relative w-full max-w-lg aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl overflow-hidden border border-blue-100 dark:border-gray-700">
              {/* Main illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <Image
                      src={Logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fast & Fair Dispute Resolution</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Technology-powered solutions for modern legal challenges</p>
                  
                  {/* Process steps visualization */}
                  <div className="relative h-28 w-full">
                    {steps.map((step, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md border border-gray-100 dark:border-gray-600 flex items-center gap-2"
                        style={{
                          width: '140px',
                          left: `${i * 25}%`,
                          top: `${i % 2 === 0 ? 0 : 50}px`,
                          zIndex: steps.length - i,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * i }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-xl">{step.icon}</div>
                        <div>
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">STEP {step.number}</div>
                          <div className="text-xs font-medium dark:text-white">{step.title}</div>
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
          className="mt-12"
          variants={containerVariants}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Simple 4-Step Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl mb-2">
                    {step.icon}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-xs mb-1">STEP {step.number}</div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;