"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data.json";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import Header from "../header/page";

const Lawyer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Custom arrow components
  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-10 h-10 ${
        darkMode ? 'bg-amber-500/10 hover:bg-amber-500/20' : 'bg-blue-600/10 hover:bg-blue-600/20'
      } ${darkMode ? 'text-white' : 'text-gray-900'} rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
    >
      {direction === "prev" ? (
        <span className="text-xl font-bold">&lt;</span>
      ) : (
        <span className="text-xl font-bold">&gt;</span>
      )}
    </button>
  );

  return (
    <>
      <Header />
      <div className={`relative bg-white dark:bg-gray-900 overflow-hidden min-h-screen`}>
        {/* Background Image - Similar to hero.js */}
        <div className="absolute inset-0 z-0">
          <img
            src={darkMode ? "/images/justice-india-dark.jpg" : "/images/justice-india-light.jpg"}
            alt="Legal System"
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${
            darkMode ? 'from-gray-900/80 via-gray-900/60 to-gray-900' 
                   : 'from-white/80 via-white/60 to-white'
          } backdrop-blur-sm`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className={`text-3xl sm:text-4xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } mb-12 pb-2 border-b-2 ${
            darkMode ? 'border-amber-500' : 'border-blue-600'
          } text-center`}>
            Dedicated Lawyers, Proven Results
          </h2>

          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8`}>
            <Carousel
              showArrows={true}
              showIndicators={true}
              showStatus={false}
              showThumbs={false}
              interval={5000}
              infiniteLoop={true}
              autoPlay={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && <CustomArrow direction="prev" onClick={onClickHandler} />
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && <CustomArrow direction="next" onClick={onClickHandler} />
              }
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <li
                  className={`inline-block w-3 h-3 mx-1 rounded-full cursor-pointer transition-all ${
                    isSelected ? (darkMode ? "bg-amber-500" : "bg-blue-600") + " scale-125" 
                             : (darkMode ? "bg-gray-500" : "bg-gray-300")
                  }`}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${index + 1}`}
                />
              )}
            >
              {data.projects.map((item) => (
                <div
                  key={item.title}
                  className={`w-full max-w-4xl mx-auto ${
                    darkMode ? 'bg-gray-700/90' : 'bg-white/90'
                  } rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}
                >
                  <div className="relative w-full max-w-3xl rounded-xl overflow-hidden mb-6">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-48 sm:h-56 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                    />
                  </div>

                  <div className="w-full text-center">
                    <h3 className={`text-xl sm:text-2xl font-serif font-bold ${
                      darkMode ? 'text-white group-hover:text-amber-400' 
                              : 'text-gray-900 group-hover:text-blue-600'
                    } mb-3 transition-colors`}>
                      {item.title}
                    </h3>
                    <p className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    } tracking-wider leading-relaxed mb-6 text-sm sm:text-base`}>
                      {item.description}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block ${
                        darkMode ? 'bg-amber-500 hover:bg-amber-600' 
                                : 'bg-blue-600 hover:bg-blue-700'
                      } text-white font-bold px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                    >
                      <span className="relative z-10">View Profile</span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </a>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex gap-4 mt-6">
                    {[
                      { icon: FaInstagram, color: darkMode ? 'hover:text-pink-500' : 'hover:text-pink-600' },
                      { icon: FaTwitter, color: darkMode ? 'hover:text-blue-400' : 'hover:text-blue-500' },
                      { icon: FaLinkedin, color: darkMode ? 'hover:text-blue-400' : 'hover:text-blue-700' },
                      { icon: FaFacebook, color: darkMode ? 'hover:text-blue-500' : 'hover:text-blue-600' }
                    ].map((SocialIcon, i) => (
                      <a
                        key={i}
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        } ${SocialIcon.color} transition-colors duration-300 hover:-translate-y-1`}
                        aria-label={`Social Media ${i}`}
                      >
                        <SocialIcon.icon className="text-xl sm:text-2xl" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer;