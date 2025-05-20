  "use client";
  import React, { useState } from "react";

  export default function Form() {
    const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      caseType: "",
      opposingParty: "",
      incidentDate: "",
      caseDescription: "",
      documents: "",
      budget: "",
      urgency: "normal",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus("");

      try {
        const res = await fetch("/api/registerCase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
          setStatus("✅ Your case details have been submitted successfully!");
          setForm({
            name: "",
            email: "",
            phone: "",
            caseType: "",
            opposingParty: "",
            incidentDate: "",
            caseDescription: "",
            documents: "",
            budget: "",
            urgency: "normal",
          });
        } else {
          setStatus(`❌ Failed: ${data.error}`);
        }
      } catch (error) {
        setStatus("❌ Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-200">
          Legal Case Consultation Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (123) 456-7890"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="caseType" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Case Type *
              </label>
              <select
                id="caseType"
                name="caseType"
                value={form.caseType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">Select case type</option>
                <option value="family">Family Law</option>
                <option value="criminal">Criminal Defense</option>
                <option value="personal-injury">Personal Injury</option>
                <option value="business">Business/Corporate</option>
                <option value="real-estate">Real Estate</option>
                <option value="employment">Employment Law</option>
                <option value="immigration">Immigration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="opposingParty" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Opposing Party (if any)
              </label>
              <input
                type="text"
                id="opposingParty"
                name="opposingParty"
                placeholder="Name of opposing party"
                value={form.opposingParty}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="incidentDate" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Incident/Case Date
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                value={form.incidentDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Urgency Level *
              </label>
              <select
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent (within 1 week)</option>
                <option value="emergency">Emergency (within 48 hours)</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-1 dark:text-gray-300">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <option value="">Select budget range</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k+">$25,000+</option>
                <option value="unsure">Not sure</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="caseDescription" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Case Description *
            </label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              placeholder="Please describe your legal issue in detail..."
              value={form.caseDescription}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="documents" className="block text-sm font-medium mb-1 dark:text-gray-300">
              Relevant Documents (describe)
            </label>
            <textarea
              id="documents"
              name="documents"
              placeholder="List any relevant documents you have (contracts, police reports, medical records, etc.)"
              value={form.documents}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Submitting..." : "Submit Case Details"}
            </button>
          </div>

          {status && (
            <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
              {status}
            </p>
          )}
        </form>
      </div>
    );
  }