"use client";
import React, { useState } from 'react';
import { FaCalendarAlt, FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import LawyerHeader from '@/app/Advocates/LawyerHeader/page'


const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Client Meeting - Smith Case',
      start: '2023-12-15T10:00:00',
      end: '2023-12-15T11:00:00',
      client: 'John Smith',
      type: 'meeting',
      location: 'Office'
    },
    {
      id: 2,
      title: 'Court Hearing - Johnson Case',
      start: '2023-12-18T14:00:00',
      end: '2023-12-18T15:30:00',
      client: 'Mary Johnson',
      type: 'hearing',
      location: 'District Court'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    client: '',
    type: 'meeting',
    location: ''
  });

  // Handle date click (for creating new events)
  const handleDateClick = (arg) => {
    setNewEvent({
      title: '',
      start: arg.dateStr,
      end: '',
      client: '',
      type: 'meeting',
      location: ''
    });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Handle event click (for viewing/editing events)
  const handleEventClick = (info) => {
    const event = events.find(e => e.id === parseInt(info.event.id));
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: format(new Date(event.start), 'yyyy-MM-dd\'T\'HH:mm'),
      end: event.end ? format(new Date(event.end), 'yyyy-MM-dd\'T\'HH:mm') : '',
      client: event.client,
      type: event.type,
      location: event.location
    });
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save event (both new and edited)
  const handleSaveEvent = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...newEvent,
      id: selectedEvent ? selectedEvent.id : Date.now(),
      start: new Date(newEvent.start),
      end: newEvent.end ? new Date(newEvent.end) : null
    };

    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? eventData : event
      ));
    } else {
      // Add new event
      setEvents([...events, eventData]);
    }

    setIsModalOpen(false);
  };

  // Delete event
  const handleDeleteEvent = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Replace with your LawyerHeader */}
      <LawyerHeader />
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Case Calendar</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100">
              <FaSearch className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          <button
            onClick={() => {
              setSelectedEvent(null);
              setNewEvent({
                title: '',
                start: '',
                end: '',
                client: '',
                type: 'meeting',
                location: ''
              });
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Event
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="70vh"
            editable={true}
            selectable={true}
            eventContent={(eventInfo) => (
              <div className="fc-event-main-frame">
                <div className="fc-event-title-container">
                  <div className="fc-event-title fc-sticky">
                    {eventInfo.event.title}
                  </div>
                </div>
                <div className="fc-event-time">
                  {eventInfo.timeText}
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="px-6 py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                  <input
                    type="datetime-local"
                    name="start"
                    value={newEvent.start}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                  <input
                    type="datetime-local"
                    name="end"
                    value={newEvent.end}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  type="text"
                  name="client"
                  value={newEvent.client}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="meeting">Meeting</option>
                  <option value="hearing">Court Hearing</option>
                  <option value="deadline">Deadline</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-between border-t pt-4">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                )}
                <div className="flex space-x-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {selectedEvent ? (
                      <>
                        <FaEdit className="mr-2" />
                        Update
                      </>
                    ) : (
                      <>
                        <FaPlus className="mr-2" />
                        Add Event
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;