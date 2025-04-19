"use client";
import React from "react";
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ScaleIcon,
  DocumentTextIcon,
  UserGroupIcon 
} from "@heroicons/react/24/outline";
import { FaLinkedin, FaTwitter, FaGavel } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaGavel className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">SettleSmart</span>
          </div>
          <p className="text-gray-400">Innovative legal solutions for modern disputes.</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-5 w-5 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-400" />
              <span>contact@settlesmart.com</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPinIcon className="h-5 w-5 text-blue-400 mt-0.5" />
              <span>123 Legal Ave, Suite 500<br />New York, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-2">
                <ScaleIcon className="h-4 w-4" />
                <span>Mediation</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-2">
                <DocumentTextIcon className="h-4 w-4" />
                <span>Contract Review</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-2">
                <UserGroupIcon className="h-4 w-4" />
                <span>Legal Consultation</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Case Studies</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Glossary</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <p className="text-gray-400">Subscribe to our legal insights newsletter.</p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SettleSmart. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition">
              <FaGavel className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer