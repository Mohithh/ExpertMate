"use client"
import React, { useState } from 'react'
import Header from '../header/page'
import Footer from '../footer/page'

const CareerPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const currentOpenings = [
    {
      id: 1,
      title: "Associate Attorney",
      location: "New Delhi",
      type: "Full-time",
      department: "Litigation",
      description: "We are seeking a motivated Associate Attorney with 2-5 years of experience in corporate law to join our growing team.",
      responsibilities: [
        "Represent clients in court or before government agencies",
        "Conduct legal research and analysis",
        "Draft and review legal documents"
      ]
    },
    {
      id: 2,
      title: "Senior Paralegal",
      location: "Remote/Hybrid",
      type: "Full-time",
      department: "Corporate",
      description: "Looking for an experienced paralegal with strong research and organizational skills to support our corporate team.",
      responsibilities: [
        "Maintain and organize case files",
        "Conduct legal research",
        "Prepare legal documents"
      ]
    },
    {
      id: 3,
      title: "Legal Intern",
      location: "New Delhi",
      type: "Internship",
      department: "All Departments",
      description: "Law students are invited to apply for our internship program to gain hands-on experience in various practice areas.",
      responsibilities: [
        "Assist attorneys with case preparation",
        "Attend client meetings and court proceedings",
        "Conduct legal research"
      ]
    }
  ];

  const filteredJobs = activeTab === 'all' 
    ? currentOpenings 
    : currentOpenings.filter(job => job.type.toLowerCase() === activeTab);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section with Animation */}
        <section className={`text-center py-16 px-4 rounded-2xl mb-16 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Build Your <span className="text-blue-600">Legal Career</span> at SettleSmart
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our team of dedicated legal professionals committed to delivering exceptional results from our New Delhi headquarters.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
          >
            View Open Positions
          </button>
        </section>

        {/* Stats Section */}
        <section className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-sm font-medium">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-sm font-medium">Cases Handled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-sm font-medium">Practice Areas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-sm font-medium">Client Satisfaction</div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-blue-600">Work Culture</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborative Environment</h3>
              <p>We believe in teamwork and open communication across all levels of the firm.</p>
            </div>
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Development</h3>
              <p>Regular training sessions and mentorship programs to help you grow.</p>
            </div>
            <div className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
              <p>Flexible hours and hybrid options to maintain a healthy balance.</p>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section id="openings" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Current <span className="text-blue-600">Openings</span></h2>
          
          {/* Job Filter Tabs */}
          <div className={`flex justify-center mb-8 p-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {['all', 'full-time', 'internship'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all ${activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-300'}`}
              >
                {tab === 'all' ? 'All Positions' : tab === 'full-time' ? 'Full-time' : 'Internships'}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.type}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'}`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap mt-4 md:mt-0">
                    Apply Now
                  </button>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Job Description:</h4>
                  <p className="mb-4">{job.description}</p>
                  
                  <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-6">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
          <div>
            <h2 className="text-3xl font-bold mb-6">How to Apply</h2>
            <p className="mb-6">Ready to join our team? Follow these simple steps to submit your application:</p>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Click on the "Apply Now" button for your desired position</li>
              <li>Fill out the application form with your details</li>
              <li>Upload your resume and cover letter</li>
              <li>Submit your application</li>
            </ol>
            <p className="mt-6 italic">We review applications on a rolling basis and will contact qualified candidates for interviews.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Our HR Team</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-blue-600">+91 6392609366</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-blue-600">settlesmartsolutions01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office Address</h3>
                  <p>Avanta Business Centre, Barakhamba Road,<br />Connaught Place, New Delhi - 110001</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our <span className="text-blue-600">Team Says</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                ,
              {
                name: "Nageshwar Singh",
                role: "Founder & Chief Managing Director",
                quote: "Founder & Chief Managing Director at SettleSmart Solutions; Legal Intern at Khaitan & Co., LK & S, Reliance Retail Ltd. (Legal), H.K. Law Offices, Trilegal and the Ministry of External Affairs, Government of India.",
                years: "1 years at SettleSmart"
              },
              {
                name: "Rudra N. Zadu",
                role: "Board of Directors & Head of ODR",
                quote: "Corporate law maestro with a decade of experience steering complex M&A and private equity transactions. Certified expert in cyber and energy laws, Rudra brings surgical precision to corporate dispute resolution.",
                years: "2 years at SettleSmart"
            },
              {
                name: "Amit Kumar Sharma",
                role: "Board of Directors & Head of ODR",
                quote: "Tax litigation specialist with a razor-sharp understanding of fiscal regulations. Known for his landmark victories in complex tax disputes, Amit brings strategic depth to our commercial ODR practice. His dual expertise in corporate law and taxation creates unique synergies for SettleSmart's high-value dispute clients.",
                years: "3 years at SettleSmart"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm text-blue-600">{testimonial.years}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  )
}

export default CareerPage