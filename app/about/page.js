"use client"
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Legal Expert Name",
      role: "Founder & Chief Arbitrator",
      bio: "Specialized in commercial dispute resolution with 15+ years experience",
      img: "/team1.jpg" // Replace with your image path
    },
    {
      id: 2,
      name: "Tech Expert Name",
      role: "CTO",
      bio: "Digital transformation specialist focused on legal tech solutions",
      img: "/team2.jpg" // Replace with your image path
    },
    {
      id: 3,
      name: "Operations Name",
      role: "Head of Case Management",
      bio: "Streamlining dispute resolution processes for optimal efficiency",
      img: "/team3.jpg" // Replace with your image path
    }
  ];

  const stats = [
    { value: "200+", label: "Cases Resolved" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "48h", label: "Average Response Time" },
    { value: "50+", label: "Legal Partners" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              About SettleSmart
            </span>
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Revolutionizing dispute resolution through technology and legal expertise
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className={`grid md:grid-cols-2 gap-8 items-center mb-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-6">
              At SettleSmart Solutions, we're transforming traditional dispute resolution by combining legal expertise with cutting-edge technology. Our platform provides accessible, efficient, and cost-effective alternatives to conventional litigation.
            </p>
            <p className="text-lg">
              Powered by Shivaay Legal Professionals, we maintain the highest standards of legal practice while innovating to serve the digital age.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden"
          >
            <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} opacity-70`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                <line x1="3" y1="22" x2="21" y2="22"></line>
              </svg>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-6 text-center rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <p className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Team Section */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet Our <span className="text-blue-500">Leadership</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="h-48 bg-gray-300 relative overflow-hidden">
                  {/* Replace with your team images */}
                  <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-20`}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚖️", title: "Integrity", desc: "Uncompromising ethical standards in all resolutions" },
              { icon: "🚀", title: "Innovation", desc: "Continually evolving our technology and methods" },
              { icon: "🤝", title: "Fairness", desc: "Balanced outcomes for all parties involved" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AboutUs;