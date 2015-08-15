/**
 * Created by vimukthib on 8/13/15.
 */

let React = require('react');
let mui = require('material-ui');
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let constants = require('../constants/ColourMemoryConstants');
let ColourCardStore = require('../stores/ColourCardStore');
let ColourMemoryStore = require('../stores/ColourMemoryStore');
let Paper = mui.Paper;

let COLOURS = constants.COLOURS;

let ColourCard = React.createClass({

    getInitialState: function() {
        let model = ColourCardStore.get(this.props.index);
        let side = COLOURS.BG;
        if(model.flipped){
            side = model.colour;
        }
        let zDepth = 1;
        if(this.props.autofocus){
            zDepth = 4;
        }
        return {flipped:model.flipped, side:side, colour:model.colour, zDepth: zDepth, disabled: false};
    },

    tick: function() {
        if(this.state.flipped){
            this.state.side = COLOURS.RED;
        } else {
            this.state.side = COLOURS.BG;
        }
        this.setState({flipped: !this.state.flipped});
    },

    componentDidMount: function() {
        ColourCardStore.addChangeListener(this._onChange);
        ColourMemoryStore.addPenaltyListener(this._onPenalty);
        ColourMemoryStore.addScoreListener(this._onScore);
        ColourMemoryStore.addWonListener(this._onWon);
        ColourMemoryStore.addFlipListener(this._onFlip);
        ColourMemoryStore.addFocusListener(this._onFocus);
        if(this.props.index === 0){
            this._onFocus({focusedElementId: this.props.index});
        }
    },

    componentWillUnmount: function() {
        //clearInterval(this.interval);
    },

    render: function() {
        let root = {
            float: 'left',
            height: '100px',
            width: '80px',
            padding: '5px auto',
            margin: '10px',
            textAlign: 'center'
        };

        return (
            <Paper ref={'card-' + this.props.index} tabIndex={this.props.tabindex} zDepth={this.state.zDepth} style={root}
                   onClick={this._handleTouchTap}
                   onKeyUp={this._handleKeyPress}>
                <img src={this.state.side} />
            </Paper>
        );
    },

    _handleKeyPress: function(e){
        switch(e.key) {
            case "Enter":
                this._flip();
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowLeft":
                ColourMemoryActionCreators.cardNavigate(this.props.index, e.key);
                break;
        }
    },

    _flip: function(){
        if(!this.state.disabled){
            ColourMemoryActionCreators.cardFlip(this.props.index, this.state.colour);
        }
    },

    _handleTouchTap: function(){
        this._flip();
    },

    _onChange: function(){
        let model = ColourCardStore.get(this.props.index);
        this.state.colour = model.colour;
        if(this.props.index === 0){
            this._adjustStateWithFocus(model.flipped);
        } else {
            this._adjustState(model.flipped);
        }

    },

    _onWon: function(){

    },

    _onFlip: function(event){
        if(event.index === this.props.index && !this.state.disabled){
            this._adjustState(true);
        }
    },

    _onScore: function(event){
        if(~event.flippedCards.indexOf(this.props.index) && !this.state.disabled){
            this._disable();
        }
    },

    _onPenalty: function(event){
        if(!~event.flippedCards.indexOf(this.props.index) && !this.state.disabled){
            this._adjustState(false);
        }
    },

    _onFocus: function(event){
        //if(event.focusedElementId === this.props.index && this.state.disabled){
        //    setTimeout(function(){
        //        this._handleKeyPress(event);
        //    }.bind(this), 30);
        //} else
        if(event.focusedElementId === this.props.index){
            this.refs['card-' + this.props.index].getDOMNode().focus();
            this.setState({zDepth:4});
        } else if(event.focusedElementId !== null){
            this.refs['card-' + this.props.index].getDOMNode().blur();
            this.setState({zDepth:1});
        }
    },

    _disable: function(){
        this.setState({zDepth:0, flipped:true, side:COLOURS.DOLLAR, disabled: true});
    },

    _adjustState:function(flipped){
        let side = COLOURS.BG;
        if(flipped){
            side = this.state.colour;
        }
        this.setState({flipped:flipped, side:side, disabled: false});
    },

    _adjustStateWithFocus:function(flipped){
        let side = COLOURS.BG;
        if(flipped){
            side = this.state.colour;
        }
        setTimeout(function(){
            this.refs['card-' + this.props.index].getDOMNode().focus();
            this.setState({zDepth:4, flipped:flipped, side:side, disabled: false});
        }.bind(this), 300);
    }
});

module.exports = ColourCard;
