let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
var ColourMemoryConstants = require('../constants/ColourMemoryConstants');

var ActionTypes = ColourMemoryConstants.ActionTypes;

module.exports = {

    restart: function () {
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.RESTART
        });
    },

    showRank: function(rank){
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.SHOW_RANK,
            rank: rank
        });
    },

    submitScore: function (name, email) {
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.SUBMIT_SCORE,
            name: name,
            email: email
        });
    },

    init: function(){
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.INIT
        });
    },

    cardFlip: function(cardIndex, colour){
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.CARD_FLIP,
            cardIndex: cardIndex,
            colour: colour
        });
    },

    cardNavigate: function(cardIndex, arrowKey){
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.CARD_FOCUS,
            cardIndex: cardIndex,
            arrowKey: arrowKey
        });
    }

};
