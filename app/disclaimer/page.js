"use client"
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { motion } from 'framer-motion';

const DisclaimerPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [accepted, setAccepted] = useState(false);

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
          className="text-center mb-12"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-600">
              Disclaimer
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Important Legal Notice
          </p>
        </motion.div>

        {/* Disclaimer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-xl shadow-lg mb-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
            <p className="font-semibold text-lg mb-6">Welcome to SettleSmart Solutions powered by Shivaay Legal Professionals.</p>
            
            <p className="mb-6">Before you proceed, please read and accept the following disclaimer in accordance with the rules of the Bar Council of India (BCI) and applicable Indian laws:</p>
            
            <h2 className="text-xl font-semibold mb-3 text-amber-500">No Advertisement or Solicitation</h2>
            <p className="mb-6">This website is not intended to advertise, solicit work, or offer legal advice. By accessing this platform, the user acknowledges that they are doing so voluntarily and of their own accord and that there has been no form of solicitation, personal communication, or inducement by SettleSmart Solutions or its Board of Directors.</p>
            
            <h2 className="text-xl font-semibold mb-3 text-amber-500">Informational Purpose Only</h2>
            <p className="mb-6">The content provided on this website is intended only for general information purposes regarding our online dispute resolution services, and does not constitute legal advice or the formation of an attorney-client relationship.</p>
            
            <h2 className="text-xl font-semibold mb-3 text-amber-500">Professional Relationship</h2>
            <p className="mb-6">Any use of this platform does not create a lawyer-client relationship between the user and SettleSmart Solutions, or with any of its Board Members. Users are advised to seek appropriate professional or legal advice before acting on any information provided here.</p>
            
            <h2 className="text-xl font-semibold mb-3 text-amber-500">Compliant with BCI Guidelines</h2>
            <p className="mb-6">This website is designed to comply with Rule 36 of the BCI Rules and the relevant norms laid down by the Bar Council of India regarding lawyer websites and online presence. We do not seek to advertise or promote our services in violation of any BCI rules or laws of India.</p>
          </div>
        </motion.div>

        {/* Acceptance Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 ${accepted ? 'border-green-500' : 'border-amber-500'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Consent and Acknowledgement</h3>
              <p className="text-sm">
                By proceeding, you acknowledge that you have read and understood this Disclaimer.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAccepted(!accepted)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${accepted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-gray-900'}`}
            >
              {accepted ? '✓ Accepted' : 'I Agree'}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default DisclaimerPage;
