"use client"
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={darkMode ? "#3B82F6" : "#2563EB"} />
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={darkMode ? "#3B82F6" : "#2563EB"} />
            </svg>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Privacy Policy
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Policy Content */}
        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">1. Introduction</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>SettleSmart Solutions ("we," "our," or "us") operates [Your Platform/Website Name] and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our dispute resolution services.</p>
              <p>By accessing our platform, you agree to the terms outlined below. If you disagree with any part of this policy, please refrain from using our services.</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">2. Information We Collect</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>We collect the following categories of data:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, mobile number, Aadhaar (if required for verification), PAN, and government-issued IDs.</li>
                <li><strong>Case Details:</strong> Dispute summaries, evidence, statements, and communication logs.</li>
                <li><strong>Usage Data:</strong> IP address, device type, browser, timestamps, and cookies (see Section 7).</li>
              </ul>
            </div>
          </motion.section>

          {/* Add more sections following the same pattern */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">11. Policy Updates</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>We may revise this policy periodically to reflect changes in our practices or legal requirements. Changes will be posted on this page with the updated effective date.</p>
              <p>We will notify users of significant changes through email or prominent notices on our platform. Continued use of our services after such changes constitutes acceptance of the revised terms.</p>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default PrivacyPolicy;