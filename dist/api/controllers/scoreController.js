'use strict';

var mongoose = require('mongoose'),
    Score = mongoose.model('Scores');

exports.list_all_scores = function (req, res) {
    Score.find({}, function (err, score) {
        if (err)
            res.send(err);
        res.json(score);
    });
};

exports.create_a_score = function (req, res) {
    console.log(req.body);
    var newScore = new Score(req.body);
    console.log(newScore);
    newScore.save(function (err, score) {
        if (err)
            res.send(err);
        res.json(score);
    });
};