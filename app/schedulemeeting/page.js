"use client";
import { useState } from 'react';
import Header from '../header/page';
import { Video, Calendar, Clock, Mail, User } from 'lucide-react';

const ScheduleMeeting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    purpose: 'general',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00',
    '15:00', '16:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error('Failed to schedule meeting');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error scheduling meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Video className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meeting Scheduled!</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent a Zoom link to {formData.email} and your team.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-600">{formData.time} - {parseInt(formData.time.split(':')[0]) + 1}:00</p>
              </div>
            </div>
            <div className="flex items-start">
              <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{formData.name}</p>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Schedule Another Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-3">
            <Video className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule Zoom Meeting</h1>
          <p className="text-gray-600">Book your 30-minute video consultation</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Purpose
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="general">General Consultation</option>
                <option value="technical">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Zoom Meeting'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;