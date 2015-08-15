/**
 * Created by vimukthib.
 * store for ColourCard state according to Flux architecture
 * https://facebook.github.io/flux/docs/overview.html#stores
 */

let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let ColourCardColours = ColourMemoryConstants.COLOURS;

let ActionTypes = ColourMemoryConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _cards = [];
let _colors = [];
let NUM_CARDS = 16;
let NUM_COLOURS = 8;

/**
 * initialize the store
 * @private
 */
function _initStore(){
    var colourArray = Object.keys(ColourCardColours);
    for (var i = 1; i <= NUM_CARDS; i++) {
        let index = 1;
        if(i % NUM_COLOURS == 0){
            index = NUM_COLOURS - 1;
        } else {
            index = (i % NUM_COLOURS) - 1;
        }
        _colors.push(ColourCardColours[colourArray[index]]);
    }
    _initCards();
}

/**
 * initialize the set of cards
 * @private
 */
function _initCards() {
    _shuffle(_colors);
    _cards = [];
    for (var i = 0; i < NUM_CARDS; i++) {
        _cards.push({id: i, colour: _colors[i], flipped: false});
    }
}

/**
 * Shuffle the given array with a random order
 * used to generate random game board colors for each new round
 * @param array
 * @returns {*}
 * @private
 */
function _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 *
 * public API of the ColourMemoryStore starts here
 */

var ColourCardStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function (id) {
        return _cards[id];
    },

    getAll: function () {
        return _cards;
    }
});

ColourCardStore.setMaxListeners(20);



/**
 * Register for and handle app actions
 */

ColourCardStore.dispatchToken = ColourMemoryDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.RESTART:
            _initCards();
            ColourCardStore.emitChange();
            break;

        case ActionTypes.INIT:
            _initStore();
            break;

        default:
        // do nothing
    }

});

module.exports = ColourCardStore;
