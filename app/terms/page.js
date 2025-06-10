"use client"
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
              Terms & Conditions
            </span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Terms Content */}
        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">1. Acceptance of Terms</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>By accessing and using the website <span className="underline">https://settlesmartsolution.com</span> ("Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, you must not access or use the Platform.</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">2. Eligibility</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>You must be at least 18 years old and legally capable of entering into a binding contract as per the Indian Contract Act, 1872. If you are accessing this platform on behalf of an organization, you represent that you are authorized to bind such organization.</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">3. Nature of Service</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>SettleSmart Solutions is an ODR platform offering virtual arbitration, mediation, and conciliation services. These services are provided by empaneled legal professionals and do not constitute legal advice unless expressly stated.</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">4. User Conduct</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>You agree:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Not to misuse or tamper with the services.</li>
                <li>Not to post or transmit any false, misleading, defamatory, obscene, or unlawful content.</li>
                <li>Not to attempt to gain unauthorized access to any part of the Platform or systems connected to it.</li>
                <li>Not to impersonate another individual or entity.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">5. No Legal Advice</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>SettleSmart Solutions does not provide legal advice through this Platform. Any information provided is for informational and facilitative purposes only and must not be construed as a legal opinion.</p>
            </div>
          </motion.section>

          {/* Continue with other sections following the same pattern */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-500">12. Modification of Terms</h2>
            <div className="prose max-w-none" style={darkMode ? { color: '#e5e7eb' } : {}}>
              <p>We reserve the right to modify or update these Terms at any time without prior notice. Continued use after changes implies acceptance.</p>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default TermsAndConditions;