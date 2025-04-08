"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [currentStat, setCurrentStat] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Rotate through impressive stats
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
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

  const stats = [
    { value: "500+", label: "Cases Resolved" },
    { value: "$10M+", label: "Client Savings" },
    { value: "30", label: "Days Average Resolution" },
  ];

  // Enhanced Justice Scale SVG with more details
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
      
      {/* Scale Pans with enhanced design */}
      <motion.path
        d="M175 220C175 240 195 260 225 260C255 260 275 240 275 220C275 200 255 180 225 180C195 180 175 200 175 220Z"
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
      <motion.path
        d="M325 220C325 240 305 260 275 260C245 260 225 240 225 220C225 200 245 180 275 180C305 180 325 200 325 220Z"
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
      
      {/* Scale chains for more realism */}
      <motion.path
        d="M225 190L225 180"
        stroke="#1a3e72"
        strokeWidth="2"
        strokeLinecap="round"
        variants={itemVariants}
      />
      <motion.path
        d="M275 190L275 180"
        stroke="#1a3e72"
        strokeWidth="2"
        strokeLinecap="round"
        variants={itemVariants}
      />
      
      {/* Legal documents with more detail */}
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
      
      {/* Document text lines */}
      <motion.path
        d="M185 160H215M185 170H205M185 180H195M185 190H210M185 200H200"
        stroke="#1a3e72"
        strokeWidth="1.5"
        variants={itemVariants}
      />
      <motion.path
        d="M285 160H315M285 170H305M285 180H295M285 190H310M285 200H300"
        stroke="#1a3e72"
        strokeWidth="1.5"
        variants={itemVariants}
      />
      
      {/* Gavel element */}
      <motion.rect
        x="230"
        y="100"
        width="40"
        height="10"
        rx="2"
        fill="#1a3e72"
        variants={itemVariants}
      />
      <motion.rect
        x="245"
        y="110"
        width="10"
        height="30"
        rx="2"
        fill="#1a3e72"
        variants={itemVariants}
      />
      
      {/* Floating legal icons */}
      <motion.path
        d="M150 100C150 100 160 90 170 100C180 110 170 120 150 110"
        fill="#1a3e72"
        variants={itemVariants}
      />
      <motion.path
        d="M350 100C350 100 340 90 330 100C320 110 330 120 350 110"
        fill="#1a3e72"
        variants={itemVariants}
      />
    </motion.svg>
  );

  return (
    <div className="relative bg-white overflow-hidden" ref={ref}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/60 to-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated abstract legal pattern with more complexity */}
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
          <motion.path
            d="M100 200L250 150L400 250L550 200L700 300L850 250"
            stroke="#1a3e72"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2.5, delay: 1 }}
          />
        </motion.svg>
        
        {/* Floating document icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <svg
              width="40"
              height="50"
              viewBox="0 0 40 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="2"
                width="36"
                height="46"
                rx="2"
                stroke="#1a3e72"
                strokeWidth="2"
              />
              <path
                d="M10 12H30M10 18H25M10 24H20"
                stroke="#1a3e72"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Animated badge with rotating stats */}
          <motion.div
            className="inline-flex items-center bg-[#1a3e72]/10 px-4 py-2 rounded-full mb-4"
            variants={itemVariants}
          >
            <motion.span 
              className="text-[#1a3e72] font-medium"
              key={currentStat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {[
                "🚀 80% Faster Resolution Than Courts",
                "💰 Save 70% on Legal Costs",
                "⚖️ 95% Client Satisfaction Rate"
              ][currentStat]}
            </motion.span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a3e72] leading-tight"
            variants={itemVariants}
          >
            Modern Dispute Resolution <br />
            <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Without the Courtroom Drama
            </span>
          </motion.h1>
          
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl"
            variants={itemVariants}
          >
            SettleSmart leverages cutting-edge mediation technology and a network of 
            retired judges to resolve disputes fairly, quickly, and at a fraction of 
            traditional legal costs. Our platform makes justice accessible to everyone.
          </motion.p>

          {/* Enhanced Key Benefits Grid */}
          <motion.div
            className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0"
            variants={containerVariants}
          >
            {[
              { 
                icon: "⚖️", 
                text: "Legally Binding", 
                desc: "Enforceable agreements",
                color: "bg-purple-100 text-purple-800" 
              },
              { 
                icon: "💰", 
                text: "1/3 Court Cost", 
                desc: "Save thousands",
                color: "bg-green-100 text-green-800" 
              },
              { 
                icon: "⏱️", 
                text: "90% Faster", 
                desc: "Weeks not years",
                color: "bg-blue-100 text-blue-800" 
              },
              { 
                icon: "🔒", 
                text: "Confidential", 
                desc: "Private resolutions",
                color: "bg-amber-100 text-amber-800" 
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-start space-x-3 ${item.color} p-3 rounded-lg shadow-sm hover:shadow-md transition-all`}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <span className="text-2xl mt-1">{item.icon}</span>
                <div>
                  <div className="font-bold">{item.text}</div>
                  <div className="text-xs opacity-80">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with more options */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => router.push("/schedule")}
              className="relative bg-gradient-to-r from-[#1a3e72] to-blue-700 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition flex items-center justify-center overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Free 30-Min Consultation
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
            
            <div className="flex flex-col sm:flex-row gap-4">
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
              
              <motion.button
                onClick={() => router.push("/case-types")}
                className="text-[#1a3e72] hover:text-blue-700 underline underline-offset-4 font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                See Case Types We Handle →
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Trust Indicators with animated counters */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm"
            variants={itemVariants}
          >
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 font-medium">4.9/5 (127 Reviews)</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`text-center ${index === currentStat ? 'opacity-100 scale-105' : 'opacity-60 scale-95'} transition-all duration-500`}
                >
                  <div className="text-xl font-bold text-[#1a3e72]">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SVG Illustration with more interactive elements */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
          <motion.div
            className="relative w-full max-w-lg"
            variants={scaleVariants}
          >
            <JusticeScale />
            
            {/* Floating Badges with more information */}
            <motion.div
              className="absolute -bottom-5 -left-5 bg-white shadow-lg rounded-full px-4 py-2 flex items-center border border-blue-100"
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
              <div>
                <div className="text-sm font-medium">Legally Binding</div>
                <div className="text-xs text-gray-500">Court-enforceable</div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -top-5 -right-5 bg-white shadow-lg rounded-full px-4 py-2 flex items-center border border-blue-100"
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
              <div>
                <div className="text-sm font-medium">90% Success</div>
                <div className="text-xs text-gray-500">Higher than courts</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 right-10 bg-white shadow-lg rounded-lg px-4 py-2 border border-blue-100"
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
                <div>
                  <div className="text-sm font-medium">30 Days Avg.</div>
                  <div className="text-xs text-gray-500">Resolution Time</div>
                </div>
              </div>
            </motion.div>
            
            {/* Animated tooltip that appears after delay */}
            <motion.div
              className="absolute top-20 left-0 bg-white shadow-xl rounded-lg p-3 w-48"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <div className="text-xs font-medium text-[#1a3e72]">Our mediation process balances both sides fairly</div>
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white transform rotate-45"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating animated elements with more variety */}
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
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-green-200/20 blur-xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Scrolling testimonials at the bottom */}
      <motion.div 
        className="relative bg-[#1a3e72]/5 py-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="inline-flex items-center mx-8">
              <div className="text-lg font-medium text-[#1a3e72] mr-4">
                "SettleSmart saved us $50,000 in legal fees"
              </div>
              <div className="text-sm text-gray-600">— Tech Startup CEO</div>
              <div className="mx-8 text-gray-300">•</div>
              
              <div className="text-lg font-medium text-[#1a3e72] mr-4">
                "Resolved in 3 weeks what would take years in court"
              </div>
              <div className="text-sm text-gray-600">— Small Business Owner</div>
              <div className="mx-8 text-gray-300">•</div>
              
              <div className="text-lg font-medium text-[#1a3e72] mr-4">
                "Fair process that actually worked for both sides"
              </div>
              <div className="text-sm text-gray-600">— Family Law Client</div>
              <div className="mx-8 text-gray-300">•</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;