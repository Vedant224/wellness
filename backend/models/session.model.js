const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    tags: [{
      type: String,
      trim: true
    }],
    json_file_url: {
      type: String,
      required: [true, 'JSON file URL is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// Create indexes for better performance
sessionSchema.index({ user_id: 1, status: 1 });
sessionSchema.index({ status: 1 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;