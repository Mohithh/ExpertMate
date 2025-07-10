'use client';
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCheck, 
  FaSpinner, 
  FaMoon, 
  FaSun,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaGlobe
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  // Initialize dark mode
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(initialMode);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Email is invalid";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Hello Mohit");
    const body = encodeURIComponent("I want to connect with you!");
    window.location.href = `mailto:mohityadavhh@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus({ submitting: false, submitted: false, error: validationError });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('/api/send-email-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'An unexpected error occurred',
      });
    }
  };

  // Founders data
  const founders = [
    {
      id: 1,
      name: "Mohit Yadav",
      role: "Co-Founder & CEO",
      bio: "Tech enthusiast with expertise in full-stack development and product design. Passionate about building scalable web applications and solving complex problems.",
      email: "mohityadavhh@gmail.com",
      phone: "+91 6392609366",
      photo: "/founders/mohit.jpg", // Replace with your actual path
      social: [
        { icon: <FaLinkedin />, url: "https://linkedin.com/in/mohit-kumar-yadav-898711230", color: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" },
        { icon: <FaGithub />, url: "https://github.com/Mohithh", color: "text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200" },
        { icon: <FaInstagram />, url: "https://www.instagram.com/mohityadav.h", color: "text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300" },
        { icon: <FaTwitter />, url: "https://twitter.com/yourusername", color: "text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300" }
      ]
    },
    {
      id: 2,
      name: "Aman Sharma",
      role: "Co-Founder & CTO",
      bio: "Experienced software architect specializing in scalable systems and cloud infrastructure. Focused on creating robust backend solutions and optimizing system performance.",
      email: "aman@example.com",
      phone: "+91 9876543210",
      photo: "/founders/aman.jpg", // Replace with your actual path
      social: [
        { icon: <FaLinkedin />, url: "https://linkedin.com/in/aman-example", color: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" },
        { icon: <FaGithub />, url: "https://github.com/aman-example", color: "text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200" },
        { icon: <FaTwitter />, url: "https://twitter.com/aman-example", color: "text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300" },
        { icon: <FaGlobe />, url: "https://aman-personal-website.com", color: "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300" }
      ]
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-yellow-300 shadow-sm hover:shadow-md transition-all"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Let's <span className="text-blue-600 dark:text-blue-400">Connect</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            Whether it's a job, a project, or just a friendly hello — our inbox is always open!
          </p>
        </motion.div>

        {/* Social Media Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 text-center mb-12"
        >
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
            Feel free to reach out through any of these platforms:
          </p>

          <div className="flex justify-center flex-wrap gap-6 text-3xl mb-10">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mohityadavhh@gmail.com&su=Hello%20Mohit&body=I%20want%20to%20connect%20with%20you!"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
              title="Email"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://wa.me/6392609366"
              target="_blank"
              rel="noreferrer"
              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/mohityadav.h?igsh=ZnR1eXY2d3o5MXk="  
              target="_blank"
              rel="noreferrer"
              className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/mohit-kumar-yadav-898711230"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Mohithh"
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 transition"
              title="GitHub"
            >
              <FaGithub />
            </a>
          </div>

          <div>
            <button
              onClick={handleEmailClick}
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow hover:shadow-lg transition-all"
            >
              ✉️ Drop Us a Message
            </button>
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Meet Our <span className="text-blue-600 dark:text-blue-400">Founders</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founders.map((founder) => (
              <motion.div 
                key={founder.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 dark:border-gray-700 mb-6">
                      <Image 
                        src={founder.photo} 
                        alt={founder.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{founder.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{founder.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{founder.bio}</p>
                    
                    <div className="flex flex-col space-y-3 w-full">
                      <div className="flex items-center justify-center">
                        <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
                        <a 
                          href={`mailto:${founder.email}`} 
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          {founder.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-center">
                        <FaPhone className="text-gray-500 dark:text-gray-400 mr-3" />
                        <a 
                          href={`tel:${founder.phone.replace(/\s+/g, '')}`} 
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          {founder.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <div className="flex justify-center space-x-4">
                    {founder.social.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-2xl ${social.color} transition`}
                        aria-label={`${founder.name}'s social media`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form and Info Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <span className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full mr-3 text-white shadow-sm">
                <FaEnvelope />
              </span>
              Send a Message
            </h2>

            {status.submitted ? (
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-green-50 dark:bg-gray-700 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
                    <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-2">Message Sent!</h3>
                <p className="text-green-600 dark:text-green-300">
                  We've received your message and will respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white transition-all shadow-sm"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg"
                  >
                    {status.error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-700 dark:to-blue-600 dark:hover:from-blue-800 dark:hover:to-blue-700 text-white px-6 py-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info and Map */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Google Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.366085044946!2d77.2065413150824!3d28.6316449824229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sAvanta%20Business%20Centre%2C%20Barakhamba%20Road%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map - Avanta Business Centre"
              ></iframe>
            </motion.div>

            {/* Contact Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Email Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full inline-flex mb-4 group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors">
                  <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">mohityadavhh@gmail.com</p>
                <button
                  onClick={handleEmailClick}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center transition-colors"
                >
                  Contact via email
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Phone Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
                <div className="bg-blue-100 dark:bg-gray-700 p-3 rounded-full inline-flex mb-4 group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors">
                  <FaPhone className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">+91 6392609366</p>
                <a
                  href="tel:+916392609366"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center transition-colors"
                >
                  Call now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Contact Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 max-w-7xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg">
                Can't find what you're looking for? Our support team is available to assist you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEmailClick}
                className="px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" /> Email Support
              </button>

              <button
                onClick={handleEmailClick}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all flex items-center justify-center"
              >
                ✉️ Drop Us a Message
              </button>
              
              <a
                href="tel:+916392609366"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center"
              >
                <FaPhone className="mr-2" /> Call Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;