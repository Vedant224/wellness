import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAutoSave from '../hooks/useAutoSave';
import { sessionService } from '../services/session.service';
import AutoSaveIndicator from '../components/AutoSaveIndicator';
import toast from 'react-hot-toast';
import { HiOutlineDocumentText, HiOutlineTag, HiOutlineLink, HiOutlineArrowLeft, HiOutlineSave, HiOutlineGlobeAlt, HiOutlineX } from 'react-icons/hi';

const SessionEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayTags, setDisplayTags] = useState([]);
  
  const initialFormData = {
    sessionId: id || '',
    title: '',
    tags: '',
    json_file_url: '',
    status: 'draft'
  };
  
  const { 
    formData, 
    setFormData, 
    handleChange, 
    isSaving, 
    lastSaved,
    saveData: _saveData
  } = useAutoSave(initialFormData);
  
  // Process tags for display
  useEffect(() => {
    if (formData.tags) {
      const tagArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      setDisplayTags(tagArray);
    } else {
      setDisplayTags([]);
    }
  }, [formData.tags]);
  
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      
      try {
        const response = await sessionService.getSessionById(id);
        const session = response.data.data.session;
        
        setFormData({
          sessionId: session._id,
          title: session.title,
          tags: session.tags ? session.tags.join(', ') : '',
          json_file_url: session.json_file_url,
          status: session.status
        });
      } catch (error) {
        toast.error('Failed to load session data');
        console.error(error);
        navigate('/my-sessions');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSession();
  }, [id, navigate, setFormData]);
  
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return toast.error('Please enter a title');
    }
    if (!formData.json_file_url.trim()) {
      return toast.error('Please enter a JSON file URL');
    }
    
    setIsSubmitting(true);
    
    try {
      await sessionService.publishSession({
        sessionId: formData.sessionId,
        title: formData.title,
        tags: formData.tags,
        json_file_url: formData.json_file_url
      });
      
      toast.success('Session published successfully');
      navigate('/my-sessions');
    } catch (error) {
      toast.error('Failed to publish session');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return toast.error('Please enter a title');
    }
    
    if (!formData.json_file_url.trim()) {
      return toast.error('Please enter a JSON file URL');
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await sessionService.saveDraft({
        sessionId: formData.sessionId,
        title: formData.title,
        tags: formData.tags,
        json_file_url: formData.json_file_url
      });
      
      if (!formData.sessionId) {
        setFormData(prev => ({
          ...prev,
          sessionId: response.data.data.session._id
        }));
      }
      
      toast.success('Draft saved successfully');
    } catch (error) {
      toast.error('Failed to save draft');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="inline-block rounded-full h-10 w-10 border-4 border-gray-600 border-t-indigo-500 animate-spin"></div>
          <p className="mt-4 text-gray-300">Loading session data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link to="/my-sessions" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6">
            <HiOutlineArrowLeft className="mr-2" />
            Back to My Sessions
          </Link>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              {id ? 'Edit Session' : 'Create New Session'}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mt-2"></div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg">
            <form>
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 font-medium text-white">Session Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineDocumentText className="text-gray-400 h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="pl-10 w-full px-4 py-2 bg-black/50 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 rounded-lg text-white"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter session title"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="tags" className="block mb-2 font-medium text-white">Tags (comma-separated)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineTag className="text-gray-400 h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="pl-10 w-full px-4 py-2 bg-black/50 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 rounded-lg text-white"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="yoga, meditation, beginner"
                  />
                </div>
                
                {/* Display tags */}
                {displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {displayTags.map((tag, index) => (
                      <div key={index} className="inline-flex items-center px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="json_file_url" className="block mb-2 font-medium text-white">JSON File URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLink className="text-gray-400 h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="json_file_url"
                    name="json_file_url"
                    className="pl-10 w-full px-4 py-2 bg-black/50 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-500/20 rounded-lg text-white"
                    value={formData.json_file_url}
                    onChange={handleChange}
                    placeholder="https://example.com/session.json"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">Enter a URL for your session's JSON configuration file</p>
              </div>
              
              {/* Auto-save indicator */}
              <div className="bg-black/40 border border-gray-800 rounded-lg p-3 mb-6">
                <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  onClick={() => navigate('/my-sessions')}
                  disabled={isSubmitting}
                >
                  <HiOutlineX className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-indigo-600 text-indigo-400 rounded-lg hover:bg-indigo-900/30 transition-colors flex items-center justify-center gap-2"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                  >
                    <HiOutlineSave className="h-5 w-5" />
                    <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
                  </button>
                  
                  <button
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                  >
                    <HiOutlineGlobeAlt className="h-5 w-5" />
                    <span>{isSubmitting ? 'Publishing...' : 'Publish'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;