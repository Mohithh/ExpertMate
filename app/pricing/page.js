"use client";
import { useEffect } from "react";
import Header from "../header/page";
import Footer from "../footer/page";

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing | SettleSmart Solutions";
  }, []);

  const legalPlans = [
    {
      name: "Basic Consultation",
      price: "$150",
      period: "per hour",
      features: [
        "Initial case evaluation",
        "Legal advice session (1 hour)",
        "Document review (up to 5 pages)",
        "Email follow-up within 48 hours",
        "Basic strategy outline",
      ],
      featured: false,
    },
    {
      name: "Standard Representation",
      price: "$2,500",
      period: "retainer",
      features: [
        "All Basic Consultation features",
        "Full case representation",
        "Court appearances",
        "Legal document preparation",
        "Up to 10 hours of service",
        "Phone/email support (business hours)",
        "Monthly case updates",
      ],
      featured: true,
    },
    {
      name: "Premium Legal Package",
      price: "$5,000",
      period: "retainer",
      features: [
        "All Standard Representation features",
        "Unlimited hours for case duration",
        "24/7 emergency support",
        "Expert witness coordination",
        "Comprehensive legal research",
        "Priority scheduling",
        "Quarterly legal audits",
      ],
      featured: false,
    },
  ];

  return (
    <>
      <Header />

    {/* <section className="min-h-screen bg-[#f8f5f0] dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-[#1a3e72] dark:text-white mb-3">
            Transparent Legal Fees
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clear pricing for exceptional legal services with no hidden costs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {legalPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white dark:bg-gray-800 border-t-4 ${
                plan.featured
                  ? "border-red-800 shadow-xl"
                  : "border-[#d4a76a] shadow-md"
              } rounded-xl p-6 flex flex-col justify-between`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-semibold text-center font-serif text-[#1a3e72] dark:text-white mb-4">
                {plan.name}
              </h3>
              <div className="text-center mb-4 border-b pb-4">
                <span className="block text-3xl font-bold text-[#1a3e72] dark:text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-[#d4a76a] dark:before:text-yellow-500"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
                  plan.featured
                    ? "bg-red-800 hover:bg-red-900"
                    : "bg-[#1a3e72] hover:bg-[#0d2b56]"
                }`}
              >
                Schedule Consultation
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-6 text-center text-sm max-w-4xl mx-auto">
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-[#d4a76a] dark:border-yellow-500 p-4 text-left">
            <strong>Note:</strong> All legal services are tailored to your specific
            needs. Final fees may vary based on case complexity. Contingency fees
            available for qualifying cases.
          </div>
          <div>
            <p>
              Need custom legal solutions?{" "}
              <a
                href="/contact"
                className="text-[#1a3e72] dark:text-yellow-400 font-semibold hover:underline"
              >
                Request a personalized quote
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>    */}
    <Footer/> </>
  );
};

export default Pricing;
