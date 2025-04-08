'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data.json";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaRegStar, FaAward } from "react-icons/fa";
import { GiScaleMail, GiJusticeStar } from "react-icons/gi";
import Header from "../header/page";

const Lawyer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Filter lawyers by practice area
  const filteredLawyers = activeTab === 'all' 
    ? data.projects 
    : data.projects.filter(lawyer => lawyer.practiceAreas?.includes(activeTab));

  // Custom arrow components
  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 ${
        darkMode ? 'bg-amber-500/20 hover:bg-amber-500/30' : 'bg-blue-600/20 hover:bg-blue-600/30'
      } ${darkMode ? 'text-amber-400' : 'text-blue-600'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
    >
      {direction === "prev" ? (
        <span className="text-2xl font-bold">&lt;</span>
      ) : (
        <span className="text-2xl font-bold">&gt;</span>
      )}
    </button>
  );

  // Practice areas data
  const practiceAreas = [
    { id: 'all', name: 'All Attorneys' },
    { id: 'corporate', name: 'Corporate Law' },
    { id: 'family', name: 'Family Law' },
    { id: 'criminal', name: 'Criminal Defense' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'immigration', name: 'Immigration' }
  ];

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <FaStar key={i} className="text-amber-400 inline-block" /> : 
        <FaRegStar key={i} className="text-gray-300 dark:text-gray-500 inline-block" />
      );
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className={`relative bg-white dark:bg-gray-900 overflow-hidden min-h-screen`}>
        {/* Background Image */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-blue-100 dark:bg-amber-500/20 text-blue-600 dark:text-amber-400">
              <GiJusticeStar className="mr-2" />
              <span className="font-medium">SettleSmart Solutions</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4 leading-tight`}>
              Meet Our <span className={darkMode ? "text-amber-400" : "text-blue-600"}>Legal Experts</span>
            </h1>
            <p className={`max-w-3xl mx-auto text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our team of experienced attorneys is dedicated to providing exceptional legal services tailored to your unique needs.
            </p>
          </div>

          {/* Practice Area Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {practiceAreas.map(area => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === area.id 
                    ? darkMode 
                      ? 'bg-amber-500 text-white shadow-lg' 
                      : 'bg-blue-600 text-white shadow-lg'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 ${
            darkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-md rounded-xl shadow-lg p-6`}>
            <div className="text-center p-4">
              <div className={`text-3xl font-bold ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              } mb-2`}>50+</div>
              <div className={`text-sm uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Years Combined</div>
            </div>
            <div className="text-center p-4">
              <div className={`text-3xl font-bold ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              } mb-2`}>1000+</div>
              <div className={`text-sm uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Cases Handled</div>
            </div>
            <div className="text-center p-4">
              <div className={`text-3xl font-bold ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              } mb-2`}>95%</div>
              <div className={`text-sm uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className={`text-3xl font-bold ${
                darkMode ? 'text-amber-400' : 'text-blue-600'
              } mb-2`}>24/7</div>
              <div className={`text-sm uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Availability</div>
            </div>
          </div>

          {/* Attorneys Carousel */}
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-16`}>
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-8 pb-2 border-b-2 ${
              darkMode ? 'border-amber-500' : 'border-blue-600'
            } text-center`}>
              {activeTab === 'all' ? 'Our Legal Team' : `${practiceAreas.find(a => a.id === activeTab)?.name} Specialists`}
            </h2>

            {filteredLawyers.length > 0 ? (
              <Carousel
                showArrows={true}
                showIndicators={true}
                showStatus={false}
                showThumbs={false}
                interval={6000}
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
                {filteredLawyers.map((lawyer) => (
                  <div
                    key={lawyer.title}
                    className={`w-full max-w-4xl mx-auto ${
                      darkMode ? 'bg-gray-700/90' : 'bg-white/90'
                    } rounded-xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row gap-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}
                  >
                    <div className="relative w-full md:w-1/3 rounded-xl overflow-hidden">
                      <img
                        src={lawyer.imgSrc}
                        alt={lawyer.title}
                        loading="lazy"
                        className="w-full h-64 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                      {lawyer.isPartner && (
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                          darkMode ? 'bg-amber-500 text-gray-900' : 'bg-blue-600 text-white'
                        } flex items-center`}>
                          <GiScaleMail className="mr-1" /> Partner
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-2xl sm:text-3xl font-serif font-bold ${
                          darkMode ? 'text-white group-hover:text-amber-400' 
                                  : 'text-gray-900 group-hover:text-blue-600'
                        } transition-colors`}>
                          {lawyer.title}
                        </h3>
                        <div className="flex items-center">
                          {renderStars(lawyer.rating || 5)}
                        </div>
                      </div>

                      <div className={`mb-4 font-medium ${
                        darkMode ? 'text-amber-400' : 'text-blue-600'
                      }`}>{lawyer.position || "Senior Attorney"}</div>

                      <p className={`${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      } tracking-wider leading-relaxed mb-6`}>
                        {lawyer.description}
                      </p>

                      {/* Practice Areas */}
                      <div className="mb-6">
                        <h4 className={`font-bold mb-2 ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Practice Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(lawyer.practiceAreas || ['Corporate Law', 'Litigation']).map((area, i) => (
                            <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                              darkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-blue-800'
                            }`}>{area}</span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div className="flex items-center">
                          <FaPhone className="mr-2 opacity-70" />
                          <span>{lawyer.phone || "+1 (555) 123-4567"}</span>
                        </div>
                        <div className="flex items-center">
                          <FaEnvelope className="mr-2 opacity-70" />
                          <span>{lawyer.email || "contact@settlesmart.com"}</span>
                        </div>
                        <div className="flex items-center sm:col-span-2">
                          <FaMapMarkerAlt className="mr-2 opacity-70" />
                          <span>{lawyer.location || "New Delhi, India"}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={lawyer.url || "#contact"}
                          className={`flex-1 min-w-[150px] text-center ${
                            darkMode ? 'bg-amber-500 hover:bg-amber-600' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                          } text-white font-bold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                        >
                          <span className="relative z-10">Contact Now</span>
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        </a>
                        <a
                          href={lawyer.profileUrl || "#profile"}
                          className={`flex-1 min-w-[150px] text-center ${
                            darkMode ? 'bg-gray-600 hover:bg-gray-500' 
                                    : 'bg-gray-200 hover:bg-gray-300'
                          } ${darkMode ? 'text-white' : 'text-gray-800'} font-bold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                          View Full Profile
                        </a>
                      </div>

                      {/* Social Media Icons */}
                      <div className="flex gap-4 mt-6">
                        {[
                          { icon: FaLinkedin, color: darkMode ? 'hover:text-blue-400' : 'hover:text-blue-700' },
                          { icon: FaTwitter, color: darkMode ? 'hover:text-blue-400' : 'hover:text-blue-500' },
                          { icon: FaInstagram, color: darkMode ? 'hover:text-pink-500' : 'hover:text-pink-600' },
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
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className={`text-center py-12 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p className="text-xl mb-4">No attorneys found in this practice area.</p>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2 rounded-full font-medium ${
                    darkMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  View All Attorneys
                </button>
              </div>
            )}
          </div>

          {/* Testimonials Section */}
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-16`}>
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-8 pb-2 border-b-2 ${
              darkMode ? 'border-amber-500' : 'border-blue-600'
            } text-center`}>
              Client Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-700/90' : 'bg-white/90'
                } shadow-md hover:shadow-lg transition-shadow`}>
                  <div className="flex mb-4">
                    {renderStars(5)}
                  </div>
                  <p className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } mb-4 italic`}>
                    "SettleSmart Solutions provided exceptional legal representation during my difficult divorce. Their attention to detail and compassionate approach made all the difference."
                  </p>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-200'
                    } mr-4`}></div>
                    <div>
                      <h4 className={`font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>Rahul Sharma</h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Family Law Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`text-center ${
            darkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-md rounded-2xl shadow-xl p-8`}>
            <h2 className={`text-3xl sm:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            } mb-4`}>
              Ready to Discuss Your Case?
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-8`}>
              Contact us today for a free initial consultation with one of our experienced attorneys.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className={`px-8 py-4 rounded-lg font-bold ${
                  darkMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                } text-white shadow-lg hover:shadow-xl transition-all`}
              >
                Schedule a Consultation
              </a>
              <a
                href="tel:+911234567890"
                className={`px-8 py-4 rounded-lg font-bold ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } ${darkMode ? 'text-white' : 'text-gray-800'} shadow-lg hover:shadow-xl transition-all flex items-center`}
              >
                <FaPhone className="mr-2" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lawyer;