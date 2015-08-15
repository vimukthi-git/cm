let React = require('react');
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let Dialog = mui.Dialog;
let FlatButton = mui.FlatButton;
let TextField = mui.TextField;
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryStore = require('../stores/ColourMemoryStore');
let ScoreStore = require('../stores/ScoreStore');

let RankDialog = React.createClass({

    getInitialState: function() {
        return {msg:0};
    },

    componentDidMount: function() {
        ScoreStore.addShowRankListener(this._initDialog);
        //ScoreStore.addScoreSavedListener(this._scoreSaved);
        //ScoreStore.addScoreSaveErrorListener(this._scoreSaveError);
    },


    render() {
        //Standard Actions
        let actions = [
            <FlatButton
                label="Play Again"
                ref="play"
                primary={true}
                onClick={this._onDialogSubmit} />
        ];

        return (
            <Dialog
                title="Leaderboard"
                actions={actions}
                actionFocus="submit"
                onShow={this._onShow}
                modal={true}
                ref="RankDialog">
                <h3>{this.state.msg}</h3>
            </Dialog>
        );
    },

    _onDialogSubmit: function(event){
        ColourMemoryActionCreators.restart();
        this._butttonBlur(this.refs.play);
        this.refs.RankDialog.dismiss();
    },

    _onShow: function() {
        this._butttonFocus(this.refs.play);
    },

    _butttonFocus(ref){
        ref.getDOMNode().focus();
        ref._handleKeyboardFocus({}, true);
    },

    _butttonBlur(ref){
        ref.getDOMNode().blur();
        ref._handleKeyboardFocus({}, false);
    },

    _initDialog(event) {
        let score = event.rank.score;
        let rank = event.rank.rank;
        let players = event.rank.players;
        let msg = "You are now ranked " + rank + " among "
            + players + " players with a score of " + score + ".";
        this.setState({score: score, rank: rank, players: players, msg: msg});
        this.refs.RankDialog.show();
    }

});

module.exports = RankDialog;
