"use client";
import Header from '@/app/header/page';
import React from 'react';

const CurrentHearingsPage = () => {
  const currentHearings = [
    {
      id: 'C-2023-2456',
      title: 'Sharma vs. Patel Property Dispute',
      time: '10:30 AM',
      judge: 'Hon. Justice Verma',
      status: 'In Progress',
      courtroom: 'Courtroom 4'
    },
    {
      id: 'C-2023-1892',
      title: 'Singh vs. Corporation Ltd',
      time: '11:45 AM',
      judge: 'Hon. Justice Kapoor',
      status: 'Pending',
      courtroom: 'Courtroom 2'
    },
    {
      id: 'C-2023-1567',
      title: 'Matrimonial Settlement - Gupta',
      time: '2:15 PM',
      judge: 'Hon. Justice Reddy',
      status: 'Upcoming',
      courtroom: 'Courtroom 1'
    }
  ];

  return (
    <>
      <Header />

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Current Hearings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 font-medium text-gray-700 dark:text-gray-300">
            <div className="col-span-2">Case ID</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-2">Judge</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Courtroom</div>
          </div>
          
          {currentHearings.map((hearing, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 p-4 items-center ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <div className="col-span-2 font-medium text-blue-600 dark:text-blue-400">{hearing.id}</div>
              <div className="col-span-4">{hearing.title}</div>
              <div className="col-span-1">{hearing.time}</div>
              <div className="col-span-2">{hearing.judge}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  hearing.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  hearing.status === 'Pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {hearing.status}
                </span>
              </div>
              <div className="col-span-1">{hearing.courtroom}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CurrentHearingsPage;