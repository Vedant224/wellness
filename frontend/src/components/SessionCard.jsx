import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClock, HiOutlineUser, HiOutlineTag } from 'react-icons/hi';

const SessionCard = ({ session, featured = false }) => {
  const {
    _id,
    title,
    description,
    tags
  } = session;
  
  // Limit description to a certain length
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  return (
    <div className={`relative overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1 h-full ${featured ? 'ring-2 ring-indigo-500/40' : ''}`}>
      {/* Gradient border effect */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-100 blur-[1px]"></div>
      
      {/* Card content */}
      <div className="relative bg-black bg-opacity-80 backdrop-blur-sm border border-gray-800 rounded-xl p-5 h-full flex flex-col">
        {featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-medium">
              Featured
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        
        <p className="text-gray-300 text-sm mb-4 flex-grow">
          {truncateDescription(description)}
        </p>
        
        <div className="mt-auto">
          
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <div key={index} className="inline-flex items-center px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                  <HiOutlineTag className="mr-1" size={10} />
                  {tag}
                </div>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-400">+{tags.length - 3} more</span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-end">
            <Link 
              to={`/session/${_id}`} 
              className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;