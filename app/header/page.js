"use client";
import { useState, useEffect } from "react";
import { 
  AiOutlineMenu, 
  AiOutlineClose, 
  AiOutlineSun, 
  AiOutlineMoon, 
  AiOutlineDown, 
  AiOutlineUp,
  AiOutlineHome
} from "react-icons/ai";
import { 
  FiUser, 
  FiLogIn, 
  FiUsers,
  FiFileText,
  FiList,
  FiHeadphones,
  FiClock,
  FiSettings,
  FiShield,
  FiMail
} from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineManageSearch } from "react-icons/md";
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

  // NavLink component with single-line enforcement
  const NavLink = ({ href, children, onClick, icon: Icon }) => (
    <Link href={href} className="relative group whitespace-nowrap" passHref onClick={onClick}>
      <div className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 h-10">
        {Icon && <Icon className="mr-2 text-base opacity-70 group-hover:opacity-100 transition-opacity" />}
        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-sm">
          {children}
        </span>
      </div>
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-4/5 transition-all duration-300 ease-out"></span>
    </Link>
  );

  // Mobile NavLink component
  const MobileNavLink = ({ href, children, onClick, icon: Icon }) => (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center text-gray-800 dark:text-gray-200 text-base font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6 w-full whitespace-nowrap"
      passHref
    >
      {Icon && <Icon className="mr-3 text-lg" />}
      <span>{children}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - fixed width to prevent layout shift */}
            <Link href="/" className="flex-shrink-0 w-40">
              <div className="relative w-full h-12">
                <Image
                  src={Logo}
                  alt="Company Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Centered Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center space-x-1">
                <NavLink href="/" icon={AiOutlineHome}>Home</NavLink>
                <NavLink href="/lawyer" icon={FiUsers}>Leadership</NavLink>
                
                {/* Case Management Dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleCaseDropdown}
                    className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 group h-10 whitespace-nowrap"
                  >
                    <MdOutlineManageSearch className="mr-2 text-base" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                      Cases
                    </span>
                    {caseDropdownOpen ? (
                      <AiOutlineUp className="ml-1" size={14} />
                    ) : (
                      <AiOutlineDown className="ml-1" size={14} />
                    )}
                  </button>
                  
                  {caseDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                      <Link 
                        href="/case" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                        onClick={() => setCaseDropdownOpen(false)}
                      >
                        <FiFileText className="mr-2" />
                        Overview
                      </Link>
                      <Link 
                        href="/case/cause-list" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                        onClick={() => setCaseDropdownOpen(false)}
                      >
                        <FiList className="mr-2" />
                        Cause List
                      </Link>
                      <Link 
                        href="/case/current-hearings" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                        onClick={() => setCaseDropdownOpen(false)}
                      >
                        <FiHeadphones className="mr-2" />
                        Hearings
                      </Link>
                    </div>
                  )}
                </div>
                
                <NavLink href="/services" icon={FiSettings}>Services</NavLink>
                <NavLink href="/StartDispute" icon={FiShield}>Dispute</NavLink>
                <NavLink href="/contact" icon={FiMail}>Contact</NavLink>
                <NavLink href="/search" icon={IoSearchOutline}>Search</NavLink>
              </div>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <AiOutlineSun size={18} /> : <AiOutlineMoon size={18} />}
              </button>

              {!loginn ? (
                <>
                  <Link href="/login">
                    <button className="flex items-center px-3 py-1.5 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors text-sm whitespace-nowrap">
                      <FiLogIn className="mr-1.5" size={14} />
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="flex items-center px-3 py-1.5 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors text-sm whitespace-nowrap">
                      <FiUser className="mr-1.5" size={14} />
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <button 
                  onClick={logout} 
                  className="flex items-center px-3 py-1.5 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors text-sm whitespace-nowrap"
                >
                  <FiLogIn className="mr-1.5" size={14} />
                  LOGOUT
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
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
            <MobileNavLink href="/" onClick={closeMenu} icon={AiOutlineHome}>Home</MobileNavLink>
            <MobileNavLink href="/lawyer" onClick={closeMenu} icon={FiUsers}>Leadership</MobileNavLink>
            
            {/* Mobile Case Management Dropdown */}
            <div className="w-full">
              <button 
                onClick={toggleMobileCaseDropdown}
                className="flex items-center w-full text-gray-800 dark:text-gray-200 text-base font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6 whitespace-nowrap"
              >
                <MdOutlineManageSearch className="mr-3 text-lg" />
                <span>Case Management</span>
                {mobileCaseDropdownOpen ? (
                  <AiOutlineUp className="ml-auto" size={14} />
                ) : (
                  <AiOutlineDown className="ml-auto" size={14} />
                )}
              </button>
              
              {mobileCaseDropdownOpen && (
                <div className="w-full bg-gray-50 dark:bg-gray-800/50">
                  <MobileNavLink href="/case" onClick={closeMenu} icon={FiFileText}>Overview</MobileNavLink>
                  <MobileNavLink href="/case/cause-list" onClick={closeMenu} icon={FiList}>Cause List</MobileNavLink>
                  <MobileNavLink href="/case/current-hearings" onClick={closeMenu} icon={FiHeadphones}>Hearings</MobileNavLink>
                </div>
              )}
            </div>
            
            <MobileNavLink href="/services" onClick={closeMenu} icon={FiSettings}>Services</MobileNavLink>
            <MobileNavLink href="/StartDispute" onClick={closeMenu} icon={FiShield}>Dispute</MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMenu} icon={FiMail}>Contact</MobileNavLink>
            <MobileNavLink href="/search" onClick={closeMenu} icon={IoSearchOutline}>Search</MobileNavLink>

            <div className="flex items-center mt-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <AiOutlineSun size={22} /> : <AiOutlineMoon size={22} />}
              </button>
            </div>

            <div className="flex flex-col space-y-3 w-full max-w-xs mt-4 px-4">
              {!loginn ? (
                <>
                  <Link href="/login" className="w-full" onClick={closeMenu}>
                    <button className="flex items-center justify-center w-full px-4 py-2.5 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                      <FiLogIn className="mr-2" size={16} />
                      Login
                    </button>
                  </Link>
                  <Link href="/signup" className="w-full" onClick={closeMenu}>
                    <button className="flex items-center justify-center w-full px-4 py-2.5 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors whitespace-nowrap">
                      <FiUser className="mr-2" size={16} />
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }} 
                  className="flex items-center justify-center w-full px-4 py-2.5 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  <FiLogIn className="mr-2" size={16} />
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Add padding to prevent content from being hidden behind the fixed header */}
      <div className="h-16"></div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;