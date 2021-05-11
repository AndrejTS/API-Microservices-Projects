const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: String,
  short_url: String
});

module.exports = mongoose.model('URLs', urlSchema);

