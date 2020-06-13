const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv/config');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(history())


const caseRoute = require('./routes/cases');
const caseElementRoute = require('./routes/caseElement');
const authRoute = require('./routes/users');
const connect = require('connect');
   

app.use('/cases', caseRoute);
app.use('/caseElement', caseElementRoute);
app.use('/users', authRoute);


app.get('/', (req, res) => {
    res.send('DB')
})

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true },
 () => {
    return console.log('Connected to DB')
})

app.listen(3000);
