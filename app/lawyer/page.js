'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data.json";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaBriefcase,
  FaGraduationCap
} from "react-icons/fa";
import { GiScaleMail, GiJusticeStar } from "react-icons/gi";
import { motion } from "framer-motion";
import Header from "../header/page";
import Image from "next/image";

const Lawyer = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const filteredLawyers =
    activeTab === "all"
      ? data.projects
      : data.projects.filter((lawyer) =>
          lawyer.practiceAreas?.includes(activeTab)
        );

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

  const practiceAreas = [
    { id: "all", name: "All Attorneys" },
    { id: "corporate", name: "Corporate Law" },
    { id: "family", name: "Family Law" },
    { id: "criminal", name: "Criminal Defense" },
    { id: "real-estate", name: "Real Estate" },
    { id: "immigration", name: "Immigration" },
    { id: "intellectual", name: "Intellectual Property" },
    { id: "tax", name: "Tax Law" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i + 1 <= rating ? (
        <FaStar key={i} className="text-amber-400 inline-block" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 inline-block" />
      )
    );
  };

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
          <GiJusticeStar className="mx-auto text-5xl mb-6 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Our Distinguished Legal Team
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Settle Smart Solution&rsquo;s premier attorneys bring unparalleled expertise 
            and dedication to every case, ensuring your legal matters are handled 
            with the utmost professionalism.
          </p>
        </motion.section>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16 px-4"
        >
          {practiceAreas.map((area) => (
            <motion.button
              key={area.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(area.id)}
              className={`px-5 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
                activeTab === area.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
              }`}
            >
              {area.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel */}
        {filteredLawyers.length > 0 ? (
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
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="p-6 md:p-8 rounded-2xl bg-white shadow-xl mx-2 md:mx-4 border border-gray-200"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group"
                      >
                        <Image
                          src={lawyer.image}
                          alt={lawyer.name}
                          width={220}
                          height={220}
                          className="object-cover rounded-lg shadow-md border-4 border-blue-500/10 group-hover:border-blue-500/30 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white font-medium">
                            {lawyer.title}
                          </span>
                        </div>
                      </motion.div>

                      {/* Contact */}
                      <div className="flex gap-4 mt-6">
                        <a href={`tel:${lawyer.phone}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 transition-all shadow">
                          <FaPhone />
                        </a>
                        <a href={`mailto:${lawyer.email}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 transition-all shadow">
                          <FaEnvelope />
                        </a>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="w-full lg:w-2/3">
                      <div className="flex flex-col h-full">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                            {lawyer.name}
                          </h2>
                          <p className="text-lg mb-4 text-blue-600 font-medium">
                            {lawyer.title}
                          </p>

                          <div className="flex items-center mb-4">
                            {renderStars(lawyer.rating)}
                            <span className="ml-2 text-gray-600 text-sm">
                              ({lawyer.reviews} client reviews)
                            </span>
                          </div>

                          <p className="mb-6 text-gray-600 leading-relaxed">
                            {lawyer.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start">
                              <FaBriefcase className="text-blue-600 mt-1 mr-2" />
                              <div>
                                <p className="font-medium text-gray-800">Experience</p>
                                <p className="text-gray-600">{lawyer.experience} years in practice</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FaGraduationCap className="text-blue-600 mt-1 mr-2" />
                              <div>
                                <p className="font-medium text-gray-800">Education</p>
                                <p className="text-gray-600">{lawyer.education || "Juris Doctor"}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <GiScaleMail className="text-blue-600 mt-1 mr-2" />
                              <div>
                                <p className="font-medium text-gray-800">Practice Areas</p>
                                <p className="text-gray-600">{lawyer.practiceAreas?.join(", ")}</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <FaMapMarkerAlt className="text-blue-600 mt-1 mr-2" />
                              <div>
                                <p className="font-medium text-gray-800">Location</p>
                                <p className="text-gray-600">{lawyer.location}</p>
                              </div>
                            </div>
                          </div>

                          {/* Social */}
                          <div className="flex gap-4 border-t pt-4 border-gray-200">
                            {[FaLinkedin, FaTwitter, FaInstagram].map((Icon, idx) => (
                              <motion.a
                                key={idx}
                                whileHover={{ y: -2 }}
                                href="#"
                                className="text-lg text-gray-600 hover:text-blue-700 transition-colors"
                                aria-label={`Connect on ${Icon.name}`}
                              >
                                <Icon />
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <GiScaleMail className="mx-auto text-4xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-medium text-gray-800 mb-2">
                No attorneys found in this practice area
              </h3>
              <p className="text-gray-600 mb-6">
                We currently don&rsquo;t have attorneys specializing in this area, but our 
                general practice team can still assist you or refer you to qualified specialists.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("all")}
                className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:shadow-lg transition-all font-medium"
              >
                View All Attorneys
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Lawyer;
