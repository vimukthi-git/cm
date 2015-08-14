let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;

let ActionTypes = ColourMemoryConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _cards = [];
let NUM_CARDS = 16;

function _initCards() {
    for (var i = 0; i < NUM_CARDS; i++) {
        _cards.push({id: i, colour: ColourCardColours.BLUE, flipped: false});
    }
}

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
    },

    /**
     * @param {string} threadID
     */
    getAllForThread: function (threadID) {
        var threadMessages = [];
        for (var id in _messages) {
            if (_messages[id].threadID === threadID) {
                threadMessages.push(_messages[id]);
            }
        }
        threadMessages.sort(function (a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        return threadMessages;
    },

    getAllForCurrentThread: function () {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }

});

ColourCardStore.setMaxListeners(20);

ColourCardStore.dispatchToken = ColourMemoryDispatcher.register(function (action) {

    switch (action.type) {

        case ActionTypes.RESTART:
            _initCards();
            ColourCardStore.emitChange();
            break;

        case ActionTypes.INIT:
            _initCards();
            break;

        case ActionTypes.CREATE_MESSAGE:
            var message = ChatMessageUtils.getCreatedMessageData(
                action.text,
                action.currentThreadID
            );
            _messages[message.id] = message;
            MessageStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            _addMessages(action.rawMessages);
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;

        default:
        // do nothing
    }

});

module.exports = ColourCardStore;
