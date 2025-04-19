"use client";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { FiUser, FiLogIn } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (!mounted) return;
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // NavLink component
  const NavLink = ({ href, children }) => (
    <Link href={href} className="relative group" passHref>
      <span className="text-gray-700 dark:text-gray-300 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  // Mobile NavLink component
  const MobileNavLink = ({ href, children }) => (
    <Link 
      href={href} 
      onClick={closeMenu}
      className="text-gray-800 dark:text-gray-200 text-lg font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6 w-full text-center"
      passHref
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 h-16 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo - Increased size */}
            <Link href="/" className="flex-shrink-0 flex items-center min-w-[220px]">
              <div className="relative w-[220px] h-[80px]">
                <Image
                  src={Logo}
                  alt="Company Logo"
                  fill
                  sizes="(max-width: 768px) 280px, 280px"
                  className="object-contain object-left transition-transform hover:scale-105 duration-300"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/lawyer">Our Leadership</NavLink>
              <NavLink href="/case">Case Management</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/StartDispute">Dispute</NavLink>
              {/* <NavLink href="/arbitrator">Arbitrators</NavLink> */}
              {/* <NavLink href="/pricing">Pricing</NavLink> */}
              <NavLink href="/contact">Contact</NavLink>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <AiOutlineSun size={20} /> : <AiOutlineMoon size={20} />}
              </button>

              <div className="flex space-x-2">
                <Link href="/login">
                  <button className="flex items-center px-4 py-2 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
                    <FiLogIn className="mr-2" />
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center px-4 py-2 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg">
                    <FiUser className="mr-2" />
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
          style={{ 
            top: '4rem',
            height: 'calc(100vh - 4rem)',
            pointerEvents: menuOpen ? 'auto' : 'none' 
          }}
          aria-hidden={!menuOpen}
        >
          <div className="flex flex-col items-center justify-start space-y-4 w-full h-full overflow-y-auto py-8">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/lawyer">Lawyers</MobileNavLink>
            <MobileNavLink href="/case">Case Management</MobileNavLink>
            <MobileNavLink href="/services">Services</MobileNavLink>
            {/* <MobileNavLink href="/arbitrator">Arbitrators</MobileNavLink> */}
            {/* <MobileNavLink href="/pricing">Pricing</MobileNavLink> */}
            <MobileNavLink href="/contact">Contact</MobileNavLink>

            <div className="flex items-center mt-8 space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <AiOutlineSun size={24} /> : <AiOutlineMoon size={24} />}
              </button>
            </div>

            <div className="flex flex-col space-y-4 w-full max-w-xs mt-6">
              <Link href="/login" className="w-full" onClick={closeMenu}>
                <button className="flex items-center justify-center w-full px-6 py-3 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
                  <FiLogIn className="mr-2" />
                  Login
                </button>
              </Link>
              <Link href="/signup" className="w-full" onClick={closeMenu}>
                <button className="flex items-center justify-center w-full px-6 py-3 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors">
                  <FiUser className="mr-2" />
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Add padding to prevent content from being hidden behind the fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;