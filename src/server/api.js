/**
 * Created by vimukthib on 8/13/15.
 */

let express = require('express');
let app = express();
let router = express.Router();
let bodyParser  = require('body-parser');
let mongoose = require('mongoose');

// connect to the db
mongoose.connect('mongodb://localhost/colormemory');

// Polyfill for Array.find
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return undefined;
    };
}

let Score = mongoose.model('Score', { name: String, email: String, score: Number });

app.use(bodyParser.json());
app.use(express.static('public'));

/**
 * serve the index.html
 */
app.get('/', function(req, res) {
    res.sendfile('./public/www/index.html');
});

/**
 * Score api which stores scores and returns
 * current highest rank for the player.
 *
 */
app.post('/score', function (req, res) {
    let score = new Score(req.body);
    score.save(function (err) {
        if (err) {
            res.status(500).json({error: err});
        } else{
            let rank = getRank(score.email, function(err, rank){
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.status(200).json(rank);
                }
            });
        }
    });
});

/**
 * Get rank for the particular player
 * @param email
 * @param callback
 */
function getRank(email, callback){
    Score.aggregate({$group: { _id: '$email', score: { $max: '$score' } } }, function(err, result){
        if (err) {
            callback(err);
        } else {
            let players = result.length;
            result.sort(function(a, b){
                return b.score - a.score;
            });
            var index = result.find(function(element, index, array){
                return element._id === email;
            });
            let score = result[index].score;
            let rank = index + 1;
            callback(null, {rank:rank, score:score, players: players});
        }
    });
}

app.listen(5000);