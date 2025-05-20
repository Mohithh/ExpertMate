"use client";
import React from "react";
import { FaBalanceScale, FaUserTie, FaCalendarAlt, FaFileContract, FaChartLine, FaBell, FaRocket } from "react-icons/fa";

const DashboardPage = () => {
  // Empty state data
  const caseStats = [
    { title: "Active Cases", value: 0, change: "0", trend: "neutral" },
    { title: "Closed Cases", value: 0, change: "0", trend: "neutral" },
    { title: "Upcoming Hearings", value: 0, change: "0", trend: "neutral" },
    { title: "New Clients", value: 0, change: "0", trend: "neutral" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">Preparing to launch your legal practice</p>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/notifications" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 relative">
            <FaBell className="text-gray-600" />
          </a>
          <a href="/profile" className="flex items-center space-x-2">
           
          </a>
        </div>
      </div>

      {/* Launch Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Launch Your Practice?</h2>
            <p className="max-w-2xl">Your legal dashboard is set up and ready to go. We'll be launching publicly this month!</p>
          </div>
          <a 
            href="/launch-checklist" 
            className="mt-4 md:mt-0 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center"
          >
            <FaRocket className="mr-2" />
            Launch Checklist
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {caseStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.trend === "up" ? "bg-green-100 text-green-600" : 
                stat.trend === "down" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <FaChartLine className={`mr-1 ${
                stat.trend === "up" ? "text-green-500" : 
                stat.trend === "down" ? "text-red-500" : "text-gray-500"
              }`} />
              {stat.trend === "up" ? "Increase" : stat.trend === "down" ? "Decrease" : "No change"} from last week
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Cases</h2>
            <a href="/cases" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </a>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <FaFileContract className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No cases yet</h3>
            <p className="text-gray-500 mb-4">
              When you start adding cases, they'll appear here for quick access.
            </p>
            <a
              href="/cases/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Add Your First Case
            </a>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
            <a href="/calendar" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View Calendar
            </a>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <FaCalendarAlt className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No upcoming events</h3>
            <p className="text-gray-500 mb-4">
              Schedule hearings, meetings, and deadlines to see them here.
            </p>
            <a
              href="/calendar/new-event"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Schedule Event
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Get Started</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/cases/new"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <FaFileContract className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">New Case</span>
          </a>
          <a
            href="/clients/add"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <FaUserTie className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Client</span>
          </a>
          <a
            href="/calendar"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <FaCalendarAlt className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Schedule</span>
          </a>
          <a
            href="/resources/forms"
            className="flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-blue-50 rounded-lg transition"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <FaBalanceScale className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Court Forms</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;