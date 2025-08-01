import { useState, useEffect, useRef } from 'react';
import { sessionService } from '../services/session.service';
import toast from 'react-hot-toast';

const useAutoSave = (initialFormData = {}, debounceTime = 5000) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveData = async () => {
    
    if (!formData.title || !formData.json_file_url) return;
    setIsSaving(true);
    try {
      await sessionService.saveDraft(formData);
      setLastSaved(new Date());
      toast.success('Draft saved automatically');
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (formData.title || formData.json_file_url) {
      timerRef.current = setTimeout(() => {
        saveData();
      }, debounceTime);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [formData, debounceTime]);

  return {
    formData,
    setFormData,
    handleChange,
    isSaving,
    lastSaved,
    saveData
  };
};

export default useAutoSave;