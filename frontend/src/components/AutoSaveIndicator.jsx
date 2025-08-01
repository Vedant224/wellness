import React from 'react';
import { HiOutlineSave, HiOutlineCheck, HiOutlineClock } from 'react-icons/hi';

const AutoSaveIndicator = ({ isSaving, lastSaved }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  return (
    <div className="flex items-center text-sm">
      {isSaving ? (
        <div className="flex items-center text-indigo-400">
          <HiOutlineSave className="animate-pulse mr-2 h-5 w-5" />
          <span>Saving your changes...</span>
        </div>
      ) : lastSaved ? (
        <div className="flex items-center text-green-400">
          <HiOutlineCheck className="mr-2 h-5 w-5" />
          <span>
            Last saved at {formatTime(lastSaved)}
          </span>
        </div>
      ) : (
        <div className="flex items-center text-gray-400">
          <HiOutlineClock className="mr-2 h-5 w-5" />
          <span>Changes will be auto-saved as you type</span>
        </div>
      )}
    </div>
  );
};

export default AutoSaveIndicator;