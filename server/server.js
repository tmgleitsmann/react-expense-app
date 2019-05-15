const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require("./routes/api-routes")
const cors = require('cors');

//connection to server
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(cors());
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
//mongoose.connect('mongodb://localhost:27017/localExpense');

mongoose.connect('mongodb+srv://tmgleitsmann:tmgleitsmann@cluster0-juaqw.mongodb.net/expense-app?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('mongoose connection successful'))
    .on('error', (error) => {
        console.warn('Error', error);
})

mongoose.Promise = global.Promise; //overrides mongoose promise and uses js promise