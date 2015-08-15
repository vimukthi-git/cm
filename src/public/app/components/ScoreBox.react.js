/** In this file, we create a React component which incorporates components provided by material-ui */

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
            margin: '10px',
            padding: '10px',
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
