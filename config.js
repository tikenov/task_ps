const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    BULL_REDIS_URI: process.env.BULL_REDIS_URI,
    BULL_HOST_ID: process.env.BULL_HOST_ID,
};