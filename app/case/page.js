"use client";
import React, { useState, useEffect } from "react";
import Header from "../header/page";
import { FaBalanceScale, FaHandshake, FaHome, FaUserInjured, FaBriefcaseMedical, FaGavel } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import Footer from "../footer/page";

const serviceData = [
  {
    title: "Criminal Defense",
    icon: <FaGavel className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "Comprehensive defense strategies for criminal charges including investigations, evidence analysis, and bail applications.",
    features: [
      "Felony and misdemeanor defense",
      "White collar crimes",
      "DUI/DWI cases",
      "Appeals process"
    ],
    stats: "98% case success rate"
  },
  {
    title: "Corporate Law",
    icon: <FaHandshake className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "End-to-end legal solutions for businesses including formation, compliance, contracts, and dispute resolution.",
    features: [
      "Mergers & acquisitions",
      "Corporate governance",
      "Contract drafting",
      "Regulatory compliance"
    ],
    stats: "500+ businesses served"
  },
  {
    title: "Family Law",
    icon: <MdFamilyRestroom className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "Compassionate representation for family matters including divorce, custody, and adoption cases.",
    features: [
      "Divorce mediation",
      "Child custody",
      "Prenuptial agreements",
      "Adoption services"
    ],
    stats: "20+ years experience"
  },
  {
    title: "Real Estate Law",
    icon: <FaHome className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "Full-service real estate legal support for transactions, disputes, and property development.",
    features: [
      "Title searches",
      "Closing services",
      "Landlord/tenant disputes",
      "Zoning issues"
    ],
    stats: "$2B+ in transactions"
  },
  {
    title: "Personal Injury",
    icon: <FaUserInjured className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "Aggressive representation for injury victims to secure maximum compensation for damages.",
    features: [
      "Auto accidents",
      "Workplace injuries",
      "Medical malpractice",
      "Wrongful death"
    ],
    stats: "$50M+ recovered"
  },
  {
    title: "Healthcare Law",
    icon: <FaBriefcaseMedical className="w-12 h-12 mx-auto mb-5 text-blue-600 dark:text-blue-400" />,
    description: "Specialized counsel for healthcare providers navigating complex regulatory environments.",
    features: [
      "HIPAA compliance",
      "Licensing issues",
      "Medical partnerships",
      "Fraud defense"
    ],
    stats: "100+ healthcare clients"
  }
];

const Services = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated underline */}
          <div className="text-center mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-medium mb-2 block">OUR PRACTICE AREAS</span>
            <h2 className="text-4xl font-bold mb-6 relative pb-2">
              Comprehensive Legal Services
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 dark:bg-blue-500"></span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Trusted legal counsel with proven results across all major practice areas
            </p>
          </div>

          {/* Stats Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">25+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Cases Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Client Support</div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-2 duration-300"
              >
                <div className="p-8">
                  {service.icon}
                  <h3 className="text-xl font-bold text-center mb-4 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-3 text-sm uppercase tracking-wider">Key Services</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{service.stats}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 px-8 py-4 border-t border-gray-200 dark:border-gray-600">
                  <a
                    href="/ConsultationPage"
                    className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
                  >
                    Consult Now
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need Specialized Legal Assistance?</h3>
              <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                Our team of experienced attorneys is ready to provide personalized solutions for your unique legal challenges.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://cal.com/settlesmart/schedule-meeting"
                  className="bg-white text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-200 font-medium px-8 py-3 rounded-md transition-colors duration-300"
                >
                  Schedule Consultation
                </a>
                <a
                  href="tel:+1234567890"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 font-medium px-8 py-3 rounded-md transition-colors duration-300"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now: +91 82890 28892
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default Services;