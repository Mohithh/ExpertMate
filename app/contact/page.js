'use client';
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaSpinner, FaMoon, FaSun } from 'react-icons/fa';

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Email is invalid";
    if (!formData.message.trim()) return "Message is required";
    return null;
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

      setTimeout(() => setStatus((prev) => ({ ...prev, submitted: false })), 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'An unexpected error occurred',
      });
    }
  };

  return (
    <>
    
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto text-lg">
            Have questions or need assistance? Our team is here to help you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-6 flex items-center">
              <span className="bg-blue-100 dark:bg-gray-700 p-2 rounded-full mr-3">
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
              </span>
              Send us a message
            </h2>

            {status.submitted ? (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
                    <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-2">Thank you!</h3>
                <p className="text-green-600 dark:text-green-300">
                  Your message has been sent successfully. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name*</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email*</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message*</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                    placeholder="Write your message here..."
                  />
                </div>

                {status.error && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                    {status.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  {status.submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="w-full lg:w-1/2 h-[500px] rounded-xl overflow-hidden shadow-lg border border-blue-100 dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.366085044946!2d77.2065413150824!3d28.6316449824229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-blue-800 dark:text-blue-400 mb-8">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-blue-50 dark:border-gray-700 text-center hover:shadow-md transition">
              <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-full inline-flex mb-4">
                <FaEnvelope className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 dark:text-blue-400 mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300">settlesmartsolutions01@gmail.com</p>
              <a
                href="mailto:support@settlesmart.com"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 inline-block transition-colors"
              >
                Send an email
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-blue-50 dark:border-gray-700 text-center hover:shadow-md transition">
              <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-full inline-flex mb-4">
                <FaPhone className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 dark:text-blue-400 mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300">+91 82890 28892</p>
              <a
                href="tel:01123456789"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 inline-block transition-colors"
              >
                Call now
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-blue-50 dark:border-gray-700 text-center hover:shadow-md transition">
              <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-full inline-flex mb-4">
                <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 dark:text-blue-400 mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connaught Place<br />New Delhi, India
              </p>
              <a
                href="https://maps.google.com/?q=Connaught+Place,New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 inline-block transition-colors"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;