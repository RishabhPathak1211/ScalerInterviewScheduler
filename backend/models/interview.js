const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    participants: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Participant'
        }],
        validate: [arrayLimit, 'Minimum two participants required']
    }
}, {
    versionKey: false
});

function arrayLimit(val) {
    return val.length >= 2;
}

module.exports = mongoose.model('Interview', InterviewSchema);