"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";

const AdvocateHeader = ({ userData = {} }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Dynamic user data with defaults
  const {
    name: userName = "Advocate",
    role = "Professional Account",
    initials = userName?.slice(0, 2).toUpperCase() || "AD",
    logo = Logo
  } = userData;

  const navLinks = [
    { 
      name: "Dashboard", 
      href: "/LawyerDashboard", 
      icon: "M4 6h16M4 12h16M4 18h16"
    },
    { 
      name: "Cases", 
      href: "/advocate_case", 
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    },
    { 
      name: "Clients", 
      href: "/advocate_clients", 
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    },
    { 
      name: "Calendar", 
      href: "/advocate_calender", 
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent backdrop-blur-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20"> {/* Increased height to h-20 */}
            <Link href="/LawyerDashboard" className="flex items-center group">
              <div className="relative h-10 w-36 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src={logo} 
                  alt="Law Firm Logo" 
                  fill 
                  className="object-contain object-left drop-shadow-md" 
                  priority 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 144px"
                />
              </div>
            </Link>

            <nav className="hidden md:flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href 
                      ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-md" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-white/30"
                  }`}
                >
                  <span className="mr-2">
                    <svg 
                      className={`w-5 h-5 ${pathname === link.href ? 'text-white' : 'text-blue-500'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={pathname === link.href ? 2.5 : 2} 
                        d={link.icon} 
                      />
                    </svg>
                  </span>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:from-blue-600 hover:to-blue-700 ${
                  dropdownOpen ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                }`}
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                {initials}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-1 z-50 overflow-hidden animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={() => router.push("/login")}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 border-t border-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer div to push content down below the fixed header */}
      <div className="h-20"></div> {/* Matches the header height */}
    </>
  );
};

export default AdvocateHeader;