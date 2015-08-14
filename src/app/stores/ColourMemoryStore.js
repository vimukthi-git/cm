let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;

let ActionTypes = ColourMemoryConstants.ActionTypes;
let WON_EVENT = 'won';
let SCORE_EVENT = 'score';
let FLIP_EVENT = 'flip';
let PENALTY_EVENT = 'penalty';
let MAX_FLIPS = 8;

let score = 0;
let previousCard = -1;
let previousColour = "";
let correctFlips = 0;
let flippedCards = [];


function _processFlip(cardIndex, colour){
    ColourMemoryStore.emitFlip(cardIndex);
    setTimeout(function(){
        if(previousCard == -1){
            previousCard = cardIndex;
            previousColour = colour;
        } else {
            if (previousColour == colour){
                score++;
                correctFlips++;
                flippedCards.push(previousCard);
                flippedCards.push(cardIndex);

                if(correctFlips == MAX_FLIPS){
                    ColourMemoryStore.emitWon();
                    //ColourMemoryActionCreators.restart();
                } else {
                    ColourMemoryStore.emitScore();
                    previousCard = -1;
                }
            } else {
                score--;
                previousCard = -1;
                ColourMemoryStore.emitPenalty(flippedCards);
            }
        }
    }, 1000);
}

function _reset(){
    score = 0;
    previousCard = -1;
    previousColour = "";
    correctFlips = 0;
}

var ColourMemoryStore = assign({}, EventEmitter.prototype, {

    emitWon: function () {
        this.emit(WON_EVENT);
    },

    emitFlip: function (index) {
        this.emit(FLIP_EVENT, {index: index});
    },

    emitScore: function () {
        this.emit(SCORE_EVENT);
    },

    emitPenalty: function (flippedCards) {
        this.emit(PENALTY_EVENT, {flippedCards: flippedCards});
    },

    /**
     * @param {function} callback
     */
    addWonListener: function (callback) {
        this.on(WON_EVENT, callback);
    },

    removeWonListener: function (callback) {
        this.removeListener(WON_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addFlipListener: function (callback) {
        this.on(FLIP_EVENT, callback);
    },

    removeFlipListener: function (callback) {
        this.removeListener(FLIP_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addScoreListener: function (callback) {
        this.on(SCORE_EVENT, callback);
    },

    removeScoreListener: function (callback) {
        this.removeListener(SCORE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    addPenaltyListener: function (callback) {
        this.on(PENALTY_EVENT, callback);
    },

    removePenaltyListener: function (callback) {
        this.removeListener(PENALTY_EVENT, callback);
    },

    get: function (id) {
        return _cards[id];
    },

    getAll: function () {
        return _cards;
    }
});

ColourMemoryStore.setMaxListeners(20);

ColourMemoryStore.dispatchToken = ColourMemoryDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.RESTART:
            _reset();
            break;

        case ActionTypes.INIT:
            break;

        case ActionTypes.CARD_FLIP:
            _processFlip(action.cardIndex, action.colour);
            break;

        default:
        // do nothing
    }

});

module.exports = ColourMemoryStore;
