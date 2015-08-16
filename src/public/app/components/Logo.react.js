/**
 * Created by vimukthib on 8/13/15.
 * Logo React component which represents the logo in the Colour Memory game board.
 */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');
let ColourMemoryStore = require('../stores/ColourMemoryStore');

let Logo = React.createClass({

    componentDidMount: function() {
    },

    render() {
        let style = {
            marginTop: '10px',
            marginBottom: '50px',
            width: '120px',
            height: '48px',
            background: 'url(' + constants.LOGO_PATH + ')',
            backgroundSize: '120px !important'
        };
        return (
            <div style={style}>
            </div>
        );
    }
});

module.exports = Logo;
