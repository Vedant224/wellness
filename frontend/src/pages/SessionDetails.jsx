import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sessionService } from '../services/session.service';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { HiOutlineClock, HiOutlineUser, HiOutlineCalendar, HiOutlineTag, HiOutlineArrowLeft } from 'react-icons/hi';

const SessionDetails = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        setIsLoading(true);
        const response = await sessionService.getSessionById(id);
        setSession(response.data.data.session);
      } catch (error) {
        console.error('Error fetching session details:', error);
        toast.error('Failed to load session details');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchSessionDetails();
    }
  }, [id]);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMMM dd, yyyy');
  };
  
  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block rounded-full h-10 w-10 border-4 border-gray-600 border-t-indigo-500 animate-spin"></div>
          <p className="mt-4 text-gray-300">Loading session details...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Session Not Found</h2>
            <p className="text-gray-300 mb-6">The session you are looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard" className="inline-flex items-center text-indigo-400 hover:text-indigo-300">
              <HiOutlineArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-20 pb-8">
        {/* Back button */}
        <Link to="/dashboard" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
          <HiOutlineArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-6 md:p-8 border-b border-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{session.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mt-4">
              <div className="flex items-center">
                <HiOutlineUser className="mr-2" />
                <span>{session.creator?.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center">
                <HiOutlineClock className="mr-2" />
                <span>{session.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <HiOutlineCalendar className="mr-2" />
                <span>Created {formatDate(session.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{session.description || 'No description provided.'}</p>
              </div>
            </div>
            
            {/* Tags */}
            {session.tags && session.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {session.tags.map(tag => (
                    <div key={tag} className="inline-flex items-center px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full">
                      <HiOutlineTag className="mr-2" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Session content - assuming there's content structure */}
            {session.content && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Session Content</h2>
                <div className="bg-black/50 border border-gray-800 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{JSON.stringify(session.content, null, 2)}</pre>
                </div>
              </div>
            )}
            
            {/* Additional notes or instructions */}
            {session.notes && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Notes</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">{session.notes}</p>
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-12 pt-6 border-t border-gray-800">
              <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors">
                Start Session
              </button>
              <button className="px-5 py-2 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;