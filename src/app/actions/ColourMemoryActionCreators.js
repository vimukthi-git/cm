let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
var ColourMemoryConstants = require('../constants/ColourMemoryConstants');

var ActionTypes = ColourMemoryConstants.ActionTypes;

module.exports = {

    restart: function () {
        ColourMemoryDispatcher.dispatch({
            type: ActionTypes.RESTART
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
    }

};
