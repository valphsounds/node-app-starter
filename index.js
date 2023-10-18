// xmdb - Expressapp with MongoDB
// connectmodel - Connect Model File
// connectroutes - Connect Routes File
// appuseroute - App Use Routes
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bp = require('body-parser');

const PORT = process.env.NODE_DOCKER_PORT || 5500;
require('dotenv').config();
const db = require('./config/db.config');

mongoose.connect(db.url, {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(bp.json({limit: '50mb', type: 'application/json'}));
app.use(bp.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Object } = require('./models/dbObj');
const { File } = require('./models/file');

const auth = require('./routes/auth');
const users = require('./routes/users');
const dbObjs = require('./routes/dbObjs');
const files = require('./routes/files');

app.use('/api/auth', auth); 
app.use('/api/users', users);
app.use('/api/dbObjs', dbObjs);
app.use('/api/files', files);

app.set('view engine', 'ejs');
app.use('/', express.static('views'));

app.get('/', async (req, res) => {
    const dbObjs = Object.find();
    const files = File.find();
    res.render('index', {
        objs: dbObjs,
        files: files
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});