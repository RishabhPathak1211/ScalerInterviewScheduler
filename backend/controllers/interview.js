const Interview = require('../models/interview');

module.exports.getInterviews = async (req, res, next) => {
    try {
        const interviews = await Interview.find({}).populate('participants');
        return res.json(interviews);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

module.exports.getInterview = async (req, res, next) => {
    const { id } = req.params;
    try {
        const interview = await Interview.findById(id);
        return res.json(interview);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

module.exports.createInterview = async (req, res, next) => {
    let { startDate, endDate, participants } = req.body;
    participants = participants.split(',');
    try {
        const interview = new Interview({ startDate, endDate, participants });
        await interview.save();
        return res.status(200).send('OK');
    } catch (e) {
        console.log(e);
        return next(e);
    }
}

module.exports.editInterview = async (req, res, next) => {
    const { id } = req.params;
    let { startDate, endDate, participants } = req.body;
    participants = participants.split(',');
    try {
        const interview = await Interview.findByIdAndUpdate(id, { startDate, endDate, participants });
        return res.status(200).send('OK');
    } catch (e) {
        console.log(e);
        return next(e);
    }
}