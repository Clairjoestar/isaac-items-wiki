const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const mongoDB = 'mongodb://localhost:27017/isaac';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("strictQuery",false);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

module.exports = db;
