'use client';

import React from 'react';

const ContactPage = () => {
  return (
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
        {/* Left - Google Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Send us a message</h2>
          <iframe 
            src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
            className="w-full h-[600px] border-none" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            title="Google Form"
          >
            Loading…
          </iframe>
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
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-blue-700 mb-2">Visit Us</h3>
          <p className="text-gray-600">
            Plot 123, Sector 45<br />Gurgaon, Haryana, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
