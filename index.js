const express = require('express');
const app = express();
const PORT = 5000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const registerRoute = require("./api/routes/register")
const loginRoute = require('./api/routes/login')
const selectRoute = require('./api/routes/select')

require('dotenv').config();
require('./config/database').connect();


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.json())
app.use('/register',registerRoute);
app.use('/login',loginRoute);
app.use('/select',selectRoute);

app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
});





