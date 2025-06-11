"use client";
import { useState, useEffect } from "react";
import { 
  AiOutlineMenu, 
  AiOutlineClose, 
  AiOutlineSun, 
  AiOutlineMoon, 
  AiOutlineDown, 
  AiOutlineUp,
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlineUser,
  AiOutlineDashboard
} from "react-icons/ai";
import { 
  FiUser, 
  FiLogIn, 
  FiLogOut,
  FiUsers,
  FiFileText,
  FiList,
  FiHeadphones,
  FiSettings,
  FiShield,
  FiMail,
  FiVideo
} from "react-icons/fi";
import { MdOutlineManageSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Logo from "@/app/assets/hello_logo.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [caseDropdownOpen, setCaseDropdownOpen] = useState(false);
  const [mobileCaseDropdownOpen, setMobileCaseDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const facultyToken = localStorage.getItem("facultytoken");
    const email = localStorage.getItem("userEmail");
    
    setIsLoggedIn(!!token || !!facultyToken);
    
    if (email) {
      setUserEmail(email);
    }
    
    if (token) {
      setUserType("client");
    } else if (facultyToken) {
      setUserType("faculty");
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
    document.body.style.overflow = menuOpen ? '' : 'hidden';
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

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleConferenceClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/facultylogin');
      return;
    }
    router.push('/conference');
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("facultytoken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    setUserType("");
    setProfileDropdownOpen(false);
    router.push('/facultylogin');
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (caseDropdownOpen) setCaseDropdownOpen(false);
      if (profileDropdownOpen) setProfileDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [caseDropdownOpen, profileDropdownOpen]);

  const NavLink = ({ href, children, onClick, icon: Icon }) => (
    <Link href={href} passHref onClick={onClick}>
      <motion.div 
        className="relative group whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 h-10">
          {Icon && (
            <motion.span 
              className="mr-2 text-base text-gray-700 dark:text-gray-300 opacity-70 group-hover:opacity-100 transition-opacity"
              whileHover={{ rotate: 10 }}
            >
              <Icon />
            </motion.span>
          )}
          <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-sm">
            {children}
          </span>
        </div>
        <motion.span 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-500"
          initial={{ width: 0 }}
          whileHover={{ width: '80%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );

  const MobileNavLink = ({ href, children, onClick, icon: Icon }) => (
    <Link href={href} passHref onClick={onClick}>
      <motion.div 
        className="flex items-center text-gray-800 dark:text-gray-200 text-base font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6 w-full whitespace-nowrap"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && <Icon className="mr-3 text-lg text-gray-800 dark:text-gray-200" />}
        <span>{children}</span>
      </motion.div>
    </Link>
  );

  return (
    <>
      <motion.header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-gray-900'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" passHref>
              <motion.div 
                className="flex-shrink-0 w-40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-full h-12">
                  <Image
                    src={Logo}
                    alt="Company Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center space-x-2">
                <NavLink href="/LawyerDashboard" icon={AiOutlineHome}>Dashboard</NavLink>
                <NavLink href={isLoggedIn ? "/conference" : "/facultylogin"} onClick={handleConferenceClick} icon={FiVideo}>Conference</NavLink>
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? (
                  <AiOutlineSun size={18} className="text-gray-300" />
                ) : (
                  <AiOutlineMoon size={18} className="text-gray-700" />
                )}
              </motion.button>

              {!isLoggedIn ? (
                <>
                  <Link href="/facultylogin" passHref>
                    <motion.button 
                      className="flex items-center px-4 py-2 rounded-lg bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50/80 dark:hover:bg-gray-800/90 transition-all duration-200 text-sm whitespace-nowrap relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiLogIn className="mr-2 text-amber-600 dark:text-amber-400" size={16} />
                      <span>Login</span>
                      <svg 
                        className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5 12h14m-7-7l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                  <Link href="/newfaculty" passHref>
                    <motion.button 
                      className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white font-medium hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 shadow-sm hover:shadow-amber-200/50 dark:hover:shadow-amber-700/30 transition-all duration-200 text-sm whitespace-nowrap relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiUser className="mr-2" size={16} />
                      <span>Sign Up</span>
                      <svg 
                        className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                </>
              ) : (
               <div className="relative">
  <motion.button
    onClick={toggleProfileDropdown}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <AiOutlineUser className="text-gray-700 dark:text-gray-300 text-lg" />
    <span className="sr-only">User profile</span>
  </motion.button>

  <AnimatePresence>
    {profileDropdownOpen && (
      <motion.div 
        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {userEmail || "Loading..."}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
            {userType} 
          </p>
        </div>
        
        <Link href="/details" passHref>
          <motion.div 
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
            whileHover={{ x: 5 }}
            onClick={() => setProfileDropdownOpen(false)}
          >
            <AiOutlineUser className="mr-2 text-gray-700 dark:text-gray-300" />
            Profile
          </motion.div>
        </Link>
        
        <Link href={userType === "client" ? "/LawyerDashboard" : "/"} passHref>
          <motion.div 
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
            whileHover={{ x: 5 }}
            onClick={() => setProfileDropdownOpen(false)}
          >
            <AiOutlineDashboard className="mr-2 text-gray-700 dark:text-gray-300" />
            Dashboard
          </motion.div>
        </Link>
        
        <motion.button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
          whileHover={{ x: 5 }}
        >
          <FiLogOut className="mr-2 text-gray-700 dark:text-gray-300" />
          Sign out
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
</div>
              )}
            </div>

            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {menuOpen ? (
                <AiOutlineClose size={22} className="text-amber-600 dark:text-amber-400" />
              ) : (
                <AiOutlineMenu size={22} className="text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
              style={{
                top: '4rem',
                height: 'calc(100vh - 4rem)',
              }}
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="flex flex-col items-center justify-start w-full h-full overflow-y-auto py-4">
                {isLoggedIn && (
                  <div className="flex items-center justify-center w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                        <AiOutlineUser className="text-gray-700 dark:text-gray-300 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {userEmail || "Loading..."}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                          {userType} 
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <MobileNavLink href="/LawyerDashboard" onClick={closeMenu} icon={AiOutlineHome}>Home</MobileNavLink>
                <MobileNavLink href={isLoggedIn ? "/conference" : "/facultylogin"} onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    closeMenu();
                    router.push('/facultylogin');
                  } else {
                    closeMenu();
                  }
                }} icon={FiVideo}>Conference</MobileNavLink>

                {isLoggedIn && (
                  <>
                    <MobileNavLink 
                      href={userType === "faculty" ? "/" : "/LawyerDashboard"} 
                      onClick={closeMenu} 
                      icon={AiOutlineDashboard}
                    >
                      Dashboard
                    </MobileNavLink>
                    <motion.button 
                      onClick={() => {
                        logout();
                        closeMenu();
                      }} 
                      className="flex items-center w-full text-gray-800 dark:text-gray-200 text-base font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-3 px-6 whitespace-nowrap"
                      whileHover={{ x: 5 }}
                    >
                      <FiLogOut className="mr-3 text-lg text-gray-800 dark:text-gray-200" />
                      <span>Sign Out</span>
                    </motion.button>
                  </>
                )}

                <div className="flex items-center mt-4">
                  <motion.button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {darkMode ? (
                      <AiOutlineSun size={22} className="text-gray-300" />
                    ) : (
                      <AiOutlineMoon size={22} className="text-gray-700" />
                    )}
                  </motion.button>
                </div>

                {!isLoggedIn && (
                  <div className="flex flex-col space-y-3 w-full max-w-xs mt-4 px-4">
                    <Link href="/facultylogin" className="w-full" onClick={closeMenu} passHref>
                      <motion.button 
                        className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiLogIn className="mr-2 text-amber-600 dark:text-amber-400" size={16} />
                        <span>Login</span>
                        <svg 
                          className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5 12h14m-7-7l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    </Link>
                    <Link href="/newfaculty" className="w-full" onClick={closeMenu} passHref>
                      <motion.button 
                        className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white font-medium hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 transition-colors whitespace-nowrap relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiUser className="mr-2" size={16} />
                        <span>Sign Up</span>
                        <svg 
                          className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-3 transition-all duration-300"
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16"></div>
    </>
  );
};
export default Header;