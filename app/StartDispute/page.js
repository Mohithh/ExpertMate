"use client";
import React, { useState, useEffect } from "react";
import { FiUpload, FiUser, FiClock, FiVideo, FiMessageSquare, FiStar, FiCalendar, FiChevronRight } from "react-icons/fi";
import Header from "../header/page";
import Footer from "../footer/page";
import Image from "next/image";

const StartDispute = () => {
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
    }, []);

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
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                    <div className="max-w-6xl mx-auto">Loading....</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <h1 className="text-3xl font-bold text-indigo-800 mb-8">Start New Dispute</h1>
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
                                            ? "bg-indigo-600 text-white shadow-lg"
                                            : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
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
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dispute Details</h2>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Type of Dispute</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {disputeTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setDisputeType(type)}
                                                    className={`p-4 rounded-xl border-2 transition-all ${disputeType === type
                                                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md"
                                                        : "border-gray-200 hover:border-indigo-300"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                            placeholder="Explain your dispute in detail..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Supporting Documents</label>
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <FiUpload className="w-10 h-10 text-gray-400 mb-3" />
                                            <p className="text-sm text-gray-500 text-center">
                                                <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PDF, DOC, JPG (Max 10MB each)</p>
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
                                        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                            <h3 className="font-medium text-blue-800">AI Recommendation</h3>
                                            <p className="text-blue-700">{assessmentResult}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Party Info Section */}
                            {activeSection === "parties" && (
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Party Information</h2>

                                    <div className="space-y-8">
                                        <div className="border-b pb-6">
                                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                                                <FiUser className="text-indigo-600" /> Complainant Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                        placeholder="Enter email"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                                                <FiUser className="text-indigo-600" /> Respondent Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                        placeholder="Enter full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                        placeholder="Enter email"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
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
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Mediator/Arbitrator</h2>

                                    <div className="mb-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                                            <h3 className="text-lg font-semibold text-gray-800">Available Professionals</h3>
                                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                                                Auto-select Best Match <FiChevronRight className="ml-1" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {mediators.map((mediator) => (
                                                <div
                                                    key={mediator.id}
                                                    onClick={() => setSelectedMediator(mediator.id)}
                                                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${selectedMediator === mediator.id
                                                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                                                        : "border-gray-200 hover:border-indigo-300"
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative">
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
                                                                    <h3 className="font-bold text-gray-800">{mediator.name}</h3>
                                                                    <p className="text-sm text-gray-600">{mediator.spec}</p>
                                                                </div>
                                                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                                                                    <FiStar className="fill-current text-yellow-500" />
                                                                    <span className="ml-1 text-gray-800 font-medium">{mediator.rating}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between mt-3">
                                                                <div className="flex items-center text-gray-600">
                                                                    <span className="font-medium text-gray-800">{mediator.fee}</span>
                                                                </div>
                                                                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
                                        <h3 className="font-semibold text-blue-800 mb-2">Reverse Bidding System</h3>
                                        <p className="text-blue-700">
                                            Our platform will notify qualified professionals about your case. They&apos;ll submit competitive proposals,
                                            ensuring you get the best expertise at fair rates.
                                        </p>

                                    </div>
                                </div>
                            )}

                            {/* Schedule Hearing Section */}
                            {activeSection === "schedule" && (
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Hearing</h2>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Mode of Hearing</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setHearingType("video")}
                                                className={`p-5 rounded-xl border-2 flex flex-col items-center transition-all ${hearingType === "video"
                                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md"
                                                    : "border-gray-200 hover:border-indigo-300"
                                                    }`}
                                            >
                                                <FiVideo className="w-8 h-8 mb-3" />
                                                <span className="font-medium">Video Conference</span>
                                                <span className="text-sm text-gray-500 mt-1">Zoom, Google Meet</span>
                                            </button>
                                            <button
                                                onClick={() => setHearingType("text")}
                                                className={`p-5 rounded-xl border-2 flex flex-col items-center transition-all ${hearingType === "text"
                                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md"
                                                    : "border-gray-200 hover:border-indigo-300"
                                                    }`}
                                            >
                                                <FiMessageSquare className="w-8 h-8 mb-3" />
                                                <span className="font-medium">Text-Based</span>
                                                <span className="text-sm text-gray-500 mt-1">Secure messaging platform</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            <FiCalendar className="absolute right-4 top-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {selectedDate && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 px-4 rounded-lg border-2 flex items-center justify-center transition-all ${selectedTime === time
                                                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                            : "border-gray-200 hover:border-indigo-300"
                                                            }`}
                                                    >
                                                        <FiClock className="mr-2" /> {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Submit Section */}
                            {activeSection === "submit" && (
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit</h2>

                                    <div className="bg-gray-50 p-6 rounded-xl mb-8">
                                        <h3 className="font-semibold text-gray-800 mb-4">Dispute Summary</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dispute Type:</span>
                                                <span className="font-medium">{disputeType || "Not selected"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Resolution Method:</span>
                                                <span className="font-medium">{assessmentResult || "Not assessed"}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Selected Mediator:</span>
                                                <span className="font-medium">
                                                    {selectedMediator ? mediators.find(m => m.id === selectedMediator).name : "Not selected"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Hearing Date:</span>
                                                <span className="font-medium">
                                                    {selectedDate ? formatDate(selectedDate) : "Not scheduled"} {selectedTime && `at ${selectedTime}`}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Hearing Mode:</span>
                                                <span className="font-medium capitalize">{hearingType === "video" ? "Video Conference" : "Text-Based"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => setActiveSection("schedule")}
                                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-medium"
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