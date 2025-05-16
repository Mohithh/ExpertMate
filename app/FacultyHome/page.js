'use client';
import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Link from 'next/link';
import Image from 'next/image';
import { FiSun, FiMoon, FiUpload, FiUser, FiPhone, FiBriefcase, FiAward, FiMapPin, FiFileText } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Email from "@/app/assets/login.png";

const LawyerRegistrationPage = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dp, setdp] = useState(null);
  const [file, setfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    barNumber: "",
    firm: "",
    country: "",
    city: "",
    specialization: "",
    qualification: "",
    experience: "",
    description: ""
  });

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  useEffect(() => {
    const checkuser = async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to register");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const res = await response.json();
        if (res.success) {
          setuseremail(res.email);
        } else {
          setError(res.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }

      
    };
    checkuser();
  }, []);

  const countries = {
    india: { delhi: 'Delhi', mumbai: 'Mumbai', bangalore: 'Bangalore' },
    usa: { newyork: 'New York', california: 'California', texas: 'Texas' },
    uk: { london: 'London', manchester: 'Manchester', birmingham: 'Birmingham' }
  };

  const specializations = [
    'Corporate Law', 'Criminal Law', 'Family Law', 
    'Immigration Law', 'Intellectual Property', 
    'Tax Law', 'Employment Law', 'Environmental Law'
  ];

  const experiences = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];
  const qualifications = ["LL.B", "LL.M", "J.D", "Ph.D in Law"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'image') {
      setdp(file);
    } else {
      setfile(file);
    }
  };

  const validateForm = () => {
    if (!formData.name) return "Name is required";
    if (!formData.mobile || !/^\d{10,15}$/.test(formData.mobile)) return "Valid phone number is required";
    if (!formData.barNumber) return "Bar license number is required";
    if (!formData.country) return "Country is required";
    if (!formData.city) return "City is required";
    if (!formData.specialization) return "Specialization is required";
    if (!formData.qualification) return "Qualification is required";
    if (!formData.experience) return "Experience is required";
    if (!formData.description || formData.description.length < 50) return "Description must be at least 50 characters";
    if (!dp) return "Profile picture is required";
    if (!file) return "Bar license document is required";
    return null;
  };

  const submitform = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      setFormSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/Facultydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
          ...formData
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Then upload files if form submission was successful
      if (dp || file) {
        const formData = new FormData();
        formData.append("email", useremail);
        if (dp) formData.append("image", dp);
        if (file) formData.append("file", file);

        const res = await fetch("/api/upload-lawyer-docs", {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          throw new Error("File upload failed");
        }
      }

      toast.success("Registration successful! Your account will be reviewed within 2 business days.");
      
      // Reset form
      setdp(null);
      setfile(null);
      setFormData({
        name: "",
        mobile: "",
        barNumber: "",
        firm: "",
        country: "",
        city: "",
        specialization: "",
        qualification: "",
        experience: "",
        description: ""
      });

    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left Column - Image */}
        <div className="hidden md:block md:w-1/2 lg:w-2/5">
          <div className="sticky top-24">
            <Image
              src={Email}
              alt="Lawyer Registration Illustration"
              className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500"
              placeholder="blur"
              priority
            />
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Why Join Our Network?</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Access to premium clients and cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Verified lawyer profile with credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Marketing and visibility tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Secure document sharing and storage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 lg:w-3/5">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">Lawyer Registration</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Join our network of legal professionals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/lawyers" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Browse Lawyers
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 transition-colors"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar
              completed={Object.values(formData).filter(val => val !== "").length * 10}
              bgColor="#10b981"
              baseBgColor="#e5e7eb"
              height="12px"
              labelAlignment="center"
              className="rounded-full"
            />
          </div>

          {/* Main Form */}
          <form onSubmit={submitform} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
                <input
                  type="text"
                  value={useremail}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            {/* Personal Information Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiUser className="text-green-600 dark:text-green-400" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name*</label>
                  <div className="relative">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="John Doe"
                    />
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number*</label>
                  <div className="relative">
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      type="tel"
                      required
                      pattern="[0-9]{10,15}"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="1234567890"
                    />
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Details Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiBriefcase className="text-green-600 dark:text-green-400" />
                Professional Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bar License Number*</label>
                  <input
                    name="barNumber"
                    value={formData.barNumber}
                    onChange={handleInputChange}
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your bar license number"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Law Firm (if applicable)</label>
                  <input
                    name="firm"
                    value={formData.firm}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Name of your law firm"
                  />
                </div>
              </div>
            </section>

            {/* Location Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiMapPin className="text-green-600 dark:text-green-400" />
                Location
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country*</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Country</option>
                    {Object.keys(countries).map(country => (
                      <option key={country} value={country}>{country.charAt(0).toUpperCase() + country.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City*</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.country}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select City</option>
                    {formData.country && Object.entries(countries[formData.country]).map(([key, city]) => (
                      <option key={key} value={key}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Legal Specialization Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiAward className="text-green-600 dark:text-green-400" />
                Legal Specialization
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Area of Specialization*</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Highest Qualification*</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Qualification</option>
                    {qualifications.map(qual => (
                      <option key={qual} value={qual}>{qual}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Years of Experience*</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Experience</option>
                    {experiences.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Professional Bio Section */}
            <section className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Professional Bio*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                minLength="50"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows="4"
                placeholder="Describe your legal expertise, notable cases, and approach to law (minimum 50 characters)..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.description.length}/50 characters
              </p>
            </section>

            {/* Documents Upload Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiFileText className="text-green-600 dark:text-green-400" />
                Documents Upload
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture*</label>
                  <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
                      </div>
                      <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'image')} 
                        accept="image/*" 
                        required 
                        className="hidden" 
                      />
                    </label>
                    {dp && (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p>{dp.name}</p>
                        <p className="text-xs text-gray-500">{(dp.size / 1024).toFixed(2)} KB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bar License (PDF)*</label>
                  <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
                      </div>
                      <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, 'file')} 
                        accept=".pdf,.doc,.docx" 
                        required 
                        className="hidden" 
                      />
                    </label>
                    {file && (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p>{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Verification Note */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300">
              <strong>Verification Process:</strong> All lawyer registrations are manually verified. You'll receive an email once your account is approved (typically within 2 business days). Please ensure all information is accurate.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formSubmitting}
              className={`w-full py-3.5 rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2 ${
                formSubmitting 
                  ? 'bg-green-400 dark:bg-green-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
              }`}
            >
              {formSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default LawyerRegistrationPage;