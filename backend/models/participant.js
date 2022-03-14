const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        validate: [validatePhone, 'Please fill a valid phone number']
    }
});

function validateEmail(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function validatePhone(phone) {
    let re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    return re.test(phone);
}

module.exports = mongoose.model('Participant', ParticipantSchema);