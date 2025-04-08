'use client';

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from "../assets/data.json";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar
} from "react-icons/fa";
import { GiScaleMail, GiJusticeStar } from "react-icons/gi";
import Header from "../header/page";

const Lawyer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const filteredLawyers =
    activeTab === "all"
      ? data.projects
      : data.projects.filter((lawyer) =>
          lawyer.practiceAreas?.includes(activeTab)
        );

  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`absolute top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 ${
        darkMode
          ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400"
          : "bg-blue-600/20 hover:bg-blue-600/30 text-blue-600"
      } rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous Slide" : "Next Slide"}
    >
      <span className="text-2xl font-bold">
        {direction === "prev" ? "<" : ">"}
      </span>
    </button>
  );

  const practiceAreas = [
    { id: "all", name: "All Attorneys" },
    { id: "corporate", name: "Corporate Law" },
    { id: "family", name: "Family Law" },
    { id: "criminal", name: "Criminal Defense" },
    { id: "real-estate", name: "Real Estate" },
    { id: "immigration", name: "Immigration" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i + 1 <= rating ? (
        <FaStar key={i} className="text-amber-400 inline-block" />
      ) : (
        <FaRegStar
          key={i}
          className="text-gray-300 dark:text-gray-500 inline-block"
        />
      )
    );
  };

  return (
    <>
      <Header />
      {/* ... rest of your existing layout stays the same ... */}

      {/* Add missing part here at the end of card component */}
      <div className="flex gap-4 mt-6">
        {[FaLinkedin, FaTwitter, FaInstagram, FaFacebook].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className={`text-xl transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } ${
              darkMode ? "hover:text-blue-400" : "hover:text-blue-700"
            }`}
            aria-label="Social Link"
          >
            <Icon />
          </a>
        ))}
      </div>
    </>
  );
};

export default Lawyer;
