const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant');

router.route('/')
    .get(participantController.getAllParticipants);

module.exports = router;