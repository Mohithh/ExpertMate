"use client"

import { useEffect } from "react";
import Header from "../header/page";

const Arbitrators = () => {
  useEffect(() => {
    document.title = "Arbitrators | SettleSmart Solutions";
  }, []);

  return (
    <>
      <Header />
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Our Arbitrators
        </h1>
        <p className="text-center text-lg md:text-xl mb-12 max-w-3xl mx-auto">
          We work with top legal professionals to ensure fair and efficient resolutions. Meet our panel of expert arbitrators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Arbitrator Card Example */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                Img
              </div>
              <h3 className="text-xl font-semibold mb-1">Advocate Name</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Senior Arbitrator, Delhi High Court
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Arbitrators;
