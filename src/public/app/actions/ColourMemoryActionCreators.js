/**
 * Created by vimukthib.
 * Set of action creators for Colour Memory app according to Flux architecture
 * https://facebook.github.io/flux/docs/actions-and-the-dispatcher.html#content
 */

let ColourMemoryDispatcher = require('../dispatcher/ColourMemoryDispatcher');
let ColourMemoryConstants = require('../constants/ColourMemoryConstants');

let ActionTypes = ColourMemoryConstants.ActionTypes;

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
