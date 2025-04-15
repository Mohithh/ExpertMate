'use client';

import React, { useState } from 'react';
import Header from '../header/page';


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call or form submission logic here
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-800">Contact Us</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Have questions? Get in touch with our team for support or inquiries.
        </p>
      </div>

      {/* Contact Form + Map */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left - Contact Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right - Google Map */}
        <div className="w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_URL"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-blue-700 mb-2">Email Us</h3>
          <p className="text-gray-600">support@settlesmart.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-blue-700 mb-2">Call Us</h3>
          <p className="text-gray-600">011-2345-6789</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-blue-700 mb-2">Visit Us</h3>
          <p className="text-gray-600">
            Plot 123, Sector 45<br />Gurgaon, Haryana, India
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
