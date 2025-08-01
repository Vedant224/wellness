const Session = require('../models/session.model');
const { AppError } = require('../utils/appError');

// Get all public sessions (published only)
exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .sort({ created_at: -1 });
    
    res.status(200).json({
      status: 'success',
      results: sessions.length,
      data: {
        sessions
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all sessions for current user (both draft and published)
exports.getMySessionss = async (req, res, next) => {
  try {
    const sessions = await Session.find({ user_id: req.user._id })
      .sort({ updated_at: -1 });
    
    res.status(200).json({
      status: 'success',
      results: sessions.length,
      data: {
        sessions
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get a single session by ID
exports.getMySession = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    
    if (!session) {
      return next(new AppError('No session found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    next(error);
  }
};

// Save or update a draft session
exports.saveDraft = async (req, res, next) => {
  try {
    const { title, tags, json_file_url, sessionId } = req.body;
    
    // Validate required fields
    if (!title || !json_file_url) {
      return next(new AppError('Title and JSON file URL are required', 400));
    }
    
    // Process tags if provided as comma-separated string
    const processedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    let session;
    
    if (sessionId) {
      // Update existing session
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: req.user._id },
        { 
          title, 
          tags: processedTags, 
          json_file_url,
          status: 'draft',
          updated_at: Date.now()
        },
        { new: true, runValidators: true }
      );
      
      if (!session) {
        return next(new AppError('No session found with that ID', 404));
      }
    } else {
      // Create new session
      session = await Session.create({
        title,
        tags: processedTags,
        json_file_url,
        status: 'draft',
        user_id: req.user._id
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    next(error);
  }
};

// Publish a session
exports.publishSession = async (req, res, next) => {
  try {
    const { sessionId, title, tags, json_file_url } = req.body;
    
    // Validate required fields
    if (!title || !json_file_url) {
      return next(new AppError('Title and JSON file URL are required', 400));
    }
    
    // Process tags if provided as comma-separated string
    const processedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
    let session;
    
    if (sessionId) {
      // Update existing session and publish
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: req.user._id },
        { 
          title, 
          tags: processedTags, 
          json_file_url,
          status: 'published',
          updated_at: Date.now()
        },
        { new: true, runValidators: true }
      );
      
      if (!session) {
        return next(new AppError('No session found with that ID', 404));
      }
    } else {
      // Create new published session
      session = await Session.create({
        title,
        tags: processedTags,
        json_file_url,
        status: 'published',
        user_id: req.user._id
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete a session
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user._id
    });
    
    if (!session) {
      return next(new AppError('No session found with that ID', 404));
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};