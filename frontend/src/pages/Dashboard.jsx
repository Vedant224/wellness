import React, { useState, useEffect } from 'react';
import { sessionService } from '../services/session.service';
import SessionCard from '../components/SessionCard';
import toast from 'react-hot-toast';
import { HiOutlineSearch, HiOutlineTag, HiOutlineStar } from 'react-icons/hi';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [featuredSessions, setFeaturedSessions] = useState([]);
  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await sessionService.getAllSessions();
        const allSessions = response.data.data.sessions;
        setSessions(allSessions);
        
        // Set featured sessions (those with highest ratings or views)
        const featured = [...allSessions]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3);
        setFeaturedSessions(featured);
      } catch (error) {
        toast.error('Failed to load sessions');
        console.error("Error loading session", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSessions();
  }, []);
  
  const allTags = [...new Set(sessions.flatMap(session => session.tags || []))];
  
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || (session.tags && session.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });
  
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      {/* Removed top padding and made background extend fully */}
      <div className="container mx-auto px-4 py-20 pb-8">
        {/* Header with subtle gradient */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
            Browse Wellness Sessions
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <p className="mt-4 text-gray-300 max-w-2xl">
            Discover personalized wellness sessions for yoga, meditation, and mindfulness practices created by experts.
          </p>
        </div>
        
        {/* Featured sessions section - only show when not searching/filtering */}
        {!searchTerm && !selectedTag && featuredSessions.length > 0 && !isLoading && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <HiOutlineStar className="text-yellow-400 mr-2 h-5 w-5" />
              <h2 className="text-xl font-semibold text-white">Featured Sessions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredSessions.map(session => (
                <SessionCard 
                  key={`featured-${session._id}`} 
                  session={session}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Search and filter section with improved styling */}
        <div className="bg-black/30 backdrop-blur-sm p-5 rounded-xl border border-gray-800 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:max-w-xs">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                className="form-input pl-10 w-full bg-black/50 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 rounded-lg text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <HiOutlineTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select 
                className="form-input pl-10 min-w-[180px] bg-black/50 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 rounded-lg text-white appearance-none"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sessions grid with loading state */}
        {isLoading ? (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 flex flex-col items-center justify-center py-16">
            <div className="inline-block rounded-full h-10 w-10 border-4 border-gray-600 border-t-indigo-500 animate-spin"></div>
            <p className="mt-4 text-gray-300">Loading sessions...</p>
          </div>
        ) : filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map(session => (
              <SessionCard 
                key={session._id} 
                session={session}
              />
            ))}
          </div>
        ) : (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 text-center py-16">
            <p className="text-xl text-gray-300">No sessions found matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedTag('');}} 
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-md text-white"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* Session count indicator */}
        {!isLoading && filteredSessions.length > 0 && (
          <div className="mt-8 text-sm text-gray-400 text-right">
            Showing {filteredSessions.length} of {sessions.length} sessions
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;