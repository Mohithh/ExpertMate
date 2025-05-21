'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LawyerHeader from '@/app/Advocates/LawyerHeader/page';

const ConferenceRoomPage = () => {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBooking = (e) => {
    e.preventDefault();
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem("token");
    if (isLoggedIn) {
      window.open(`https://cal.com/settlesmart/schedule-meeting${selectedRoom ? `?room=${selectedRoom}` : ''}`, '_blank');
    } else {
      router.push(`/login?redirect=/conference-rooms${selectedRoom ? `&room=${selectedRoom}` : ''}`);
    }
  };

  const conferenceRooms = [
    {
      id: 'main',
      name: 'Executive Boardroom',
      image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      capacity: '12 people',
      description: 'Our premier space for high-stakes negotiations and client presentations',
      highlights: ['4K OLED video conferencing', 'Built-in recording system', 'Secure document sharing', 'Acoustic privacy'],
    },
    {
      id: 'medium',
      name: 'Partner Conference Room',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      capacity: '8 people',
      description: 'Ideal for case strategy sessions and mediation meetings',
      highlights: ['Dedicated legal tech station', 'Confidential document disposal', 'Direct videoconference recording', 'Ambient noise masking'],
    },
    {
      id: 'small',
      name: 'Client Consultation Suite',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      capacity: '4 people',
      description: 'Private space for sensitive client discussions',
      highlights: ['Attorney-client privilege ensured', 'Secure digital whiteboard', 'Discreet service entrance', 'Soundproof construction'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <LawyerHeader />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 opacity-20 blur-2xl z-0"
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle cx="400" cy="400" r="400" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) scale(400)">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Abstract legal pattern */}
        <svg 
          className="absolute right-0 bottom-0 opacity-10"
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path d="M300 0L600 300L300 600L0 300L300 0Z" stroke="#1E3A8A" strokeWidth="2"/>
          <path d="M150 150L450 150L450 450L150 450L150 150Z" stroke="#1E3A8A" strokeWidth="2"/>
          <path d="M225 225L375 225L375 375L225 375L225 225Z" stroke="#1E3A8A" strokeWidth="2"/>
        </svg>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 0L1000 500H0V0Z" fill="url(#hero-gradient)" />
            <defs>
              <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional Conference Facilities
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Secure, technology-enabled meeting spaces designed specifically for legal professionals
            </p>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-8">
            <svg className="w-12 h-12 text-blue-300 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <svg className="w-12 h-12 text-blue-300 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <svg className="w-12 h-12 text-blue-300 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Room Selection Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Meeting Space</h2>
          <div className="flex justify-center">
            <svg className="w-24 h-1 text-blue-600">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Each room offers complete confidentiality and state-of-the-art legal technology
          </p>
        </motion.div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {conferenceRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-xl overflow-hidden border-2 shadow-lg transition-all duration-300 ${selectedRoom === room.id ? 'border-blue-600 ring-4 ring-blue-100' : 'border-transparent hover:border-blue-300'}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              {/* Room Image with SVG */}
              <div className="relative h-64 cursor-pointer bg-gray-100 flex items-center justify-center">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex items-end">
                  <div>
                    <h3 className="text-xl text-white font-bold">{room.name}</h3>
                    <p className="text-blue-200">{room.capacity}</p>
                  </div>
                </div>
                {selectedRoom === room.id && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Room Details */}
              <div className="p-6 bg-white">
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Features</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {room.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Room Badge */}
              <div className="absolute top-4 left-4 bg-white text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                {room.id === 'main' ? 'Premium' : room.id === 'medium' ? 'Standard' : 'Compact'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden md:flex border border-gray-100"
        >
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedRoom
                ? `Ready to book the ${conferenceRooms.find(r => r.id === selectedRoom)?.name}?`
                : 'Select a conference room to schedule your meeting'}
            </h2>
            <p className="text-gray-600 mb-6">
              {selectedRoom
                ? 'Our scheduling system will show you available times for this premium legal meeting space.'
                : 'All rooms include secure document handling, privileged communication protection, and professional support.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBooking}
                disabled={!selectedRoom}
                className={`py-3 px-6 flex-1 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center ${
                  selectedRoom ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedRoom ? 'Schedule Meeting' : 'Select a Room First'}
              </motion.button>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3 relative bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 400" 
                fill="none" 
                className="text-blue-200"
              >
                <rect x="50" y="100" width="300" height="200" rx="10" stroke="currentColor" strokeWidth="2" fill="white" />
                <circle cx="100" cy="150" r="20" fill="#3B82F6" opacity="0.7" />
                <rect x="140" y="140" width="120" height="20" rx="5" fill="#E5E7EB" />
                <rect x="140" y="170" width="80" height="20" rx="5" fill="#E5E7EB" />
                <rect x="280" y="140" width="50" height="20" rx="5" fill="#3B82F6" />
                <rect x="280" y="170" width="50" height="20" rx="5" fill="#3B82F6" />
                <path d="M80 200H320" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" />
                <circle cx="100" cy="250" r="20" fill="#3B82F6" opacity="0.7" />
                <rect x="140" y="240" width="120" height="20" rx="5" fill="#E5E7EB" />
                <rect x="140" y="270" width="80" height="20" rx="5" fill="#E5E7EB" />
                <rect x="280" y="240" width="50" height="20" rx="5" fill="#3B82F6" />
                <rect x="280" y="270" width="50" height="20" rx="5" fill="#3B82F6" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-sm text-blue-800 font-medium">Confidentiality Guaranteed</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Access</h3>
            </div>
            <p className="text-gray-600">All rooms feature biometric access control and 24/7 monitoring to ensure complete privacy for your meetings.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Attorney Privilege</h3>
            </div>
            <p className="text-gray-600">Special provisions to maintain attorney-client privilege, including secure document handling and private meeting protocols.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tech Support</h3>
            </div>
            <p className="text-gray-600">Dedicated IT support available for all legal technology needs during your meeting, with priority response for premium rooms.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceRoomPage;