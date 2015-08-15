let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;

let ActionTypes = ColourMemoryConstants.ActionTypes;
let RESTART_EVENT = 'restart';
let WON_EVENT = 'won';
let SCORE_EVENT = 'score';
let FLIP_EVENT = 'flip';
let PENALTY_EVENT = 'penalty';
let FOCUS_EVENT = 'focus';
let MAX_FLIPS = 8;
let NEIGHBOUR_INDEXES = [
    [null, null, 1, 4],
    [0, null, 2, 5],
    [1, null, 3, 6],
    [2, null, 16, 7],
    [null, 0, 5, 8],
    [4, 1, 6, 9],
    [5, 2, 7, 10],
    [6, 3, 16, 11],
    [null, 4, 9, 12],
    [8, 5, 10, 13],
    [9, 6, 11, 14],
    [10, 7, 16, 15],
    [null, 8, 13, null],
    [12, 9, 14, null],
    [13, 10, 15, null],
    [14, 11, 16, null],
    [3, null, null, null]
];

let _score = 0;
let _previousCard = -1;
let _previousColour = "";
let _correctFlips = 0;
let _flippedCards = [];
let _processing = false;



function _processFlip(cardIndex, colour){
    ColourMemoryStore.emitFlip(cardIndex);
    if(_previousCard == -1){
        _previousCard = cardIndex;
        _previousColour = colour;
    } else {
        _processing = true;
        setTimeout(function () {
            if (_previousColour == colour) {
                _score++;
                _correctFlips++;
                _flippedCards.push(_previousCard);
                _flippedCards.push(cardIndex);
                ColourMemoryStore.emitScore();

                if (_correctFlips == MAX_FLIPS) {
                    ColourMemoryStore.emitWon();
                } else {
                    _previousCard = -1;
                }
            } else {
                _score--;
                _previousCard = -1;
                ColourMemoryStore.emitPenalty();
            }
            _processing = false;
        }, 500);
    }
}

function _processFocus(cardIndex, arrowKey){
    switch(arrowKey) {
        case "ArrowUp":
            ColourMemoryStore.emitFocus(_getFocusedElement(cardIndex, 1), arrowKey);
            break;
        case "ArrowDown":
            ColourMemoryStore.emitFocus(_getFocusedElement(cardIndex, 3), arrowKey);
            break;
        case "ArrowRight":
            ColourMemoryStore.emitFocus(_getFocusedElement(cardIndex, 2), arrowKey);
            break;
        case "ArrowLeft":
            ColourMemoryStore.emitFocus(_getFocusedElement(cardIndex, 0), arrowKey);
            break;
    }
}

function _getFocusedElement(blurIndex, focusDirection){
    let neighbour = NEIGHBOUR_INDEXES[blurIndex][focusDirection];
    //if(~_flippedCards.indexOf(neighbour) && NEIGHBOUR_INDEXES[neighbour][focusDirection] === null
    //    || (~_flippedCards.indexOf(neighbour) && ~_flippedCards.indexOf(NEIGHBOUR_INDEXES[neighbour][focusDirection]))){
    //    return blurIndex;
    //}
    return neighbour;
}

function _reset(){
    _score = 0;
    _previousCard = -1;
    _previousColour = "";
    _correctFlips = 0;
    _processing = false;
    _flippedCards = [];
}

var ColourMemoryStore = assign({}, EventEmitter.prototype, {

    emitRestart: function () {
        this.emit(RESTART_EVENT);
    },

    emitWon: function () {
        this.emit(WON_EVENT);
    },

    emitFlip: function (index) {
        this.emit(FLIP_EVENT, {index: index});
    },

    emitScore: function () {
        this.emit(SCORE_EVENT, {flippedCards: _flippedCards, score: _score});
    },

    emitPenalty: function () {
        this.emit(PENALTY_EVENT, {flippedCards: _flippedCards, score: _score});
    },

    emitFocus: function (focusedElementId, arrowKey) {
        this.emit(FOCUS_EVENT, {focusedElementId: focusedElementId, key: arrowKey});
    },

    /**
     * @param {function} callback
     */
    addRestartListener: function (callback) {
        this.on(RESTART_EVENT, callback);
    },

    removeRestartListener: function (callback) {
        this.removeListener(RESTART_EVENT, callback);
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

    /**
     * @param {function} callback
     */
    addFocusListener: function (callback) {
        this.on(FOCUS_EVENT, callback);
    },

    removeFocusListener: function (callback) {
        this.removeListener(FOCUS_EVENT, callback);
    },

    isProcessing(){
        return _processing;
    }
});

ColourMemoryStore.setMaxListeners(20);

ColourMemoryStore.dispatchToken = ColourMemoryDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.RESTART:
            _reset();
            ColourMemoryStore.emitRestart();
            break;

        case ActionTypes.INIT:
            break;

        case ActionTypes.CARD_FLIP:
            !_processing? _processFlip(action.cardIndex, action.colour) : null;
            break;

        case ActionTypes.CARD_FOCUS:
            !_processing? _processFocus(action.cardIndex, action.arrowKey) : null;
            break;

        default:
        // do nothing
    }

});

module.exports = ColourMemoryStore;
