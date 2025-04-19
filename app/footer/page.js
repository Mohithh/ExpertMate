"use client";
import React from "react";
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ScaleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGavel, 
  FaFacebook, 
  FaInstagram 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Compact Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <div className="flex items-center space-x-2">
            <FaGavel className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold text-white">SettleSmart</span>
          </div>
          <p className="text-gray-400 text-sm">Innovative legal solutions for modern disputes.</p>
          
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-1">
              <PhoneIcon className="h-4 w-4 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <EnvelopeIcon className="h-4 w-4 text-blue-400" />
              <span>contact@settlesmart.com</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <ScaleIcon className="h-3.5 w-3.5" />
                <span>Mediation</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <DocumentTextIcon className="h-3.5 w-3.5" />
                <span>Contract Review</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <UserGroupIcon className="h-3.5 w-3.5" />
                <span>Consultation</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <DocumentTextIcon className="h-3.5 w-3.5" />
                <span>Terms</span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition flex items-center space-x-1">
                <InformationCircleIcon className="h-3.5 w-3.5" />
                <span>Disclaimer</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h3>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label="Twitter">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label="LinkedIn">
              <FaLinkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label="Facebook">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label="Instagram">
              <FaInstagram className="h-4 w-4" />
            </a>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-gray-400 mb-1">Subscribe to updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="px-2 py-1 text-sm bg-gray-800 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-r text-sm transition"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} SettleSmart. All rights reserved.
          </p>
          <div className="flex space-x-3 text-gray-500">
            <a href="#" className="hover:text-blue-400 transition">Accessibility</a>
            <a href="#" className="hover:text-blue-400 transition">Sitemap</a>
            <a href="#" className="hover:text-blue-400 transition">Attorney Advertising</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;