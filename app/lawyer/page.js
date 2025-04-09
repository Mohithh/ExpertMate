'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Amit from "@/app/assets/amit.png";
import Rudra from "@/app/assets/rudra.png";
// import PankajRishi from "@/app/assets/pankaj-rishi.jpg";
// import c from "@/app/assets/harsha-anand.jpg";
// import AmitSharma from "@/app/assets/amit-sharma.jpg";

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
        name: "Adv. Pankaj Rishi Krishnan",
        title: "Board of Directors & Head—ODR/Dispute Resolution (Civil, Matrimonial & Property Matters)",
        image: "",
        experience: "Supreme Court of India, Delhi HC, Punjab & Haryana HC, NGT, NCLAT, NCDRC & AFT",
        education: "B.S., M.S., LL.B., LL.M., PGD in ADR, Diploma in Constitutional Law (DCL), and Intellectual Property Rights (DIPR)",
        practiceAreas: ["Civil Litigation", "Matrimonial Disputes", "Property Matters", "Criminal Law"],
        location: "New Delhi",
        phone: "+91 XXXXX XXXXX",
        email: "pankaj.krishnan@settlesmart.com",
        description: "Distinguished Supreme Court lawyer and legal research scholar with vast experience across premier legal forums. Professor of criminal & constitutional law for State PCS and UPSC civil services aspirants. Known for precision in legal drafting and thorough research."
      },
      {
        id: 2,
        name: "Adv. Harsha Sharma & Adv. Anand Dubey",
        title: "Founders & Partners – Konrad Legal LLP | Heads – ODR & Dispute Resolution",
        image: "",
        experience: "PAN-India practice before Supreme Court, High Courts, trial courts, tribunals",
        education: "LL.B. (Delhi University) & LL.M. (Business Law)",
        practiceAreas: ["ADR", "Labour & Employment", "Consumer Disputes", "Debt Recovery", "Service Matters", "MV Accident Claims"],
        location: "New Delhi",
        phone: "+91 XXXXX XXXXX",
        email: "odr-team@settlesmart.com",
        description: "Seasoned legal professionals with dynamic approach to dispute resolution. Specialize in Corporate and Commercial Litigation, Banking & Finance, Insurance, Insolvency, Criminal & Civil Disputes. Committed to revolutionizing dispute resolution through technology."
      }
    ],
    leadership: [
      {
        id: 1,
        name: "Adv. Rudra N. Zadu",
        title: "Chief Legal Officer & Head – ODR/Dispute Resolution (Corporate & Financial Law)",
        image: Rudra,
        experience: "Leadership over 40+ legal professionals across six cities",
        education: "LL.M. in Corporate and Financial Laws (O.P. Jindal Global Law School) | B.A. LL.B. (D.E.S. Law College, Pune)",
        role: "Corporate Law, Financial Law, Capital Markets, Private Equity, M&A",
        location: "Pune",
        phone: "+91 XXXXX XXXXX",
        email: "rudra.zadu@settlesmart.com",
        description: "Accomplished Corporate Lawyer and Managing Director of Corporate Consultants. Expert in Corporate Law, Financial Law, Capital Markets, Private Equity, M&A, and Contractual Compliance. Certified in Cyber Laws, Corporate Laws, Energy Laws, and Privacy Regulations."
      },
      {
        id: 2,
        name: "Adv. Amit Kumar Sharma",
        title: "Board of Directors & Head—ODR & Dispute Resolution (Taxation, Corporate & Commercial Law)",
        image: Amit,
        experience: "8+ years before J&K High Court, CAT, AFT, Sales Tax Tribunals, NCLT, NCLAT",
        education: "LL.M. in Business Law (Rajiv Gandhi National University of Law) | B.A., LL.B. (University of Jammu)",
        role: "Taxation, Corporate Governance, Commercial Disputes",
        location: "Jammu",
        phone: "+91 XXXXX XXXXX",
        email: "amit.sharma@settlesmart.com",
        description: "Taxation and corporate law expert with sharp analytical skills. Handles complex commercial and tax matters with precision. Strengthens our ODR platform with expertise in taxation, corporate governance, and commercial disputes."
      }
    ],
    board: [
      {
        id: 1,
        name: "Adv. Pankaj Rishi Krishnan",
        title: "Board of Directors & Head—ODR/Dispute Resolution",
        image: "",
        experience: "Supreme Court of India, Delhi HC, Punjab & Haryana HC, NGT, NCLAT, NCDRC & AFT",
        education: "B.S., M.S., LL.B., LL.M., PGD in ADR, DCL, DIPR",
        role: "Civil, Matrimonial & Property Dispute Resolution",
        tenure: "Professor - Criminal & Constitutional Law at State PCS & UPSC Civil Service",
        description: "Distinguished Supreme Court lawyer with expertise in prosecution and defense across complex cases. Renowned for crafting precise legal petitions with exceptional clarity and depth."
      },
      {
        id: 2,
        name: "Adv. Amit Kumar Sharma",
        title: "Board of Directors & Head—ODR & Dispute Resolution",
        image: "",
        experience: "Taxation and Corporate Law Expert",
        education: "LL.M. in Business Law (RGNUL) | B.A., LL.B. (University of Jammu)",
        role: "Taxation, Corporate & Commercial Law",
        tenure: "Practising Lawyer at J&K High Court",
        description: "Seasoned practitioner before various tribunals including CAT, AFT, Sales Tax Tribunals, NCLT, NCLAT, and Income Tax Appellate Tribunals."
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
  Settle Smart&#39;s team combines decades of experience with innovative approaches to deliver exceptional legal solutions.
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
                  {/* Image Column - Fixed */}
                  <div className="w-full lg:w-1/3 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative group w-[280px] h-[280px]"
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-lg shadow-md border-4 border-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
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
                          {/* Experience - Fixed gap */}
                          <div className="flex items-start gap-2">
                            <FaBriefcase className="text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-800">Experience</p>
                              <p className="text-gray-600">{member.experience}</p>
                            </div>
                          </div>
                          
                          {/* Education - Fixed gap */}
                          <div className="flex items-start gap-2">
                            <FaGraduationCap className="text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-800">Education</p>
                              <p className="text-gray-600">{member.education}</p>
                            </div>
                          </div>
                          
                          {/* Practice Areas - Fixed gap */}
                          <div className="flex items-start gap-2">
                            <GiScaleMail className="text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-800">
                                {member.practiceAreas ? "Practice Areas" : "Role"}
                              </p>
                              <p className="text-gray-600">
                                {member.practiceAreas ? member.practiceAreas.join(", ") : member.role}
                              </p>
                            </div>
                          </div>
                          
                          {/* Location - Fixed gap */}
                          <div className="flex items-start gap-2">
                            <FaMapMarkerAlt className="text-blue-600 mt-1" />
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">SettleSmart Solutions</h2>
          <p className="text-gray-600 leading-relaxed">
            Our multi-disciplinary ODR platform combines decades of litigation expertise with technology-driven dispute resolution.
            With specialists across civil, criminal, corporate, tax, matrimonial, labour, and financial disputes, we deliver
            efficient, cost-effective justice through our team of Supreme Court lawyers, corporate law experts, and ADR specialists.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default TeamPage;