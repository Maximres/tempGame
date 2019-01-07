'use strict';
module.exports = function (app) {
    var score = require('../controllers/scoreController');

    // getting all scores
    app.route('/api/scores')
        .get(score.list_all_scores)
        .post(score.create_a_score)

};