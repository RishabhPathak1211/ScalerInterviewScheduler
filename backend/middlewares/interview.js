const Interview = require('../models/interview');
const ExpressError = require('../ExpressError');

function checkCommon(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}

module.exports.checkInterviewValidity = async (req, res, next) => {
    let { startDate, endDate, participants } = req.body;
    participants = participants.split(',');
    try {
        if (participants.length < 2) throw new ExpressError('Number of participants must be more than 2', 400);
        const overlappingInterviews = await Interview.find({
            $and: [
                { startDate: { $lte: endDate } },
                { endDate: { $gte: startDate } }
            ]
        });
        overlappingInterviews.forEach((item) => {
            if (checkCommon(participants, item.participants))
                throw new ExpressError('Participants added are included in another interview', 400);
        })
        return next();
    } catch (e) {
        console.log(e);
        return next(e);
    }
}