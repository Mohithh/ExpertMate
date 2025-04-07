"use client"
"use client";
import React from "react";
import Header from "../header/page";
const cartData = [
  {
    title: "Criminal Law",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_1.svg",
    description:
      "Defense representations for various criminal charges. Investigations and evidence analysis. Bail applications and more.",
  },
  {
    title: "Corporate Law",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_2.svg",
    description:
      "Legal advocacy for diverse corporate matters. Conducting in-depth research and reviewing evidence.",
  },
  {
    title: "Family Law",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_3.svg",
    description:
      "Expert defense strategies for a variety of family cases. Comprehensive case analysis and representation in hearings.",
  },
  {
    title: "Real Estate Law",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_4.svg",
    description:
      "Representation in numerous real estate matters, including detailed investigations and assistance with legal procedures.",
  },
  {
    title: "Personal Injury Law",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_5.svg",
    description:
      "Professional legal defense for different types of personal injury claims. Careful examination of case details.",
  },
  {
    title: "Health Care Policy",
    imgSrc:
      "https://wordpress.themeholy.com/ensaf/wp-content/uploads/2024/12/service_card_1_6.svg",
    description:
      "Skilled advocacy for individuals facing various health care policy issues. Support and preparation of legal motions.",
  },
];

const Timeline = () => {
  return (
    <>
    <Header />
    <section className="bg-black text-white py-20 px-5">
      <h2 className="text-4xl font-bold text-center mb-10 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-yellow-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-2 animate-fadeInDown">
        Services
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cartData.map((cart, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-yellow-400 rounded-xl shadow-yellow-400/30 shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-yellow-400/50 duration-300"
          >
            <img
              src={cart.imgSrc}
              alt={`${cart.title} Icon`}
              className="w-16 h-16 mx-auto mb-5 transition-transform duration-500 hover:rotate-[360deg]"
            />
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              {cart.title}
            </h3>
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">
              {cart.description}
            </p>
            <a
              href="#"
              className="inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded hover:bg-black hover:text-yellow-400 transition-all duration-300"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default Timeline;
