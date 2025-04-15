"use client";

import React from 'react';
import Header from '../header/page';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions? Get in touch with our team for support or inquiries.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Google Form */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Send us a message</h2>
            <iframe 
              src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
              className="w-full h-[600px]" 
              frameBorder="0"
              marginHeight="0" 
              marginWidth="0"
            >
              Loading...
            </iframe>
          </div>

          {/* Right Side - Google Maps */}
          <div className="w-full lg:w-1/2 h-[500px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LOCATION_DATA!2dLONGITUDE!3dLATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzI0LjgiTiA3McKwMDUnNDkuNyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700 mb-2">Email Us</h3>
            <p className="text-gray-600">support@settlesmart.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700 mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Business Ave, Suite 100<br />San Francisco, CA 94107</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;