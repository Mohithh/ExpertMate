'use client';

import React, { useState } from 'react';
import Header from '../header/page';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaSpinner } from 'react-icons/fa';

const ContactPage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
            Have questions or need assistance? Our team is here to help you.
          </p>
        </div>

        {/* Contact Form + Map */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left - Contact Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <FaEnvelope className="text-blue-600" />
              </span>
              Send us a message
            </h2>

            {status.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaCheck className="text-green-600 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-green-800 mb-2">Thank you!</h3>
                <p className="text-green-600">
                  Your message has been sent successfully. We&apos;ll get back to you soon.
                </p>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Email*</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Subject of your message"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Message*</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Write your message here..."
                  />
                </div>

                {status.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {status.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
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

          {/* Right - Google Map */}
          <div className="w-full lg:w-1/2 h-[500px] rounded-xl overflow-hidden shadow-lg border border-blue-100">
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

        {/* Contact Info */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-8">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-blue-50 text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 mb-2">Email Us</h3>
              <p className="text-gray-600">support@settlesmart.com</p>
              <a
                href="mailto:support@settlesmart.com"
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                Send an email
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-blue-50 text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <FaPhone className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 mb-2">Call Us</h3>
              <p className="text-gray-600">011-2345-6789</p>
              <a
                href="tel:01123456789"
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                Call now
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-blue-50 text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-medium text-lg text-blue-700 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                Connaught Place<br />New Delhi, India
              </p>
              <a
                href="https://maps.google.com/?q=Connaught+Place,New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;