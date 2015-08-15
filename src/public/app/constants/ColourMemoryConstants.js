let keyMirror = require('keymirror');

let IMG_PATH = "www/images/";

module.exports = {

    ActionTypes: keyMirror({
        INIT: null,
        RESTART: null,
        SHOW_RANK: null,
        CARD_FLIP: null,
        CARD_FOCUS: null,
        SUBMIT_SCORE: null
    }),

    IMG_PATH: IMG_PATH,

    COLOURS: {
        RED: IMG_PATH + "colour1.gif",
        YELLOW: IMG_PATH + "colour2.gif",
        GREEN: IMG_PATH + "colour3.gif",
        CYAN: IMG_PATH + "colour4.gif",
        BLUE: IMG_PATH + "colour5.gif",
        DEEP_BLUE: IMG_PATH + "colour6.gif",
        MAGENTA: IMG_PATH + "colour7.gif",
        ORANGE: IMG_PATH + "colour8.gif",
        BG: IMG_PATH + "card_bg.gif",
        DOLLAR: IMG_PATH + "dollar.gif"
    },

    LOGO_PATH: IMG_PATH + "logo.png",

    SCORE_API: 'score'

};
