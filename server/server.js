const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('config');

/* app.use ((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
 */
//const items = require("./routes/api/items");

const app = express();

app.use(cors());

//Bodyparser Middleware
app.use(express.json());

//DB Config
//const db = require('./config/keys').mongoURI;
const db = config.get('mongoURI');

//connect to Mongo
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true
     })
    .then(() => console.log('mongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', require("./routes/api/items"));
app.use('/api/user', require("./routes/api/user"));
app.use('/api/auth', require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));