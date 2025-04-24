"use client";
import React from 'react';

const UpcomingHearingsPage = () => {
  const upcomingHearings = [
    {
      id: 'C-2023-3012',
      title: 'Commercial Arbitration - Tech Solutions Inc.',
      date: '2023-11-15',
      time: '10:00 AM',
      judge: 'Hon. Justice Sharma',
      type: 'Commercial',
      daysUntil: 3
    },
    {
      id: 'C-2023-2876',
      title: 'Family Settlement - Khanna',
      date: '2023-11-17',
      time: '11:30 AM',
      judge: 'Hon. Justice Kapoor',
      type: 'Family',
      daysUntil: 5
    },
    {
      id: 'C-2023-2654',
      title: 'Property Dispute - Oberoi Builders',
      date: '2023-11-20',
      time: '2:00 PM',
      judge: 'Hon. Justice Singh',
      type: 'Property',
      daysUntil: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Hearings</h1>
        
        <div className="space-y-4">
          {upcomingHearings.map((hearing, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{hearing.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{hearing.id}</p>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  {hearing.type}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Date</p>
                  <p className="text-gray-700 dark:text-gray-300">{hearing.date} ({hearing.daysUntil} days)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Time</p>
                  <p className="text-gray-700 dark:text-gray-300">{hearing.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Presiding Judge</p>
                  <p className="text-gray-700 dark:text-gray-300">{hearing.judge}</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-sm">
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingHearingsPage;