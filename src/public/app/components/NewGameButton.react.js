/**
 * Created by vimukthib on 8/13/15.
 * NewGameButton React component which represents the new game button in the Colour Memory game board.
 */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryStore = require('../stores/ColourMemoryStore');

let NewGameButton = React.createClass({

    componentDidMount: function() {
        ColourMemoryStore.addFocusListener(this._onFocus);
    },

    render() {
        return (
            <FlatButton tabIndex={this.props.tabindex} ref="new" label="New Game" primary={true}
                          onClick={this._restart} onKeyDown={this._handleKeyPress}/>
        );
    },

    _onFocus: function(event){
        if(event.focusedElementId === this.props.index){
            this.refs.new.getDOMNode().focus();
            this.refs.new._handleKeyboardFocus({}, true);
        } else if(event.focusedElementId !== null){
            this.refs.new.getDOMNode().blur();
            this.refs.new._handleKeyboardFocus({}, false);
        }
    },

    _handleKeyPress: function(e){
        switch(e.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowLeft":
                ColourMemoryActionCreators.cardNavigate(this.props.index, e.key);
                break;
        }
    },

    _restart() {
        ColourMemoryActionCreators.restart();
    }

});

module.exports = NewGameButton;
