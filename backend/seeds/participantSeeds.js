const mongoose = require('mongoose');
const Participant = require('../models/participant');

const dbUrl = 'mongodb+srv://admin:admin@cluster0.y74ml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Database Connected'));

const data = [
    {
        name: 'Rishabh Pathak',
        email: 'rp@outlook.com',
        phone: '+918968703342'
    },
    {
        name: 'Pranjal Yadav',
        email: 'py@outlook.com',
        phone: '+919787454011'
    },
    {
        name: 'Glen Dsouza',
        email: 'gd@outlook.com',
        phone: '+919512922634'
    },
    {
        name: 'Kalindi',
        email: 'kk@outlook.com',
        phone: '+918104977816'
    },
    {
        name: 'Shraddha',
        email: 'ss@outlook.com',
        phone: '+918661931004'
    },
    {
        name: 'Aryamaan Jain',
        email: 'aj@outlook.com',
        phone: '+919815801203'
    },
    {
        name: 'Priyanka Mahawar',
        emailphon: 'pm@outlook.com',
        e: '+918044581926'
    }
];

const seedParticipants = async () => {
    try {
        await Participant.deleteMany({});
    } catch (e) {
        console.log(e)
    }
    data.forEach(async (val) => {
        try {
            const participant = new Participant(val);
            await participant.save();
        } catch (e) {
            console.log(e);
        }
    });
}

seedParticipants().then(() => console.log('done'));

// seedParticipants().then(() => {
//     mongoose.connection.close();
// })