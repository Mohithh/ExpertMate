'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Amit from "@/app/assets/amit.png";
import Rudra from "@/app/assets/rudra1.jpeg";
import Harsha from "@/app/assets/harsha11.jpeg";
import Pankaj from "@/app/assets/Pankaj11.jpeg";
import Anand from "@/app/assets/anand1.jpeg";
import Nageshwar from "@/app/assets/nages.jpeg";

import {
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaBalanceScale,
  FaGraduationCap,
  FaUserTie
} from "react-icons/fa";
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
        title: "Founder & Chief Managing Director",
        image: Nageshwar,
        experience: "Corporate Law Specialist with multiple high-profile internships",
        education: "B.A. LL.B. (Honours), Corporate Law, Chandigarh University",
        role: "Strategic leadership and firm governance",
        location: "New Delhi",
        phone: "+91 91499 45265",
        email: "ns677112@gmail.com",
        linkedin: "https://www.linkedin.com/in/choudhary-nageshwar-singh-696808227/",
        description: "Legal scholar and corporate law expert with experience at Khaitan & Co., LKS, and Reliance Retail. Specializes in corporate and financial laws with strong research and advisory capabilities."
      }
    ],
    leadership: [
      {
        id: 1,
        name: "Rudra N. Zadu",
        title: "Chief Legal Officer & Head of Corporate Dispute Resolution",
        image: Rudra,
        experience: "10+ years in corporate law and dispute resolution",
        education: "LL.M. in Corporate and Financial Laws (O.P. Jindal Global University) | B.A. LL.B. (D.E.S. Law College, Pune)",
        role: "Corporate Law, Financial Regulations, M&A, Private Equity",
        location: "Pune, Mumbai",
        phone: "+91 98220 84422",
        email: "rudra.zadu@settlesmart.com",
        linkedin: "https://www.linkedin.com/in/rudra-n-zadu-717200148/",
        description: "Corporate law expert with extensive experience in financial regulations, capital markets, and mergers & acquisitions. Certified in Cyber Law, Corporate Law, and Energy Law."
      },
      {
        id: 2,
        name: "Aman Bhatti",
        title: "Chief Technology Officer",
        image: "/images/team/aman-bhatti.webp",
        experience: "Full-stack development with focus on legal tech solutions",
        education: "B.E. in Computer Science Engineering, Chandigarh University",
        role: "Technology Strategy, Product Development, Innovation",
        location: "Gurgaon, India",
        phone: "+91 99924 22581",
        email: "amanbhatti105@gmail.com",
        linkedin: "https://www.linkedin.com/in/amanbhatti01/",
        description: "Tech leader specializing in building innovative dispute resolution platforms. Expertise in React.js, Node.js, and cloud technologies to transform legal processes."
      }
    ],
    board: [
      {
        id: 1,
        name: "Amit Kumar Sharma",
        title: "Board Director & Head of Taxation Disputes",
        image: Amit,
        experience: "8+ years before J&K High Court, NCLT, NCLAT, and Tax Tribunals",
        education: "LL.M. in Business Law (RGNUL) | B.A., LL.B. (University of Jammu)",
        role: "Taxation, Commercial Disputes, Corporate Governance",
        location: "Jammu & New Delhi",
        phone: "+91 94191 96940",
        email: "amit.sharma@settlesmart.com",
        linkedin: "https://www.linkedin.com/in/amit-sharma-ab33b5107/",
        description: "Taxation law specialist with sharp analytical skills for complex commercial and tax matters. Strengthens our ODR platform with expertise in corporate governance and fiscal disputes."
      },
      {
        id: 2,
        name: "Pankaj Rishi Krishnan",
        title: "Board Director & Head of Civil Disputes",
        image: Pankaj,
        experience: "Supreme Court Advocate with appearances across all major tribunals",
        education: "B.S., M.S., LL.B., PGD in ADR, Diploma in Constitutional Law & IPR",
        role: "Civil Litigation, Matrimonial Disputes, Property Matters",
        location: "New Delhi",
        phone: "+91 98103 44566",
        email: "pankaj.krishnan@settlesmart.com",
        linkedin: "https://www.linkedin.com/in/pankaj-rishi-krishnan-3a193221b/",
        description: "Distinguished Supreme Court lawyer and legal scholar. Professor for civil services aspirants with expertise in constitutional law, criminal law, and civil disputes."
      },
      {
        id: 3,
        name: "Harsha Sharma",
        title: "Board Director & Head of ADR & Consumer Disputes",
        image: Harsha,
        experience: "PAN-India practice in consumer, labor and service matters",
        education: "B.A. LL.B. (Faculty of Law, University of Delhi)",
        role: "Alternative Dispute Resolution, Consumer Protection, Labor Laws",
        location: "New Delhi",
        phone: "+91 98101 64629",
        email: "harsha.sharma@settlesmart.com",
        linkedin: "https://www.linkedin.com/in/advocate-harsha-sharma-911a78108/",
        description: "Seasoned litigator specializing in corporate disputes, banking matters, and consumer protection. Combines traditional litigation skills with modern ADR techniques."
      },
      {
        id: 4,
        name: "Anand Kumar Dubey",
        title: "Board Director & Head of Commercial Disputes",
        image: Anand,
        experience: "Extensive practice in corporate and commercial litigation",
        education: "LL.B. (University of Delhi) & LL.M. (Business Law)",
        role: "Corporate Disputes, Banking & Finance, Insolvency Matters",
        location: "New Delhi",
        phone: "+91 98108 47722",
        email: "anand.dubey@settlesmart.com",
        linkedin: "https://www.linkedin.com/in/adv-anand-kumar-dubey-9b97619a/",
        description: "Corporate litigation expert focused on delivering strategic legal solutions. Committed to modernizing dispute resolution through innovative approaches."
      }
    ]
  };

  const tabs = [
    { id: "management", name: "Management" },
    { id: "leadership", name: "Leadership" },
    { id: "board", name: "Board of Directors" }
  ];

  const CustomArrow = ({ direction, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-blue-600/30 hover:bg-blue-600/40 text-blue-600 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${direction === "prev" ? "left-4" : "right-4"
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
            Loading our leadership team...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaUserTie className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          >
            Our Leadership
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed"
          >
            Settle Smart's team combines decades of legal expertise with innovative technology to deliver exceptional dispute resolution.
          </motion.p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16 px-4"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg transition-all duration-300 text-sm md:text-base font-medium ${activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
                }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

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
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-8 rounded-2xl bg-white shadow-xl mx-2 md:mx-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
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
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg flex items-end p-4"
                      >
                        <span className="text-white font-medium">
                          {member.title}
                        </span>
                      </motion.div>
                    </motion.div>

                    <div className="flex gap-4 mt-6">
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={`tel:${member.phone}`}
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                        title="Call"
                      >
                        <FaPhone className="mr-2 text-blue-600" />
                        Contact
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={`mailto:${member.email}`}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        title="Email"
                      >
                        <FaEnvelope className="mr-2" />
                        Email
                      </motion.a>
                    </div>
                  </div>

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
                            <FaBriefcase className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">Experience</p>
                              <p className="text-gray-600">{member.experience}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaGraduationCap className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">Education</p>
                              <p className="text-gray-600">{member.education}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaBalanceScale className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">Specialization</p>
                              <p className="text-gray-600">{member.role}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-800">Location</p>
                              <p className="text-gray-600">{member.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 border-t pt-4 border-gray-200">
                          {member.linkedin && (
                            <motion.a
                              whileHover={{ y: -2, scale: 1.1 }}
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg text-gray-600 hover:text-blue-700 transition-colors"
                              aria-label="Connect on LinkedIn"
                            >
                              <FaLinkedin />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Comprehensive Approach</h2>
          <p className="text-gray-600 leading-relaxed">
            SettleSmart combines decades of litigation expertise with cutting-edge technology for dispute resolution.
            Our multidisciplinary team of Supreme Court advocates, corporate law experts, and ADR specialists delivers
            efficient, cost-effective solutions across all legal domains.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default TeamPage;