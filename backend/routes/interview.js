const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview');
const interviewMiddlewares = require('../middlewares/interview');

router.route('/')
    .get(interviewController.getInterviews)
    .post(interviewMiddlewares.checkInterviewValidity, interviewController.createInterview);

router.route('/:id')
    .get(interviewController.getInterview)
    .put(interviewMiddlewares.checkInterviewValidity, interviewController.editInterview);

module.exports = router;