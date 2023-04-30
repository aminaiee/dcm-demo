"use strict";
const config = require('./config/server.js');
const redis = require('./models/redis.js');
console.log(process.env.NODE_ENV);
console.log(config);
