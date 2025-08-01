import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sessionService } from '../services/session.service';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineCollection, HiOutlinePencilAlt, HiOutlineGlobeAlt } from 'react-icons/hi';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });
  
  useEffect(() => {
    fetchSessions();
  }, []);
  
  useEffect(() => {
    // Update stats whenever sessions change
    if (sessions.length) {
      setStats({
        total: sessions.length,
        published: sessions.filter(s => s.status === 'published').length,
        draft: sessions.filter(s => s.status === 'draft').length
      });
    }
  }, [sessions]);
  
  const fetchSessions = async () => {
    try {
      const response = await sessionService.getMySessions();
      setSessions(response.data.data.sessions);
    } catch (error) {
      toast.error('Failed to load your sessions');
      console.error("Error loading sessions", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await sessionService.deleteSession(id);
        toast.success('Session deleted successfully');
        
        setSessions(sessions.filter(session => session._id !== id));
      } catch (error) {
        toast.error('Failed to delete session');
        console.error("Error deleting session", error);
      }
    }
  };
  
  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });
  
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20 pb-8">
        {/* Header section with gradient text */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              My Sessions
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          </div>
          <Link 
            to="/editor" 
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center gap-2"
          >
            <HiOutlinePlus className="h-5 w-5" />
            Create New Session
          </Link>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center">
            <div className="p-3 bg-indigo-900/30 rounded-lg mr-4">
              <HiOutlineCollection className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Sessions</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center">
            <div className="p-3 bg-green-900/30 rounded-lg mr-4">
              <HiOutlineGlobeAlt className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Published</p>
              <p className="text-white text-2xl font-bold">{stats.published}</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center">
            <div className="p-3 bg-purple-900/30 rounded-lg mr-4">
              <HiOutlinePencilAlt className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Drafts</p>
              <p className="text-white text-2xl font-bold">{stats.draft}</p>
            </div>
          </div>
        </div>
        
        {/* Filter tabs with improved styling */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                  : 'bg-black/50 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setFilter('all')}
            >
              All Sessions
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'published' 
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white' 
                  : 'bg-black/50 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setFilter('published')}
            >
              Published
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'draft' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'bg-black/50 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setFilter('draft')}
            >
              Drafts
            </button>
          </div>
        </div>
        
        {/* Session cards or loading state */}
        {isLoading ? (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 flex flex-col items-center justify-center py-16">
            <div className="inline-block rounded-full h-10 w-10 border-4 border-gray-600 border-t-indigo-500 animate-spin"></div>
            <p className="mt-4 text-gray-300">Loading your sessions...</p>
          </div>
        ) : filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map(session => (
              <MySessionCard 
                key={session._id} 
                session={session}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 text-center py-16 px-4">
            <HiOutlineCollection className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No {filter !== 'all' ? filter : ''} sessions found</h3>
            <p className="text-gray-400 mb-6">
              {filter === 'all' 
                ? "You haven't created any sessions yet." 
                : filter === 'published' 
                  ? "You don't have any published sessions yet." 
                  : "You don't have any draft sessions yet."
              }
            </p>
            <Link 
              to="/editor" 
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <HiOutlinePlus className="h-5 w-5" />
              Create Your First Session
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const MySessionCard = ({ session, onDelete }) => {
  const {
    _id,
    title,
    tags = [],
    status
  } = session;
  
  return (
    <div className="relative overflow-hidden rounded-xl transition-transform hover:-translate-y-1 duration-300 h-full">
      {/* Gradient border effect */}
      <div className={`absolute -inset-px rounded-xl ${
        status === 'published' 
          ? 'bg-gradient-to-r from-green-500 to-teal-500' 
          : 'bg-gradient-to-r from-purple-500 to-pink-500'
      } opacity-30 blur-[1px]`}></div>
      
      {/* Card content */}
      <div className="relative bg-black bg-opacity-80 backdrop-blur-sm border border-gray-800 rounded-xl p-5 h-full flex flex-col">
        {/* Status badge */}
        <div className="absolute top-0 right-0">
          <div className={`text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-medium ${
            status === 'published' 
              ? 'bg-gradient-to-r from-green-600 to-teal-600' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`}>
            {status === 'published' ? 'Published' : 'Draft'}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-white pr-16">{title}</h3>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <div key={index} className="inline-flex items-center px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                {tag}
              </div>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-400">+{tags.length - 3} more</span>
            )}
          </div>
        )}
        
        {/* Action buttons - moved to fill space where dates were */}
        <div className="mt-auto">
          <div className="flex justify-between items-center pt-4 border-t border-gray-800">
            <button 
              onClick={() => onDelete(_id)} 
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              Delete
            </button>
            <div className="flex gap-2">
              <Link 
                to={`/editor/${_id}`} 
                className="px-3 py-1 border border-indigo-600 text-indigo-400 rounded text-sm hover:bg-indigo-900/30 transition-colors"
              >
                Edit
              </Link>
              <Link 
                to={`/session/${_id}`} 
                className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySessions;