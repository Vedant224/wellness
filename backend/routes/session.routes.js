const express = require('express');
const sessionController = require('../controllers/session.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', sessionController.getAllSessions);

// Protected routes
router.use(protect);
router.get('/my-sessions', sessionController.getMySessionss);
router.get('/my-sessions/:id', sessionController.getMySession);
router.post('/my-sessions/save-draft', sessionController.saveDraft);
router.post('/my-sessions/publish', sessionController.publishSession);
router.delete('/my-sessions/:id', sessionController.deleteSession);

module.exports = router;