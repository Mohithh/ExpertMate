"use client";
import React from "react";
import Header from "../header/page";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FaHandshake, FaSearch, FaChess, FaPlay } from "react-icons/fa";

const Services = () => {
    const router = useRouter();

    
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
  
      // Example: If no token, redirect to login
      if (!token) {
        router.push('/login');
      }
    }, []);
  

  
  
  return (
    
    <>
      <Header />
      <section id="services" className="w-full min-h-screen bg-white text-gray-900 overflow-hidden relative py-20 px-8">
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Section title */}
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium mb-2 block">OUR APPROACH</span>
            <h2 className="text-4xl font-bold mb-4 relative pb-2 mx-auto w-fit">
              Our Legal Process
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach to ensure the best possible outcome for your case
            </p>
          </div>

          {/* Video section */}
          <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="relative rounded-xl shadow-lg overflow-hidden group">
              <iframe
                className="w-full h-[400px] transition-all duration-300 group-hover:shadow-xl"
                src="https://www.youtube.com/embed/_sI_Ps7JSEk"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-blue-600/90 text-white p-4 rounded-full">
                  <FaPlay className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Process steps */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-8 relative">
              {/* Vertical line */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-blue-200 z-10 md:left-8 sm:left-6"></div>

              {/* Step 1 */}
              <div className="flex items-center gap-8 bg-white border border-gray-200 p-8 rounded-xl shadow-md relative z-20 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 md:gap-6 md:p-6 sm:gap-4 sm:p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 md:w-14 md:h-14 sm:w-12 sm:h-12">
                    <FaHandshake className="w-8 h-8 md:w-7 md:h-7 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mr-3">Step 1</span>
                    <h4 className="text-2xl font-semibold text-gray-900 md:text-xl sm:text-lg">
                      Initial Consultation
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600 md:text-sm">
                    Our experienced lawyers thoroughly analyze the facts of each case. They then apply the relevant laws to provide clear and actionable advice.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free 30-minute consultation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Confidential case review</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-8 bg-white border border-gray-200 p-8 rounded-xl shadow-md relative z-20 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 md:gap-6 md:p-6 sm:gap-4 sm:p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 md:w-14 md:h-14 sm:w-12 sm:h-12">
                    <FaSearch className="w-8 h-8 md:w-7 md:h-7 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mr-3">Step 2</span>
                    <h4 className="text-2xl font-semibold text-gray-900 md:text-xl sm:text-lg">
                      Case Evaluation
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600 md:text-sm">
                    We prioritize understanding your concerns and aligning with your goals. Your satisfaction is our top priority as we assess the strengths and challenges of your case.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Comprehensive legal analysis</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Risk assessment and strategy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-8 bg-white border border-gray-200 p-8 rounded-xl shadow-md relative z-20 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 md:gap-6 md:p-6 sm:gap-4 sm:p-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 md:w-14 md:h-14 sm:w-12 sm:h-12">
                    <FaChess className="w-8 h-8 md:w-7 md:h-7 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mr-3">Step 3</span>
                    <h4 className="text-2xl font-semibold text-gray-900 md:text-xl sm:text-lg">
                      Legal Strategy
                    </h4>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600 md:text-sm">
                    We develop a customized plan tailored to your unique situation. Our strategy is designed to protect your rights and achieve the best possible outcome.
                  </p>
                  <div className="mt-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Customized action plan</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Regular progress updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-12 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Legal Journey?</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Schedule your free initial consultation today and take the first step toward resolving your legal matter.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-md transition-colors duration-300 text-lg"
                >
                  Book Consultation
                </a>
                <a
                  href="tel:+1234567890"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium px-8 py-4 rounded-md transition-colors duration-300 text-lg"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now: (123) 456-7890
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;