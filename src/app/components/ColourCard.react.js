/**
 * Created by vimukthib on 8/13/15.
 */

let React = require('react');
let mui = require('material-ui');
let constants = require('../constants/ColourMemoryConstants');
var ColourCardStore = require('../stores/ColourCardStore');
let Paper = mui.Paper;

let COLOURS = constants.COLOURS;

let ColourCard = React.createClass({

    getInitialState: function() {
        let model = ColourCardStore.get(this.props.index);
        this.props.colour = model.colour;
        let colour = COLOURS.BG;
        if(model.flipped){
            colour = this.props.colour;
        }
        return {flipped:model.flipped, colour:colour};
    },

    tick: function() {
        if(this.state.flipped){
            this.state.colour = COLOURS.RED;
        } else {
            this.state.colour = COLOURS.BG;
        }
        this.setState({flipped: !this.state.flipped});
    },

    componentDidMount: function() {
        ColourCardStore.addChangeListener(this._onChange);
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
            <Paper zDepth={1} style={root} onClick={this._handleTouchTap}>
                <img src={this.state.colour} />
            </Paper>
        );
    },

    _handleTouchTap: function(){
        this._adjustState(!this.state.flipped);
    },

    _onChange: function(){
        let model = ColourCardStore.get(this.props.index);
        this.props.colour = model.colour;
        this._adjustState(model.flipped);
    },

    _adjustState:function(flipped){
        let colour = COLOURS.BG;
        if(flipped){
            colour = this.props.colour;
        }
        this.setState({flipped:flipped, colour:colour});
    }
});

module.exports = ColourCard;
