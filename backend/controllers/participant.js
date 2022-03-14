const Participant = require('../models/participant');

module.exports.getAllParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find({});
        return res.json(participants);
    } catch (e) {
        console.log(e);
        return next(e);
    }
}