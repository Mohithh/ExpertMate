"use client";
import React, { useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import Link from 'next/link';

const LawyerRegistrationPage = () => {
  const [useremail, setuseremail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [dp, setdp] = useState();
  const [file, setfile] = useState();

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkuser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to register");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/useremail`, {
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

  // Lawyer-specific data
  const data = {
    india: { delhi: 'Delhi', mumbai: 'Mumbai', bangalore: 'Bangalore' },
    usa: { newyork: 'New York', california: 'California', texas: 'Texas' },
    uk: { london: 'London', manchester: 'Manchester', birmingham: 'Birmingham' }
  };

  const specializations = {
    corporate: 'Corporate Law',
    criminal: 'Criminal Law',
    family: 'Family Law',
    immigration: 'Immigration Law',
    intellectual: 'Intellectual Property',
    tax: 'Tax Law',
    employment: 'Employment Law',
    environmental: 'Environmental Law'
  };

  const experiences = {
    "0-2": "0-2 years",
    "3-5": "3-5 years",
    "6-10": "6-10 years",
    "10+": "10+ years"
  };

  const qualifications = {
    llb: "LL.B",
    llm: "LL.M",
    jd: "J.D",
    phd: "Ph.D in Law"
  };

  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [specialization, setspecialization] = useState("");
  const [qualification, setqualification] = useState("");
  const [experience, setexperience] = useState("");
  const [barNumber, setbarNumber] = useState("");
  const [firm, setfirm] = useState("");
  const [progress, setProgress] = useState(0);
  const [username, setusername] = useState("");
  const [description, setdescription] = useState("");
  const [mobile, setmobile] = useState("");

  const handlechange = (e) => {
    setcountry(e.target.value);
    setcity("");
    setProgress(progress + 10);
  };

  const handlecity = (e) => {
    setcity(e.target.value);
    setProgress(progress + 10);
  };

  const handlespecialization = (e) => {
    setspecialization(e.target.value);
    setProgress(progress + 10);
  };

  const handlequalification = (e) => {
    setqualification(e.target.value);
    setProgress(progress + 10);
  };

  const handleexperience = (e) => {
    setexperience(e.target.value);
    setProgress(progress + 10);
  };

  const submitform = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/LawyerRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
          name: username,
          description: description,
          mobile: mobile,
          country: country,
          city: city,
          specialization: specialization,
          qualification: qualification,
          experience: experience,
          barNumber: barNumber,
          firm: firm
        }),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (dp || file) {
        const formData = new FormData();
        formData.append("email", useremail);
        if (dp) formData.append("image", dp);
        if (file) formData.append("file", file);

        const res = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        alert(data.message);
      }

      // Reset form
      setdp(null);
      setfile(null);
      setProgress(0);

    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">Lawyer Registration</h1>
        <div className="flex items-center gap-4">
          <Link href="/lawyers" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-lg">
            Browse Lawyers
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <form onSubmit={submitform} className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-8 border border-gray-100 dark:border-gray-700">

        <ProgressBar
          completed={progress}
          bgColor="#10b981"
          baseBgColor="#e5e7eb"
          height="20px"
          labelAlignment="center"
          className="sticky top-0 z-50"
        />

        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div>
            <label className="block text-xl font-bold mb-2 dark:text-white">Your Email ID:</label>
            <input
              type="text"
              value={useremail}
              readOnly
              className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Full Name*</label>
              <input 
                onChange={(e) => setusername(e.target.value)} 
                type="text" 
                value={username} 
                name='name' 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
              />
            </div>

            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Contact Number*</label>
              <input 
                onChange={(e) => setmobile(e.target.value)} 
                type="tel" 
                value={mobile} 
                name='number' 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                pattern="[0-9]{10,15}"
                title="Please enter a valid phone number"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Professional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Bar License Number*</label>
              <input 
                onChange={(e) => setbarNumber(e.target.value)} 
                type="text" 
                value={barNumber} 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                placeholder="Enter your bar license number"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Law Firm (if applicable)</label>
              <input 
                onChange={(e) => setfirm(e.target.value)} 
                type="text" 
                value={firm} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
                placeholder="Name of your law firm"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Select Country*</label>
              <select 
                onChange={handlechange} 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Country</option>
                {Object.keys(data).map((value) => (
                  <option key={value} value={value}>{value.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Select City*</label>
              <select 
                onChange={handlecity} 
                required 
                disabled={!country}
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select City</option>
                {country && Object.entries(data[country]).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Area of Specialization*</label>
              <select 
                onChange={handlespecialization} 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Specialization</option>
                {Object.entries(specializations).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Highest Qualification*</label>
              <select 
                onChange={handlequalification} 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Qualification</option>
                {Object.entries(qualifications).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Years of Experience*</label>
              <select 
                onChange={handleexperience} 
                required 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Experience</option>
                {Object.entries(experiences).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <label className="block font-medium mb-1 dark:text-gray-300">Professional Bio*</label>
          <textarea 
            required 
            className='border w-full h-32 p-3 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white' 
            onChange={(e) => setdescription(e.target.value)} 
            name="description" 
            value={description} 
            placeholder="Describe your legal expertise, notable cases, and approach to law..."
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Upload Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Profile Picture*</label>
              <input 
                type="file" 
                onChange={(e) => setdp(e.target.files[0])} 
                accept="image/*" 
                required 
                className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
              />
            </div>
            <div>
              <label className="block font-medium mb-1 dark:text-gray-300">Bar License (PDF)*</label>
              <input 
                type="file" 
                onChange={(e) => setfile(e.target.files[0])} 
                accept=".pdf,.doc,.docx" 
                required 
                className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
              />
            </div>
          </div>
        </section>

        <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-sm text-green-700 dark:text-green-300">
          <strong>Verification Note:</strong> All lawyer registrations are manually verified. You'll receive an email once your account is approved (typically within 2 business days).
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3 rounded-xl transition duration-300"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
};

export default LawyerRegistrationPage;