"use client"
import React from 'react'
import Header from '../header/page'
import Footer from '../footer/page'
import { FaBalanceScale, FaHandshake, FaUsers, FaComments, FaGavel } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Link from 'next/link'

const serviceData = [
  {
    title: "Arbitration",
    icon: <FaGavel className="text-4xl mb-4 text-blue-500" />,
    description: "Expert arbitration services for fair, binding resolutions outside court. Our seasoned arbitrators ensure impartial decisions in complex disputes.",
    color: "bg-blue-50"
  },
  {
    title: "Mediation",
    icon: <FaHandshake className="text-4xl mb-4 text-green-500" />,
    description: "Facilitated mediation to transform conflicts into agreements. We create safe spaces for dialogue and mutual understanding.",
    color: "bg-green-50"
  },
  {
    title: "Conciliation",
    icon: <FaUsers className="text-4xl mb-4 text-purple-500" />,
    description: "Non-confrontational conciliation that rebuilds relationships while resolving disputes with dignity and respect.",
    color: "bg-purple-50"
  },
  {
    title: "Negotiation",
    icon: <FaComments className="text-4xl mb-4 text-orange-500" />,
    description: "Strategic negotiation support to secure optimal outcomes in contracts, deals, and conflict resolution.",
    color: "bg-orange-50"
  },
  {
    title: "Legal Consultation",
    icon: <FaBalanceScale className="text-4xl mb-4 text-indigo-500" />,
    description: "Comprehensive legal guidance tailored to your unique situation, helping you navigate complex legal landscapes.",
    color: "bg-indigo-50"
  }
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const page = () => {
  return (
    <>
      <Header />
      <div className="services-page bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-20 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Expert Dispute Resolution Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl max-w-3xl mx-auto px-4"
          >
            Professional solutions tailored to your unique needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {serviceData.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`${service.color} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className="bg-white p-4 rounded-full shadow-md">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all">
                  Learn More
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        {/* CTA Section */}
<div className="bg-gray-100 py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Resolve Your Dispute?</h2>
    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      Contact us today for a confidential consultation about your specific needs.
    </p>
    <Link href="/ConsultationPage">
      <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
        Schedule Consultation
      </button>
    </Link>
  </div>
</div>
      </div>
      <Footer />
    </>
  )
}

export default page