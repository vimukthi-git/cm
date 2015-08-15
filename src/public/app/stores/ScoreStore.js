/**
 * Created by vimukthib on 8/13/15.
 * store for Score state according to Flux architecture
 * https://facebook.github.io/flux/docs/overview.html#stores
 */

let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');
let ColourMemoryStore = require('./ColourMemoryStore');
let $ = require('jquery');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let ColourCardColours = ColourMemoryConstants.COLOURS;

let ActionTypes = ColourMemoryConstants.ActionTypes;
let SCORE_SAVED_EVENT = 'scored';
let SCORE_SAVE_ERROR = 'score_error';
let SHOW_RANK = 'show_rank';

/**
 *
 * Private methods of the ScoreStore starts here
 */

/**
 * Submit a new score to the score API and get the rank
 * @param name
 * @param email
 * @private
 */
function _submitScore(name, email){
    let currentScore = ColourMemoryStore.getScore();
    let score = {name: name, email: email, score: currentScore};
    $.ajax({
        type: "POST",
        url: ColourMemoryConstants.SCORE_API,
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(score),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            ScoreStore.emitScoreSaved(data);
        },
        failure: function(errMsg) {
            ScoreStore.emitScoreSaveError(score);
        }
    });
}

/**
 *
 * public API of the ScoreStore starts here
 */

var ScoreStore = assign({}, EventEmitter.prototype, {

    emitScoreSaved: function (rank) {
        this.emit(SCORE_SAVED_EVENT, {rank: rank});
    },

    /**
     * @param {function} callback
     */
    addScoreSavedListener: function (callback) {
        this.on(SCORE_SAVED_EVENT, callback);
    },

    removeScoreSavedListener: function (callback) {
        this.removeListener(SCORE_SAVED_EVENT, callback);
    },

    emitScoreSaveError: function (score) {
        this.emit(SCORE_SAVE_ERROR, {score: score});
    },

    /**
     * @param {function} callback
     */
    addScoreSaveErrorListener: function (callback) {
        this.on(SCORE_SAVE_ERROR, callback);
    },

    removeScoreSaveErrorListener: function (callback) {
        this.removeListener(SCORE_SAVE_ERROR, callback);
    },

    emitShowRank: function (rank) {
        this.emit(SHOW_RANK, {rank: rank});
    },

    /**
     * @param {function} callback
     */
    addShowRankListener: function (callback) {
        this.on(SHOW_RANK, callback);
    },

    removeShowRankListener: function (callback) {
        this.removeListener(SHOW_RANK, callback);
    }
});

ScoreStore.setMaxListeners(20);


/**
 * Register for and handle app actions
 */

ScoreStore.dispatchToken = ColourMemoryDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.SUBMIT_SCORE:
            _submitScore(action.name, action.email);
            break;

        case ActionTypes.SHOW_RANK:
            ScoreStore.emitShowRank(action.rank);
            break;

        default:
        // do nothing
    }

});

module.exports = ScoreStore;
