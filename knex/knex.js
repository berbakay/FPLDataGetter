const ENV = process.env.NODE_ENV || "development";

const testData = require('./2122data');
const data = {test: testData};

module.exports = data[ENV];