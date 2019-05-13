const path = require('path');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/expenses');

//connection to server
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
    console.log('server is live');
});

//connection to mongo
mongoose.connect('mongodb+srv://tmgleitsmann:tmgleitsmann@cluster0-juaqw.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => console.log('mongoose connection successful'))
    .on('error', (error) => {
        console.warn('Error', error);
    })
mongoose.Promise = global.Promise; //overrides mongoose promise and uses js promise
