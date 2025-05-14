'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../header/page";
import Footer from "../footer/page";

// Icons
import { 
  Gavel, Handshake, Scale, BookOpen, FileText, 
  Mail, Phone, MapPin, UserCircle, Briefcase,
  Award, Clock, CheckCircle, XCircle 
} from 'lucide-react';

const JoinAsArbitrator = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    specialization: '',
    qualifications: '',
    whyJoin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        specialization: '',
        qualifications: '',
        whyJoin: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Using public image URLs
  const arbitratorHero = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const arbitrator1 = "https://images.unsplash.com/photo-1590086783191-a0694c7d1e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const arbitrator2 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const arbitrator3 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80";

  const benefits = [
    {
      icon: <Scale size={24} className="text-blue-600" />,
      title: "Professional Growth",
      description: "Expand your practice and gain recognition in alternative dispute resolution"
    },
    {
      icon: <Handshake size={24} className="text-blue-600" />,
      title: "Network Expansion",
      description: "Connect with legal professionals and high-profile clients nationwide"
    },
    {
      icon: <Award size={24} className="text-blue-600" />,
      title: "Credential Enhancement",
      description: "Add prestigious arbitration experience to your professional profile"
    },
    {
      icon: <Clock size={24} className="text-blue-600" />,
      title: "Flexible Engagements",
      description: "Choose cases that fit your schedule and area of expertise"
    }
  ];

  const requirements = [
    "Minimum 7 years of legal practice experience",
    "Specialized knowledge in one or more dispute resolution areas",
    "Certification in arbitration/mediation (preferred)",
    "Excellent communication and analytical skills",
    "Commitment to ethical dispute resolution practices"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden mb-20 h-96">
          <Image
            src={arbitratorHero}
            alt="Arbitration Professionals"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 flex items-center">
            <div className="max-w-2xl px-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Join Our <span className="text-blue-300">Elite Arbitration Panel</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                Become part of India's premier online dispute resolution platform and transform how justice is delivered
              </motion.p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full mb-6">
              <Gavel className="text-blue-600" size={24} />
              <span className="text-blue-600 font-medium">Why Join SettleSmart?</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for Our Arbitrators</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As a SettleSmart arbitrator, you'll enjoy professional advantages while contributing to accessible justice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Requirements + Form Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20" id="application">
          {/* Requirements */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Briefcase className="text-blue-600" size={24} />
                Arbitrator Requirements
              </h2>
              
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Our Arbitration Process</h3>
                <p className="text-blue-700 mb-4">
                  SettleSmart follows internationally recognized arbitration standards with our proprietary ODR enhancements
                </p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">1</span>
                    Digital case submission and documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">2</span>
                    Preliminary online mediation attempt
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">3</span>
                    Formal arbitration proceedings as needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">4</span>
                    Legally binding award issuance
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <UserCircle className="text-blue-600" size={24} />
                Arbitrator Application
              </h2>

              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="text-green-600 text-2xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-green-800 mb-2">Application Submitted!</h3>
                  <p className="text-green-600">
                    Thank you for your interest in joining our arbitration panel. Our team will review your application and contact you within 5-7 business days.
                  </p>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <XCircle className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-red-800 mb-2">Submission Failed</h3>
                  <p className="text-red-600">
                    There was an error submitting your application. Please try again or contact us directly.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your full legal name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+91 00000 00000"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Legal Experience*
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. 10 years"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                      Area(s) of Specialization*
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      required
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Commercial, Family, Property Law"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                      Relevant Qualifications*
                    </label>
                    <textarea
                      id="qualifications"
                      name="qualifications"
                      rows={3}
                      required
                      value={formData.qualifications}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Degrees, certifications, arbitration training"
                    />
                  </div>

                  <div>
                    <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to join our arbitration panel?*
                    </label>
                    <textarea
                      id="whyJoin"
                      name="whyJoin"
                      rows={4}
                      required
                      value={formData.whyJoin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Briefly explain your interest and relevant experience"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      By submitting this form, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hear From Our Arbitrators</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Professionals who have transformed their practice through SettleSmart's arbitration platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={arbitrator1}
                    alt="Adv. Priya Sharma"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adv. Priya Sharma</h4>
                  <p className="text-sm text-blue-600">Commercial Arbitration Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "SettleSmart's platform has allowed me to expand my arbitration practice beyond geographical limitations while maintaining the highest professional standards."
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={arbitrator2}
                    alt="Adv. Rajesh Verma"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adv. Rajesh Verma</h4>
                  <p className="text-sm text-blue-600">Property Dispute Arbitrator</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The case management tools and professional support make complex arbitration proceedings remarkably efficient and effective."
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={arbitrator3}
                    alt="Adv. Meena Kapoor"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Adv. Meena Kapoor</h4>
                  <p className="text-sm text-blue-600">Family Law Arbitrator</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Joining SettleSmart's panel has been transformative for my practice, providing access to meaningful cases with streamlined processes."
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Elevate Your Arbitration Practice?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Join India's fastest-growing online dispute resolution platform and make justice more accessible
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#application"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinAsArbitrator;