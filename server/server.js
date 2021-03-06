const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require("./routes/api-routes")
const cors = require('cors');


//connection to server
const app = express();
app.use(cors());

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//sends path of our web app for application use.
app.use(express.static(publicPath));
app.use('/api', apiRoutes)
//this app.get redirects to index.html if user were to refresh or enter site without base url
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
//app.get('/api', (res, req) => res.send('Hello world with Express'));
app.listen(port, () => {
    console.log('server is live');
});


//connection to mongo
//Uncomment when you insert your mongo connection string
// mongoose.connect('YOUR MONGO CONNECTION STRING HERE', { useNewUrlParser: true });
// mongoose.connection.once('open', () => console.log('mongoose connection successful'))
//     .on('error', (error) => {
//         console.log('we ran into a problem opening mongo');
//         console.warn('Error', error);
// })

mongoose.Promise = global.Promise; //overrides mongoose promise and uses js promise
