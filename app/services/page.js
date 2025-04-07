"use client"
import React from "react";
import Header from "../header/page";

const Services = () => {
  return (
    <>
    <Header />
    <section id="services" className="w-full min-h-screen bg-black text-white overflow-hidden relative py-32 px-8">
     
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,215,0,0.1)_0%,rgba(0,0,0,0.8)_70%)]"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section title */}
        <h2 className="text-4xl font-bold text-center mx-auto mb-16 pb-2 border-b-2 border-yellow-500 w-fit animate-fadeInDown">
          Work Process
        </h2>

        {/* Video section */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <iframe
            className="w-full h-[400px] rounded-xl shadow-lg shadow-yellow-500/10 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
            src="https://www.youtube.com/embed/_sI_Ps7JSEk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Process steps */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 relative">
            {/* Vertical line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-yellow-500 z-10 md:left-8 sm:left-6"></div>

            {/* Step 1 */}
            <div className="flex items-center gap-6 bg-gray-900/90 p-6 rounded-xl shadow-lg shadow-yellow-500/10 relative z-20 hover:-translate-y-2.5 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 md:gap-4 md:p-4 sm:gap-3 sm:p-3">
              <div className="step-icon">
                <img
                  src="https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/process-1-icon-1.svg"
                  alt="Initial Consultation"
                  className="w-16 h-16 brightness-80 hover:brightness-100 transition-all duration-300 md:w-12 md:h-12 sm:w-10 sm:h-10"
                />
              </div>
              <div className="step-content">
                <h4 className="text-2xl font-semibold text-yellow-500 mb-2 hover:text-yellow-600 transition-colors duration-300 md:text-xl sm:text-lg">
                  Initial Consultation
                </h4>
                <p className="text-base leading-relaxed text-white/80 hover:text-white transition-colors duration-300 md:text-sm sm:text-xs">
                  Our experienced lawyers thoroughly analyze the facts of each case. They then apply the relevant laws to provide clear and actionable advice.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-6 bg-gray-900/90 p-6 rounded-xl shadow-lg shadow-yellow-500/10 relative z-20 hover:-translate-y-2.5 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 md:gap-4 md:p-4 sm:gap-3 sm:p-3">
              <div className="step-icon">
                <img
                  src="https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/process-1-icon-2.svg"
                  alt="Case Evaluation"
                  className="w-16 h-16 brightness-80 hover:brightness-100 transition-all duration-300 md:w-12 md:h-12 sm:w-10 sm:h-10"
                />
              </div>
              <div className="step-content">
                <h4 className="text-2xl font-semibold text-yellow-500 mb-2 hover:text-yellow-600 transition-colors duration-300 md:text-xl sm:text-lg">
                  Case Evaluation
                </h4>
                <p className="text-base leading-relaxed text-white/80 hover:text-white transition-colors duration-300 md:text-sm sm:text-xs">
                  We prioritize understanding your concerns and aligning with your goals. Your satisfaction is our top priority as we assess the strengths and challenges of your case.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-6 bg-gray-900/90 p-6 rounded-xl shadow-lg shadow-yellow-500/10 relative z-20 hover:-translate-y-2.5 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 md:gap-4 md:p-4 sm:gap-3 sm:p-3">
              <div className="step-icon">
                <img
                  src="https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/process-1-icon-3.svg"
                  alt="Legal Strategy"
                  className="w-16 h-16 brightness-80 hover:brightness-100 transition-all duration-300 md:w-12 md:h-12 sm:w-10 sm:h-10"
                />
              </div>
              <div className="step-content">
                <h4 className="text-2xl font-semibold text-yellow-500 mb-2 hover:text-yellow-600 transition-colors duration-300 md:text-xl sm:text-lg">
                  Legal Strategy
                </h4>
                <p className="text-base leading-relaxed text-white/80 hover:text-white transition-colors duration-300 md:text-sm sm:text-xs">
                  We develop a customized plan tailored to your unique situation. Our strategy is designed to protect your rights and achieve the best possible outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Services;