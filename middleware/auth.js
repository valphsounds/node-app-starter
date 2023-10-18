// authmw - Auth Middleware
require('dotenv').config();
const jwt = require('jsonwebtoken');
const key = require('../config/jwt.config.js');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token Provided.');
    try
    {
        const decoded = jwt.verify(token, key.token);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.')
    }
}