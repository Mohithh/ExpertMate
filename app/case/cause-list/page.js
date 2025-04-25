"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const OverviewPage = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Case Management Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            onClick={() => router.push('/case/current-hearings')}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Hearings</h2>
            <p className="text-gray-600 dark:text-gray-400">View cases being heard today</p>
          </div>
          
          <div 
            onClick={() => router.push('/case/upcoming-hearings')}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Upcoming Hearings</h2>
            <p className="text-gray-600 dark:text-gray-400">View scheduled future cases</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Case Statistics</h2>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="block">Total Cases: 124</span>
              <span className="block">Active Cases: 42</span>
              <span className="block">Resolved This Month: 18</span>
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="text-gray-600 dark:text-gray-400">Case #2456 - Status updated to "In Progress"</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">2 hours ago</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="text-gray-600 dark:text-gray-400">New document uploaded for Case #1892</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;