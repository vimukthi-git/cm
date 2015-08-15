/** In this file, we create a React component which incorporates components provided by material-ui */

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
            content: 'url(' + constants.LOGO_PATH + ')'
        };
        return (
            <div style={style}>
            </div>
        );
    }
});

module.exports = Logo;
