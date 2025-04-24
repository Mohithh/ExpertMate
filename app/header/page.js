"use client";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSun, AiOutlineMoon, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiUser, FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";

const Header = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginn, setloginn] = useState(false);
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const [mobileCaseDropdownOpen, setMobileCaseDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setloginn(false);
    } else {
      setloginn(true);
    }

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleCaseDropdown = (e) => {
    e.stopPropagation();
    setCaseDropdownOpen(!caseDropdownOpen);
  };

  const toggleMobileCaseDropdown = (e) => {
    e.stopPropagation();
    setMobileCaseDropdownOpen(!mobileCaseDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("facultytoken");
    router.push('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (caseDropdownOpen) setCaseDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [caseDropdownOpen]);

  // NavLink component
  const NavLink = ({ href, children, onClick }) => (
    <Link href={href} className="relative group" passHref onClick={onClick}>
      <span className="text-gray-700 dark:text-gray-300 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  // Mobile NavLink component
  const MobileNavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      onClick={onClick}
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
            {/* Logo */}
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
              
              {/* Case Management Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleCaseDropdown}
                  className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Case Management
                  {caseDropdownOpen ? (
                    <AiOutlineUp className="ml-1" size={14} />
                  ) : (
                    <AiOutlineDown className="ml-1" size={14} />
                  )}
                </button>
                
                {caseDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <Link 
                      href="/case" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setCaseDropdownOpen(false)}
                    >
                      Overview
                    </Link>
                    <Link 
                      href="/case/cause-list" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setCaseDropdownOpen(false)}
                    >
                      Cause List
                    </Link>
                    <Link 
                      href="/case/current-hearings" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setCaseDropdownOpen(false)}
                    >
                      Current Hearings
                    </Link>
                    <Link 
                      href="/case/upcoming-hearings" 
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setCaseDropdownOpen(false)}
                    >
                      Upcoming Hearings
                    </Link>
                  </div>
                )}
              </div>
              
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/StartDispute">Settle Dispute</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink href="/search">Search</NavLink>
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
                  {!loginn && <button className="flex items-center px-4 py-2 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
                    <FiLogIn className="mr-2" />
                    Login
                  </button>}
                </Link>
                <Link href="/signup">
                  {!loginn && <button className="flex items-center px-4 py-2 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg">
                    <FiUser className="mr-2" />
                    Sign Up
                  </button>}
                </Link>
                {loginn && <button onClick={logout} className="flex items-center px-4 py-2 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
                  <FiLogIn className="mr-2" />
                  LOGOUT
                </button>}
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
          className={`md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
          style={{
            top: '4rem',
            height: 'calc(100vh - 4rem)',
            pointerEvents: menuOpen ? 'auto' : 'none'
          }}
          aria-hidden={!menuOpen}
        >
          <div className="flex flex-col items-center justify-start w-full h-full overflow-y-auto py-4">
            <MobileNavLink href="/" onClick={closeMenu}>Home</MobileNavLink>
            <MobileNavLink href="/lawyer" onClick={closeMenu}>Our Leadership</MobileNavLink>
            
            {/* Mobile Case Management Dropdown */}
            <div className="w-full">
              <button 
                onClick={toggleMobileCaseDropdown}
                className="flex items-center justify-center w-full text-gray-800 dark:text-gray-200 text-lg font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6"
              >
                Case Management
                {mobileCaseDropdownOpen ? (
                  <AiOutlineUp className="ml-1" size={14} />
                ) : (
                  <AiOutlineDown className="ml-1" size={14} />
                )}
              </button>
              
              {mobileCaseDropdownOpen && (
                <div className="w-full bg-gray-50 dark:bg-gray-800/50">
                  <MobileNavLink href="/case" onClick={closeMenu}>Overview</MobileNavLink>
                  <MobileNavLink href="/case/cause-list" onClick={closeMenu}>Cause List</MobileNavLink>
                  <MobileNavLink href="/case/current-hearings" onClick={closeMenu}>Current Hearings</MobileNavLink>
                  <MobileNavLink href="/case/upcoming-hearings" onClick={closeMenu}>Upcoming Hearings</MobileNavLink>
                </div>
              )}
            </div>
            
            <MobileNavLink href="/services" onClick={closeMenu}>Services</MobileNavLink>
            <MobileNavLink href="/StartDispute" onClick={closeMenu}>Settle Dispute</MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMenu}>Contact</MobileNavLink>
            <MobileNavLink href="/search" onClick={closeMenu}>Search</MobileNavLink>

            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <AiOutlineSun size={24} /> : <AiOutlineMoon size={24} />}
              </button>
            </div>

            <div className="flex flex-col space-y-4 w-full max-w-xs mt-4 px-6">
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