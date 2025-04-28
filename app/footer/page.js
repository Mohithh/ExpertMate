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
  InformationCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram,
  FaYoutube
} from "react-icons/fa";
import Logo from "@/app/assets/hello_logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none"></div>
      
      {/* Floating shapes */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-72 h-72 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand Column - Updated logo styling */}
        <div className="flex flex-col items-center md:items-start space-y-5">
          <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
            <div className="w-16 h-16 relative"> {/* Fixed size container */}
              <Image 
                src={Logo} 
                alt="SettleSmart Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center md:text-left">
              SettleSmart
            </span>
          </div>
          
          <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
            Smart dispute resolution through innovative mediation and legal technology.
          </p>
          
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/settlesmart-solutions" className="text-gray-400 hover:text-white transition-all hover:-translate-y-0.5">
              <FaLinkedin className="h-5 w-5" />
            </a>
            {/* <a href="#" className="text-gray-400 hover:text-white transition-all hover:-translate-y-0.5">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all hover:-translate-y-0.5">
              <FaFacebook className="h-5 w-5" />
            </a> */}
            <a href="https://www.instagram.com/solutions.settlesmart?igsh=OWtyem1wczJramNk" className="text-gray-400 hover:text-white transition-all hover:-translate-y-0.5">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-800/50 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
            <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-400" />
            Navigation
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", href: "/" },
            
              { name: "Services", href: "/services" },
              { name: "Contact", href: "/contact" }
            ].map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        {/* <div className="bg-gray-800/50 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
            <ScaleIcon className="h-4 w-4 mr-2 text-blue-400" />
            Services
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Mediation", href: "/services/mediation" },
              { name: "Arbitration", href: "/services/arbitration" },
              { name: "Contract Review", href: "/services/contract-review" },
              { name: "Legal Consultation", href: "/services/consultation" },
             
            ].map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-gray-400 hover:text-white transition flex items-center group text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition"></span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Contact & Newsletter */}
        <div className="bg-gray-800/50 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-2 text-blue-400" />
            Stay Updated
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <PhoneIcon className="h-4 w-4 mr-2 text-blue-400" />
                +91 6392609366
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-400" />
                settlesmartsolutions01@gmail.com
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-300 mb-2">Get the latest updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm bg-gray-700 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-400 w-full placeholder-gray-500"
                />
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-r text-sm transition-all flex items-center">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} SettleSmart. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {[
                { name: "Privacy", icon: ShieldCheckIcon, href: "/privacy" },
                { name: "Terms", icon: DocumentTextIcon, href: "/terms" },
                { name: "Disclaimer", icon: InformationCircleIcon, href: "/disclaimer" }
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-500 hover:text-gray-300 text-xs flex items-center transition"
                >
                  <item.icon className="h-3 w-3 mr-1" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;