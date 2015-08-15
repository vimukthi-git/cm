/**
 * Created by vimukthib on 8/13/15.
 * ScoreBox React component which represents the score display in the Colour Memory game board.
 */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryStore = require('../stores/ColourMemoryStore');

let ScoreBox = React.createClass({

    getInitialState: function() {
        return {score:0};
    },

    componentDidMount: function() {
        ColourMemoryStore.addScoreListener(this._onScoreChange);
        ColourMemoryStore.addPenaltyListener(this._onScoreChange);
        ColourMemoryStore.addRestartListener(this._resetScore);
    },

    render() {
        let style = {
            marginTop: '10px',
            marginBottom: '50px',
            padding: '20px',
            textAlign: 'center'
        };
        return (
            <div style={style} ref="score">
                <h2>Score</h2>
                <h1>{this.state.score}</h1>
            </div>
        );
    },

    _onScoreChange: function(event){
        this.setState({score: event.score});
    },

    _resetScore: function(){
        this.setState({score: 0});
    }
});

module.exports = ScoreBox;
