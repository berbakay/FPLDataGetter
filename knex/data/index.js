const ENV = process.env.NODE_ENV || "development";

const testData = require('./2122data/2122data');
const data = {development: testData};

module.exports = data[ENV];