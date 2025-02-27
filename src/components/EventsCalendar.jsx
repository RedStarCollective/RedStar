import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, MapPin, User, Clock, Plus, X, Check, ChevronLeft, 
  ChevronRight, Info, AlertTriangle, Star 
} from 'lucide-react';

const EventsCalendar = ({ events: initialEvents = [], onAddEvent }) => {
  // State for calendar date management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // State for events management
  const [events, setEvents] = useState(initialEvents);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    organizer: '',
    description: '',
    category: 'general' // 'general', 'defense', 'education', 'mutual-aid'
  });

  // Update events whenever initialEvents changes
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);
  
  // Calendar navigation functions
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Get events for a specific day
  const getEventsForDay = (year, month, day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      );
    });
  };
  
  // Format date for display
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  // Handle adding a new event
  const handleAddEvent = () => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
    
    const eventToAdd = {
      id: Date.now(), // simple ID generation
      title: newEvent.title,
      location: newEvent.location,
      date: `${formattedDate}T${newEvent.time}`,
      organizer: newEvent.organizer,
      description: newEvent.description,
      category: newEvent.category,
      attendees: 0
    };
    
    const updatedEvents = [...events, eventToAdd];
    setEvents(updatedEvents);
    
    // Call parent callback if provided
    if (onAddEvent) {
      onAddEvent(eventToAdd);
    }
    
    // Reset form and close modal
    setNewEvent({
      title: '',
      location: '',
      date: '',
      time: '',
      organizer: '',
      description: '',
      category: 'general'
    });
    setShowAddEventModal(false);
  };
  
  // Render the calendar grid
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-red-900/20 bg-black/30"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(currentYear, currentMonth, day);
      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === currentMonth && 
        new Date().getFullYear() === currentYear;
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-red-900/20 bg-black/30 p-1 relative ${isToday ? 'border-red-500' : ''}`}
          onClick={() => {
            setSelectedDate(day);
            setShowAddEventModal(true);
          }}
        >
          <div className={`text-xs mb-1 font-mono ${isToday ? 'bg-red-900 text-white px-1 rounded' : ''}`}>
            {day}
          </div>
          
          {dayEvents.length > 0 && (
            <div className="overflow-y-auto max-h-16 space-y-1">
              {dayEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="text-xs p-1 bg-red-900/20 border border-red-900/30 rounded truncate cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setShowEventDetailsModal(true);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
          
          {dayEvents.length > 2 && (
            <div className="absolute bottom-1 right-1 text-xs text-red-500">
              +{dayEvents.length - 2} more
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'defense':
        return <AlertTriangle size={14} className="text-red-500" />;
      case 'education':
        return <Info size={14} className="text-blue-500" />;
      case 'mutual-aid':
        return <Star size={14} className="text-yellow-500" />;
      default:
        return <Calendar size={14} className="text-green-500" />;
    }
  };

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Calendar size={16} className="mr-2" />
          REVOLUTIONARY_CALENDAR
        </h3>
        <button 
          onClick={() => {
            setSelectedDate(new Date().getDate());
            setShowAddEventModal(true);
          }}
          className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono flex items-center"
        >
          <Plus size={14} className="mr-1" />
          ADD_EVENT
        </button>
      </div>
      
      {/* Calendar header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={goToPrevMonth}
            className="p-2 border border-red-900 rounded hover:bg-red-900/20"
          >
            <ChevronLeft size={16} className="text-red-500" />
          </button>
          
          <h2 className="text-xl font-mono">
            {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button 
            onClick={goToNextMonth}
            className="p-2 border border-red-900 rounded hover:bg-red-900/20"
          >
            <ChevronRight size={16} className="text-red-500" />
          </button>
        </div>
        
        {/* Day of week headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-red-500 font-mono text-xs p-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
        
        {/* Events legend */}
        <div className="mt-4 border-t border-red-900/30 pt-3 flex flex-wrap gap-2">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-red-900/30 border border-red-900/50 mr-1"></div>
            <span className="text-gray-500">Defense Committee</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-blue-900/30 border border-blue-900/50 mr-1"></div>
            <span className="text-gray-500">Education Committee</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-yellow-900/30 border border-yellow-900/50 mr-1"></div>
            <span className="text-gray-500">Mutual Aid</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 bg-green-900/30 border border-green-900/50 mr-1"></div>
            <span className="text-gray-500">General</span>
          </div>
        </div>
      </div>
      
      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-red-900 rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAddEventModal(false)} 
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-mono text-red-500 font-bold mb-4">ADD_EVENT</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">TITLE</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-red-500 font-mono mb-1">DATE</label>
                  <div className="text-sm p-2 border border-red-900 bg-black rounded">
                    {formatDate(new Date(currentYear, currentMonth, selectedDate))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-red-500 font-mono mb-1">TIME</label>
                  <input 
                    type="time" 
                    className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">LOCATION</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">ORGANIZER</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newEvent.organizer}
                  onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">DESCRIPTION</label>
                <textarea 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700 h-24"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">CATEGORY</label>
                <select 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                >
                  <option value="general">General</option>
                  <option value="defense">Defense Committee</option>
                  <option value="education">Education Committee</option>
                  <option value="mutual-aid">Mutual Aid</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 border border-red-900 text-red-500 rounded hover:bg-red-900/20"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-red-900 border border-red-700 text-white rounded hover:bg-red-800"
                  disabled={!newEvent.title || !newEvent.time}
                >
                  <Check size={16} className="mr-1 inline" />
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Event Details Modal */}
      {showEventDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-red-900 rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowEventDetailsModal(false)} 
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center mb-4">
              {getCategoryIcon(selectedEvent.category)}
              <h2 className="text-xl font-mono text-red-500 font-bold ml-2">{selectedEvent.title}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock size={16} className="text-red-500 mr-2 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-mono">DATE & TIME</div>
                  <div className="text-sm">
                    {new Date(selectedEvent.date).toLocaleDateString()} at {new Date(selectedEvent.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin size={16} className="text-red-500 mr-2 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-mono">LOCATION</div>
                  <div className="text-sm">{selectedEvent.location}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <User size={16} className="text-red-500 mr-2 mt-1" />
                <div>
                  <div className="text-xs text-gray-500 font-mono">ORGANIZER</div>
                  <div className="text-sm">{selectedEvent.organizer}</div>
                </div>
              </div>
              
              {selectedEvent.description && (
                <div className="pt-2 border-t border-red-900/30">
                  <div className="text-xs text-gray-500 font-mono mb-1">DESCRIPTION</div>
                  <p className="text-sm">{selectedEvent.description}</p>
                </div>
              )}
              
              <div className="pt-2 border-t border-red-900/30 flex items-center justify-between">
                <div className="flex items-center">
                  <Users size={16} className="text-red-500 mr-2" />
                  <span className="text-sm">{selectedEvent.attendees} attending</span>
                </div>
                <button className="px-3 py-1 bg-red-900 border border-red-700 text-white text-xs rounded hover:bg-red-800 font-mono">
                  ATTEND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsCalendar;