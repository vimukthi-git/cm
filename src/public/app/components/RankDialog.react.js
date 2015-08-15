/**
 * Created by vimukthib on 8/13/15.
 * RankDialog React component which represents the rank display dialog in the Colour Memory game board.
 */

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
        let scoreStyle = {
            fontSize: '20px',
            color: Colors.deepOrange400
        };
        let rankStyle = {
            fontSize: '20px',
            color: Colors.deepOrange400
        };
        let playersStyle = {
            fontSize: '20px',
            color: Colors.deepOrange400
        };

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
                <h3>You are ranked <span style={rankStyle}>{this.state.rank + this._getPh(this.state.rank)}</span> with a score of <span style={scoreStyle}>{this.state.score}</span> among <span style={playersStyle}>{this.state.players}</span> players.</h3>
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

    _getPh: function (rank) {
        let rankPh = '';
        let rankSwitch = rank % 10;
        switch (rankSwitch) {
            case 1:
                rankPh = 'st';
                break;
            case 2:
                rankPh = 'nd';
                break;
            case 3:
                rankPh = 'rd';
                break;
            default:
                rankPh = 'th';
                break;
        }
        return rankPh;
    },

    _initDialog(event) {
        let score = event.rank.score;
        let rank = event.rank.rank;
        let players = event.rank.players;
        this.setState({score: score, rank: rank, players: players});
        this.refs.RankDialog.show();
    }


});

module.exports = RankDialog;
