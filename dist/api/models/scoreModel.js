'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scoreSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name please'
  },
  point: {
    type: Number,
    default: -1
  },
});

module.exports = mongoose.model('Scores', scoreSchema);