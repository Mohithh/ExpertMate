"use client";
import React, { useState, useEffect } from 'react';
import Header from '../header/page';
import Footer from '../footer/page';
import { FaBalanceScale, FaHandshake, FaUsers, FaComments, FaGavel, FaChevronDown, FaChevronUp, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const serviceData = [
  {
    title: "Arbitration",
    icon: <FaGavel className="text-4xl text-blue-500 dark:text-blue-400" />,
    shortDesc: "Expert arbitration services for fair, binding resolutions outside court.",
    longDesc: [
      "Legally binding resolutions without court litigation",
      "Experienced arbitrators with industry-specific knowledge",
      "Confidential proceedings to protect your reputation",
      "Typically resolves in 3-6 months (vs. 12-24 months in court)",
      "Enforceable awards under international law"
    ],
    color: "bg-blue-50 dark:bg-blue-900/30",
    features: ["Binding decisions", "40-60% cost savings", "Industry experts", "International enforcement"]
  },
  {
    title: "Mediation",
    icon: <FaHandshake className="text-4xl text-green-500 dark:text-green-400" />,
    shortDesc: "Facilitated mediation to transform conflicts into agreements.",
    longDesc: [
      "Neutral third-party facilitates constructive dialogue",
      "Non-binding but highly effective resolution method",
      "Preserves business relationships",
      "Typically completes in 1-3 sessions",
      "70% success rate in avoiding litigation"
    ],
    color: "bg-green-50 dark:bg-green-900/30",
    features: ["Preserves relationships", "Cost-effective", "Quick resolution", "Win-win solutions"]
  },
  {
    title: "Conciliation",
    icon: <FaUsers className="text-4xl text-purple-500 dark:text-purple-400" />,
    shortDesc: "Non-confrontational approach to rebuild relationships while resolving disputes.",
    longDesc: [
      "Informal and flexible process",
      "Conciliator actively proposes solutions",
      "Effective for ongoing business relationships",
      "Less formal than arbitration",
      "Confidential and private proceedings"
    ],
    color: "bg-purple-50 dark:bg-purple-900/30",
    features: ["Relationship-focused", "Flexible process", "Active facilitation", "Less adversarial"]
  },
  {
    title: "Negotiation",
    icon: <FaComments className="text-4xl text-orange-500 dark:text-orange-400" />,
    shortDesc: "Strategic negotiation support to secure optimal outcomes.",
    longDesc: [
      "Expert guidance through complex negotiations",
      "Preparation of negotiation strategies",
      "Contract review and analysis",
      "Representation in business deals",
      "Dispute prevention techniques"
    ],
    color: "bg-orange-50 dark:bg-orange-900/30",
    features: ["Strategic planning", "Contract expertise", "Risk assessment", "Value creation"]
  },
  {
    title: "Legal Consultation",
    icon: <FaBalanceScale className="text-4xl text-indigo-500 dark:text-indigo-400" />,
    shortDesc: "Comprehensive legal guidance tailored to your unique situation.",
    longDesc: [
      "Detailed case evaluation and analysis",
      "Clear explanation of legal options",
      "Risk assessment and mitigation strategies",
      "Document review and preparation",
      "Regulatory compliance guidance"
    ],
    color: "bg-indigo-50 dark:bg-indigo-900/30",
    features: ["Case evaluation", "Risk assessment", "Document review", "Ongoing support"]
  }
];

const ServicesPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    
    if (!token) {
      router.push('/login');
      return;
    }

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, [router]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-900 py-24 text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat opacity-20"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Expert Dispute Resolution Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            >
              Professional solutions tailored to your unique needs
            </motion.p>
          </div>
        </div>

        {/* Services Benefits Section */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Why Choose Our Services?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-lg">
                We provide comprehensive dispute resolution services with a proven track record of success.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Expertise", 
                    desc: "Our team has decades of combined experience in dispute resolution",
                    icon: <FaCheckCircle className="text-blue-500 text-4xl mx-auto mb-4" />
                  },
                  { 
                    title: "Confidentiality", 
                    desc: "All proceedings are completely private and confidential",
                    icon: <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                  },
                  { 
                    title: "Efficiency", 
                    desc: "Resolve disputes faster than traditional court processes",
                    icon: <FaCheckCircle className="text-purple-500 text-4xl mx-auto mb-4" />
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                    {item.icon}
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
          >
            Our Comprehensive Services
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
            Explore our range of professional dispute resolution services designed to meet your specific needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${service.color} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
                style={{
                  minHeight: expandedCard === index ? '580px' : '380px',
                  transition: 'min-height 0.3s ease'
                }}
              >
                <div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md inline-block mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{service.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.shortDesc}</p>
                </div>

                {/* Expandable Content */}
                <div className="overflow-hidden flex-grow">
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h3 className="font-semibold mb-3 dark:text-white text-lg">Service Details:</h3>
                          <ul className="list-disc pl-5 mb-6 space-y-2">
                            {service.longDesc.map((item, i) => (
                              <li key={i} className="text-gray-700 dark:text-gray-300">{item}</li>
                            ))}
                          </ul>
                          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3 dark:text-white">Key Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, i) => (
                                <span 
                                  key={i} 
                                  className="px-3 py-1 bg-white dark:bg-gray-700 text-sm rounded-full shadow-sm dark:text-gray-200"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-auto space-y-3 pt-4">
                  <button 
                    onClick={() => toggleCard(index)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all flex items-center justify-center gap-2 w-full font-medium"
                  >
                    {expandedCard === index ? (
                      <>
                        <FaChevronUp /> Show Less
                      </>
                    ) : (
                      <>
                        <FaChevronDown /> Learn More
                      </>
                    )}
                  </button>
                  <Link href="https://cal.com/settlesmart/schedule-meeting" passHref legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all flex items-center justify-center gap-2 w-full font-medium">
                        <FaCalendarAlt /> Book Now
                      </button>
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Immediate Action Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 py-20">
          <div className="container mx-auto px-4 text-center max-w-7xl">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Select a service above to book a consultation or learn more about our dispute resolution options.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Back to Top
              </button>
              <Link href="/" passHref legacyBehavior>
                <a>
                  <button className="px-8 py-3 bg-indigo-700 text-white rounded-lg text-lg font-semibold hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Go to Dashboard
                  </button>
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default ServicesPage;