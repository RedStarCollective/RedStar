import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Users, Lock, Filter, AlertTriangle, Radio, Star, Shield, Heart, Eye, UserPlus, EyeOff } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, where, serverTimestamp, limit } from 'firebase/firestore';

const EncryptedComms = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [messageFilters, setMessageFilters] = useState({
    accessLevel: 'mass', // 'all', 'mass', 'candidate', 'committee'
    category: 'all' // 'all', 'alert', 'announcement', 'coordination', 'request', 'report'
  });
  const [showFilters, setShowFilters] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Subscribe to messages from Firestore when component mounts or filters change
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    
    // Create query based on current filters
    let messagesQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(50));
    
    // Apply additional filters if needed
    if (activeTab !== 'all') {
      messagesQuery = query(messagesQuery, where("accessLevel", "in", [activeTab, "all"]));
    }
    
    if (messageFilters.category !== 'all') {
      messagesQuery = query(messagesQuery, where("category", "==", messageFilters.category));
    }
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Format timestamp
        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messagesData.push({
          id: doc.id,
          ...data,
          time: timeString
        });
      });
      
      // Sort messages by timestamp
      messagesData.sort((a, b) => {
        const aTime = a.timestamp ? a.timestamp.toDate() : new Date();
        const bTime = b.timestamp ? b.timestamp.toDate() : new Date();
        return aTime - bTime;
      });
      
      setMessages(messagesData);
    });
    
    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [activeTab, messageFilters.category]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    try {
      // Get current user information
      const user = auth.currentUser;
      const sender = user ? user.displayName || user.email.split('@')[0] : 'Anonymous';
      
      // Create message object
      const messageData = {
        sender: sender,
        content: newMessage,
        timestamp: serverTimestamp(),
        accessLevel: messageFilters.accessLevel,
        category: 'coordination', // Default category
        priority: 'normal'
      };
      
      // Add message to Firestore
      await addDoc(collection(db, "messages"), messageData);
      
      // Clear the input
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    }
  };
  
  // Function to update message filters
  const updateFilter = (type, value) => {
    setMessageFilters({
      ...messageFilters,
      [type]: value
    });
  };
  
  // Get badge for message category
  const getCategoryBadge = (category, priority = 'normal') => {
    switch(category) {
      case 'alert':
        return (
          <span className={`px-1 py-0.5 rounded-sm text-xs flex items-center ${priority === 'high' ? 'bg-red-900/40 text-red-400 animate-pulse' : 'bg-red-900/30 text-red-400'}`}>
            <AlertTriangle size={10} className="mr-1" />
            ALERT
          </span>
        );
      case 'announcement':
        return (
          <span className="px-1 py-0.5 rounded-sm bg-blue-900/30 text-blue-400 text-xs flex items-center">
            <Radio size={10} className="mr-1" />
            ANNOUNCEMENT
          </span>
        );
      case 'coordination':
        return (
          <span className="px-1 py-0.5 rounded-sm bg-purple-900/30 text-purple-400 text-xs flex items-center">
            <Users size={10} className="mr-1" />
            COORDINATION
          </span>
        );
      case 'request':
        return (
          <span className="px-1 py-0.5 rounded-sm bg-green-900/30 text-green-400 text-xs flex items-center">
            <Heart size={10} className="mr-1" />
            REQUEST
          </span>
        );
      case 'report':
        return (
          <span className="px-1 py-0.5 rounded-sm bg-yellow-900/30 text-yellow-400 text-xs flex items-center">
            <Star size={10} className="mr-1" />
            REPORT
          </span>
        );
      default:
        return null;
    }
  };
  
  // Get icon for access level
  const getAccessLevelIcon = (level) => {
    switch(level) {
      case 'all':
        return <Radio size={12} className="text-green-500" />;
      case 'mass':
        return <Users size={12} className="text-blue-500" />;
      case 'candidate':
        return <UserPlus size={12} className="text-yellow-500" />;
      case 'committee':
        return <Star size={12} className="text-red-500" />;
      default:
        return <Users size={12} className="text-gray-500" />;
    }
  };

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <MessageSquare size={16} className="mr-2" />
          ENCRYPTED_COMMUNICATIONS
        </h3>
        <div className="text-xs text-green-500 font-mono flex items-center">
          <Lock size={12} className="mr-1" />
          E2E_SECURE
        </div>
      </div>
      
      {/* Comms navigation tabs */}
      <div className="flex border-b border-red-900 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'all' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Radio size={14} className="mr-1" />
          ALL_MESSAGES
        </button>
        <button 
          onClick={() => setActiveTab('mass')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'mass' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Users size={14} className="mr-1" />
          MASS_LINE
        </button>
        <button 
          onClick={() => setActiveTab('candidate')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'candidate' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <UserPlus size={14} className="mr-1" />
          CANDIDATE
        </button>
        <button 
          onClick={() => setActiveTab('committee')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'committee' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Star size={14} className="mr-1" />
          COMMITTEE
        </button>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 ml-auto whitespace-nowrap font-mono flex items-center text-gray-400 hover:bg-red-900/10"
        >
          <Filter size={14} className="mr-1" />
          FILTER
        </button>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="p-3 border-b border-red-900 bg-red-900/10">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-mono text-red-500">MESSAGE_FILTERS</h4>
            <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-300">
              <X size={14} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">CATEGORY:</div>
              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => updateFilter('category', 'all')}
                  className={`px-2 py-1 text-xs rounded ${messageFilters.category === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400'}`}
                >
                  ALL
                </button>
                <button 
                  onClick={() => updateFilter('category', 'alert')}
                  className={`px-2 py-1 text-xs rounded flex items-center ${messageFilters.category === 'alert' ? 'bg-red-900/50 text-red-400' : 'bg-red-900/20 text-gray-400'}`}
                >
                  <AlertTriangle size={10} className="mr-1" />
                  ALERTS
                </button>
                <button 
                  onClick={() => updateFilter('category', 'announcement')}
                  className={`px-2 py-1 text-xs rounded flex items-center ${messageFilters.category === 'announcement' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-900/20 text-gray-400'}`}
                >
                  <Radio size={10} className="mr-1" />
                  ANNOUNCEMENTS
                </button>
                <button 
                  onClick={() => updateFilter('category', 'request')}
                  className={`px-2 py-1 text-xs rounded flex items-center ${messageFilters.category === 'request' ? 'bg-green-900/50 text-green-400' : 'bg-green-900/20 text-gray-400'}`}
                >
                  <Heart size={10} className="mr-1" />
                  REQUESTS
                </button>
                <button 
                  onClick={() => updateFilter('category', 'report')}
                  className={`px-2 py-1 text-xs rounded flex items-center ${messageFilters.category === 'report' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-900/20 text-gray-400'}`}
                >
                  <Star size={10} className="mr-1" />
                  REPORTS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Message content area */}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-mono text-red-500 flex items-center">
              <Lock size={14} className="mr-1" />
              SECURE_MESSAGES
            </h4>
            
            {/* Select who can see your message (for sending) */}
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">SENDING TO:</span>
              <select 
                className="bg-black border border-red-900 rounded p-1 text-xs font-mono text-gray-300"
                value={messageFilters.accessLevel}
                onChange={(e) => updateFilter('accessLevel', e.target.value)}
              >
                <option value="all">EVERYONE</option>
                <option value="mass">MASS LINE+</option>
                <option value="candidate">CANDIDATES+</option>
                <option value="committee">COMMITTEE ONLY</option>
              </select>
            </div>
          </div>
          
          {/* Messages list */}
          <div className="border border-red-900 bg-black rounded mb-3 h-96 overflow-y-auto p-3 space-y-3 font-mono">
            {messages.length > 0 ? (
              messages.map(msg => (
                <div key={msg.id} className={`${msg.priority === 'high' ? 'border-red-500' : 'border-red-900/30'} border rounded p-2 bg-black`}>
                  <div className="flex justify-between text-xs mb-1">
                    <div className="flex items-center">
                      <span className="text-red-500 font-bold mr-2">{msg.sender}</span>
                      <div className="flex items-center text-gray-500">
                        {getAccessLevelIcon(msg.accessLevel)}
                        <span className="ml-1 text-[10px]">
                          {msg.accessLevel === 'all' ? 'ALL' : 
                           msg.accessLevel === 'mass' ? 'MASS+' : 
                           msg.accessLevel === 'candidate' ? 'CANDIDATE+' : 
                           'COMMITTEE'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getCategoryBadge(msg.category, msg.priority)}
                      <span className="text-gray-500 ml-2">{msg.time}</span>
                    </div>
                  </div>
                  <div className="p-1 text-sm text-gray-300">
                    {msg.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No messages match your current filters</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSendMessage} className="flex">
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type message for ${messageFilters.accessLevel === 'all' ? 'EVERYONE' : messageFilters.accessLevel === 'mass' ? 'MASS LINE+' : messageFilters.accessLevel === 'candidate' ? 'CANDIDATES+' : 'COMMITTEE ONLY'}...`}
              className="flex-grow bg-black border border-red-900 rounded-l p-2 text-sm focus:outline-none focus:border-red-700"
            />
            <button 
              type="submit"
              className="bg-red-900 border border-red-700 border-l-0 rounded-r px-4 text-white flex items-center hover:bg-red-800"
              disabled={!newMessage.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
        
        {/* Communication protocols */}
        <div className="border border-red-900 rounded-lg p-3 bg-black">
          <h4 className="text-xs font-mono text-red-500 mb-2">COMMUNICATION_PROTOCOLS</h4>
          <div className="text-xs text-gray-300 space-y-2">
            <p>• All messages are end-to-end encrypted and automatically deleted after 72 hours</p>
            <p>• High-priority alerts will be pushed to connected devices with appropriate clearance</p>
            <p>• For ultra-sensitive communications, use face-to-face meetings or designated secure channels</p>
            <p>• Verify information before taking action on any security-related alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptedComms;