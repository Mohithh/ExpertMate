'use client';
import React, { useState, useEffect } from "react";
import { FiUpload, FiUser, FiClock, FiVideo, FiMessageSquare, FiStar, FiCalendar, FiChevronRight } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import Header from "../header/page";
import Footer from "../footer/page";
import Image from "next/image";

const StartDispute = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState("dispute");
    const [disputeType, setDisputeType] = useState("");
    const [description, setDescription] = useState("");
    const [assessmentResult, setAssessmentResult] = useState("");
    const [selectedMediator, setSelectedMediator] = useState(null);
    const [hearingType, setHearingType] = useState("video");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const disputeTypes = ["Business", "Consumer", "Property", "Family", "Employment"];
    const mediators = [
        { id: 1, name: "Adv. Rajesh Verma", rating: 4.9, fee: "₹2500/hr", spec: "Property Disputes", image: "/placeholder-avatar1.jpg" },
        { id: 2, name: "Dr. Priya Singh", rating: 4.8, fee: "₹3000/hr", spec: "Family Law", image: "/placeholder-avatar2.jpg" },
    ];
    const timeSlots = ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

    const runAIAssessment = () => {
        setTimeout(() => {
            const result = description.length % 2 === 0 ? "Mediation Suggested" : "Arbitration Needed";
            setAssessmentResult(result);
        }, 1000);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Not scheduled";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!isClient) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
                    <div className="max-w-6xl mx-auto">Loading...</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* <div className="flex justify-end mb-6">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300"
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div> */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-400 mb-8">Start New Dispute</h1>
                            <div className="space-y-2">
                                {[
                                    { id: "dispute", label: "1. Dispute Details" },
                                    { id: "parties", label: "2. Party Information" },
                                    { id: "mediator", label: "3. Select Mediator" },
                                    { id: "schedule", label: "4. Schedule Hearing" },
                                    { id: "submit", label: "5. Review & Submit" }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full text-left flex items-center justify-between p-4 rounded-xl transition-all ${activeSection === item.id
                                            ? "bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg"
                                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-700 dark:hover:text-indigo-400"
                                            }`}
                                    >
                                        <span>{item.label}</span>
                                        {activeSection === item.id && <FiChevronRight className="ml-2" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Dispute Details Section */}
                            {activeSection === "dispute" && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dispute Details</h2>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Type of Dispute</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {disputeTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setDisputeType(type)}
                                                    className={`p-4 rounded-xl border-2 transition-all ${disputeType === type
                                                        ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md"
                                                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Description</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                            placeholder="Explain your dispute in detail..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Supporting Documents</label>
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <FiUpload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOC, JPG (Max 10MB each)</p>
                                            <input type="file" className="hidden" multiple onChange={() => { }} />
                                        </label>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={runAIAssessment}
                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-md"
                                        >
                                            Run AI-Powered Assessment
                                        </button>
                                    </div>

                                    {assessmentResult && (
                                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg">
                                            <h3 className="font-medium text-blue-800 dark:text-blue-200">AI Recommendation</h3>
                                            <p className="text-blue-700 dark:text-blue-300">{assessmentResult}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Party Info Section */}
                            {activeSection === "parties" && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Party Information</h2>

                                    <div className="space-y-8">
                                        <div className="border-b dark:border-gray-700 pb-6">
                                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                                <FiUser className="text-indigo-600 dark:text-indigo-400" /> Complainant Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter email"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                                <FiUser className="text-indigo-600 dark:text-indigo-400" /> Respondent Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter email"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mediator Selection Section */}
                            {activeSection === "mediator" && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Select Mediator/Arbitrator</h2>

                                    <div className="mb-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Available Professionals</h3>
                                            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
                                                Auto-select Best Match <FiChevronRight className="ml-1" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {mediators.map((mediator) => (
                                                <div
                                                    key={mediator.id}
                                                    onClick={() => setSelectedMediator(mediator.id)}
                                                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedMediator === mediator.id
                                                        ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 shadow-md"
                                                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                                                                <Image
                                                                    src={mediator.image}
                                                                    alt={mediator.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h3 className="font-bold text-gray-800 dark:text-white">{mediator.name}</h3>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{mediator.spec}</p>
                                                                </div>
                                                                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                                                                    <FiStar className="fill-current text-yellow-500" />
                                                                    <span className="ml-1 text-gray-800 dark:text-yellow-400 font-medium">{mediator.rating}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between mt-3">
                                                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                                                    <span className="font-medium text-gray-800 dark:text-white">{mediator.fee}</span>
                                                                </div>
                                                                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-xl border-l-4 border-blue-500 dark:border-blue-400">
                                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Reverse Bidding System</h3>
                                        <p className="text-blue-700 dark:text-blue-300">
                                            Our platform will notify qualified professionals about your case. They'll submit competitive proposals,
                                            ensuring you get the best expertise at fair rates.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Schedule Hearing Section */}
                            {activeSection === "schedule" && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Schedule Hearing</h2>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mode of Hearing</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setHearingType("video")}
                                                className={`p-5 rounded-xl border-2 flex flex-col items-center transition-all ${hearingType === "video"
                                                    ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                                                    }`}
                                            >
                                                <FiVideo className="w-8 h-8 mb-3 text-gray-700 dark:text-gray-300" />
                                                <span className="font-medium">Video Conference</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Zoom, Google Meet</span>
                                            </button>
                                            <button
                                                onClick={() => setHearingType("text")}
                                                className={`p-5 rounded-xl border-2 flex flex-col items-center transition-all ${hearingType === "text"
                                                    ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md"
                                                    : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                                                    }`}
                                            >
                                                <FiMessageSquare className="w-8 h-8 mb-3 text-gray-700 dark:text-gray-300" />
                                                <span className="font-medium">Text-Based</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Secure messaging platform</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            <FiCalendar className="absolute right-4 top-4 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    </div>

                                    {selectedDate && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Available Time Slots</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center transition-all ${selectedTime === time
                                                            ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                                                            : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                                                            }`}
                                                    >
                                                        <FiClock className="mr-2 text-gray-700 dark:text-gray-300" /> {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Submit Section */}
                            {activeSection === "submit" && (
                                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Review & Submit</h2>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-8">
                                        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Dispute Summary</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Dispute Type:</span>
                                                <span className="font-medium dark:text-white">{disputeType || "Not selected"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Resolution Method:</span>
                                                <span className="font-medium dark:text-white">{assessmentResult || "Not assessed"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Selected Mediator:</span>
                                                <span className="font-medium dark:text-white">
                                                    {selectedMediator ? mediators.find(m => m.id === selectedMediator).name : "Not selected"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Hearing Date:</span>
                                                <span className="font-medium dark:text-white">
                                                    {selectedDate ? formatDate(selectedDate) : "Not scheduled"} {selectedTime && `at ${selectedTime}`}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Hearing Mode:</span>
                                                <span className="font-medium capitalize dark:text-white">{hearingType === "video" ? "Video Conference" : "Text-Based"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => setActiveSection("schedule")}
                                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium dark:text-white"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => {
                                                // Handle form submission
                                                console.log("Dispute submitted", {
                                                    disputeType,
                                                    description,
                                                    assessmentResult,
                                                    selectedMediator,
                                                    hearingType,
                                                    selectedDate,
                                                    selectedTime
                                                });
                                            }}
                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-md"
                                        >
                                            Submit Dispute
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StartDispute;