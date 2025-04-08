"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Animated Justice Scale SVG
  const JusticeScale = () => (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 500 400"
      fill="none"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Base */}
      <motion.path
        d="M100 300L400 300"
        stroke="#1a3e72"
        strokeWidth="3"
        strokeLinecap="round"
        variants={itemVariants}
      />
      <motion.path
        d="M250 300L250 180"
        stroke="#1a3e72"
        strokeWidth="3"
        strokeLinecap="round"
        variants={itemVariants}
      />
      
      {/* Scale Beam */}
      <motion.rect
        x="220"
        y="180"
        width="60"
        height="10"
        rx="2"
        fill="#1a3e72"
        variants={itemVariants}
      />
      
      {/* Scale Pans */}
      <motion.circle
        cx="200"
        cy="220"
        r="25"
        fill="#1a3e72"
        fillOpacity="0.8"
        variants={itemVariants}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
        }}
      />
      <motion.circle
        cx="300"
        cy="220"
        r="25"
        fill="#1a3e72"
        fillOpacity="0.8"
        variants={itemVariants}
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2.2,
        }}
      />
      
      {/* Details */}
      <motion.path
        d="M150 220C150 220 170 200 180 220C190 240 170 250 150 240"
        fill="#1a3e72"
        variants={itemVariants}
      />
      <motion.circle
        cx="170"
        cy="190"
        r="15"
        fill="#1a3e72"
        variants={itemVariants}
      />
      <motion.path
        d="M350 220C350 220 330 200 320 220C310 240 330 250 350 240"
        fill="#1a3e72"
        variants={itemVariants}
      />
      <motion.circle
        cx="330"
        cy="190"
        r="15"
        fill="#1a3e72"
        variants={itemVariants}
      />
      
      {/* Documents */}
      <motion.rect
        x="180"
        y="150"
        width="40"
        height="50"
        rx="2"
        fill="white"
        stroke="#1a3e72"
        variants={itemVariants}
      />
      <motion.rect
        x="280"
        y="150"
        width="40"
        height="50"
        rx="2"
        fill="white"
        stroke="#1a3e72"
        variants={itemVariants}
      />
      <motion.path
        d="M185 160H215M185 170H205M185 180H195"
        stroke="#1a3e72"
        strokeWidth="1.5"
        variants={itemVariants}
      />
      <motion.path
        d="M285 160H315M285 170H305M285 180H295"
        stroke="#1a3e72"
        strokeWidth="1.5"
        variants={itemVariants}
      />
    </motion.svg>
  );

  return (
    <div className="relative bg-white overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/60 to-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated abstract legal pattern */}
        <motion.svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 300L150 200L300 350L450 250L600 400L750 300L900 450L1050 350"
            stroke="#1a3e72"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M50 400L200 300L350 450L500 350L650 500L800 400L950 550"
            stroke="#1a3e72"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </motion.svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <motion.div
            className="inline-flex items-center bg-[#1a3e72]/10 px-4 py-2 rounded-full mb-4"
            variants={itemVariants}
          >
            <span className="text-[#1a3e72] font-medium">
              🚀 80% Faster Resolution Than Courts
            </span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a3e72] leading-tight"
            variants={itemVariants}
          >
            Smart Legal Solutions <br />
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Without Court Hassles
            </span>
          </motion.h1>
          
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
            variants={itemVariants}
          >
            SettleSmart provides expert mediation and arbitration services that save you time and money. 
            Resolve disputes in weeks, not years, with our network of retired judges and legal experts.
          </motion.p>

          {/* Key Benefits Grid */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0"
            variants={containerVariants}
          >
            {[
              { icon: "⚖️", text: "Legally Binding", color: "bg-purple-100 text-purple-800" },
              { icon: "💰", text: "1/3 Court Cost", color: "bg-green-100 text-green-800" },
              { icon: "⏱️", text: "90% Faster", color: "bg-blue-100 text-blue-800" },
              { icon: "🔒", text: "Confidential", color: "bg-amber-100 text-amber-800" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-2 ${item.color} p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                variants={itemVariants}
                whileHover={{ y: -3 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => router.push("/schedule")}
              className="bg-gradient-to-r from-[#1a3e72] to-blue-700 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Free 30-Min Consultation
            </motion.button>
            <motion.button
              onClick={() => router.push("/how-it-works")}
              className="border-2 border-[#1a3e72] text-[#1a3e72] hover:bg-gray-50 px-6 py-3 rounded-md font-semibold transition flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              How It Works
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600"
            variants={itemVariants}
          >
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2">4.9/5 (127 Reviews)</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div>Trusted by 500+ Clients</div>
          </motion.div>
        </div>

        {/* SVG Illustration */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <motion.div
            className="relative w-full max-w-lg"
            variants={scaleVariants}
          >
            <JusticeScale />
            
            {/* Floating Badges */}
            <motion.div
              className="absolute -bottom-5 -left-5 bg-white shadow-lg rounded-full px-4 py-2 flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-green-500 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">Legally Binding</span>
            </motion.div>
            
            <motion.div
              className="absolute -top-5 -right-5 bg-white shadow-lg rounded-full px-4 py-2 flex items-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-500 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium">90% Success Rate</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 right-10 bg-white shadow-lg rounded-lg px-4 py-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center">
                <div className="bg-amber-500 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Avg. 30 Days Resolution</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating animated elements */}
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-blue-200/30 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-purple-200/30 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};

export default Hero;