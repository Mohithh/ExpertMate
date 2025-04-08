'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap
} from "react-icons/fa";
import { GiScaleMail } from "react-icons/gi";
import { motion } from "framer-motion";
import Header from "../header/page";
import Image from "next/image";

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState("management");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const teamData = {
    management: [
      {
        id: 1,
        name: "Nageshwar Singh",
        title: "Founder & Managing Director",
        image: "",
        experience: "",
        education: "BLLB Chandigarh University",
        role: "Strategic leadership and firm governance",
        location: "New Delhi",
        phone: "+91 91499 45265",
        email: "choudharyyuvan8@gmail.com",
        description: "Legal Acumen & Experiential Scholar || Author || Corporate & Financial Laws || Former Intern at Khaitan & Co., LK & S, Reliance Retail Ltd.(Legal), Trilegal."
      }
    ],
    advocates: [
      {
        id: 1,
        name: "Adv. Rajesh Verma",
        title: "Senior Partner - Litigation",
        image: "/team/advocate-1.jpg",
        experience: "18 years at Supreme Court & High Courts",
        education: "LL.B, Campus Law Centre, Delhi University",
        practiceAreas: ["Commercial Litigation", "Arbitration"],
        location: "New Delhi",
        phone: "+91 98765 43211",
        email: "r.verma@settlesmart.com",
        description: "Leads our litigation practice with over 200 cases argued before superior courts. Known for meticulous case preparation and persuasive advocacy."
      },
      {
        id: 2,
        name: "Adv. Priya Sharma",
        title: "Partner - Corporate Law",
        image: "/team/advocate-2.jpg",
        experience: "15 years in corporate transactions",
        education: "LL.M, Harvard Law School",
        practiceAreas: ["M&A", "Private Equity", "Compliance"],
        location: "Mumbai",
        phone: "+91 98765 43212",
        email: "p.sharma@settlesmart.com",
        description: "Heads our corporate practice, advising Fortune 500 companies and startups on complex transactions and regulatory matters."
      }
    ],
    leadership: [
      {
        id: 1,
        name: "Rudra N. Zadu",
        title: "Chief Legal Officer",
        image: "/team/rudra-zadu.jpg",
        experience: "20 years in legal operations",
        education: "LL.M, University of Oxford",
        role: "Legal strategy and risk management",
        location: "Bangalore",
        phone: "+91 98765 43213",
        email: "r.zadu@settlesmart.com",
        description: "Oversees all legal operations, ensuring the highest standards of practice and ethical compliance across our offices."
      },
      {
        id: 2,
        name: "Aman Bhatti",
        title: "Chief Technology Officer",
        image: "/team/aman-bhatti.jpg",
        experience: "12 years in legal technology",
        education: "M.Tech, IIT Delhi",
        role: "Legal tech innovation",
        location: "Hyderabad",
        phone: "+91 98765 43214",
        email: "a.bhatti@settlesmart.com",
        description: "Pioneers our legal tech initiatives, developing proprietary tools for case management and client collaboration."
      }
    ],
    board: [
      {
        id: 1,
        name: "Amit Sharma",
        title: "Chairman",
        image: "/team/amit-sharma.jpg",
        experience: "35 years in corporate governance",
        education: "MBA, IIM Ahmedabad",
        role: "Board governance and strategic oversight",
        tenure: "Board member since 2010",
        description: "Practising Lawyer at J&K High Court."
      },
      {
        id: 2,
        name: "Pankaj Rishi Krishnan",
        title: "Independent Director",
        image: "/team/pankaj-rishi.jpg",
        experience: "30 years in finance and investments",
        education: "CA, CFA",
        role: "Financial strategy and risk assessment",
        tenure: "Board member since 2015",
        description: "Seasoned financial expert who guides our firm's fiscal strategy and growth initiatives."
      }
    ]
  };

  const tabs = [
    { id: "management", name: "Management" },
    { id: "advocates", name: "Advocates" },
    { id: "leadership", name: "Leadership" },
    { id: "board", name: "Board of Directors" }
  ];

  const CustomArrow = ({ direction, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-blue-600/30 hover:bg-blue-600/40 text-blue-600 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
    >
      <span className="text-xl font-bold">
        {direction === "prev" ? "←" : "→"}
      </span>
    </motion.button>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
          />
          <p className="text-lg font-medium text-gray-600">
            Loading our legal team...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <GiScaleMail className="text-3xl text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Our Legal Leadership
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
  Settle Smart&apos;s team combines decades of experience with innovative approaches to deliver exceptional legal solutions.
</p>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16 px-4"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Carousel
            showArrows
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && <CustomArrow direction="prev" onClick={onClickHandler} />
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && <CustomArrow direction="next" onClick={onClickHandler} />
            }
            className="max-w-7xl mx-auto"
          >
            {teamData[activeTab].map((member) => (
              <div
                key={member.id}
                className="p-6 md:p-8 rounded-2xl bg-white shadow-xl mx-2 md:mx-4 border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image Column */}
                  <div className="w-full lg:w-1/3 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={280}
                        height={280}
                        className="object-cover rounded-lg shadow-md border-4 border-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium">
                          {member.title}
                        </span>
                      </div>
                    </motion.div>

                    {/* Contact Options */}
                    <div className="flex gap-4 mt-6">
                      <a 
                        href={`tel:${member.phone}`} 
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                        title="Call"
                      >
                        <FaPhone className="mr-2 text-blue-600" />
                        Contact
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        title="Email"
                      >
                        <FaEnvelope className="mr-2" />
                        Email
                      </a>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="w-full lg:w-2/3">
                    <div className="flex flex-col h-full">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                          {member.name}
                        </h2>
                        <p className="text-lg mb-4 text-blue-600 font-medium">
                          {member.title}
                        </p>

                        <p className="mb-6 text-gray-600 leading-relaxed">
                          {member.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start">
                            <FaBriefcase className="text-blue-600 mt-1 mr-2" />
                            <div>
                              <p className="font-medium text-gray-800">Experience</p>
                              <p className="text-gray-600">{member.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FaGraduationCap className="text-blue-600 mt-1 mr-2" />
                            <div>
                              <p className="font-medium text-gray-800">Education</p>
                              <p className="text-gray-600">{member.education}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <GiScaleMail className="text-blue-600 mt-1 mr-2" />
                            <div>
                              <p className="font-medium text-gray-800">
                                {member.practiceAreas ? "Practice Areas" : "Role"}
                              </p>
                              <p className="text-gray-600">
                                {member.practiceAreas ? member.practiceAreas.join(", ") : member.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2" />
                            <div>
                              <p className="font-medium text-gray-800">Location</p>
                              <p className="text-gray-600">{member.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 border-t pt-4 border-gray-200">
                          <motion.a
                            whileHover={{ y: -2 }}
                            href="#"
                            className="text-lg text-gray-600 hover:text-blue-700 transition-colors"
                            aria-label="Connect on LinkedIn"
                          >
                            <FaLinkedin />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </motion.div>

        {/* Firm Description */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Settle Smart Legal Solutions</h2>
          <p className="text-gray-600 leading-relaxed">
  Founded in 2005, Settle Smart has grown into one of India&apos;s most respected full-service law firms.
  Our team of 50+ legal professionals operates across six major cities, delivering strategic counsel
  and exceptional representation to clients ranging from Fortune 500 companies to individual entrepreneurs.
</p>
        </motion.section>
      </main>
    </div>
  );
};

export default TeamPage;