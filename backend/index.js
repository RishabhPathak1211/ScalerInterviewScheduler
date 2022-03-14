const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const interviewRoutes = require('./routes/interview');
const participantRoutes = require('./routes/participant');
const ExpressError = require('./ExpressError');
const config = require('./config');

const dbUrl = `mongodb+srv://${config.username}:${config.password}@cluster0.y74ml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Database Connected'));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/interview', interviewRoutes);
app.use('/participant', participantRoutes);

app.use('*', (req, res, next) => {
    next(new ExpressError('Invalid Request', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).json({ msg: err.message });
})

const port = 5000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
