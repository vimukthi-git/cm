/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let ColourCard = require('./ColourCard.react');
let constants = require('../constants/ColourMemoryConstants');
let ColourCardColours = constants.COLOURS;
let ColourMemoryActionCreators = require('../actions/ColourMemoryActionCreators');

let ColourMemory = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.deepOrange500
        });
    },

    render() {

        let containerStyle = {
            textAlign: 'center',
            height:"576px",
            width: "720px",
            margin: 'auto'
            //'margin-right': 'auto'
            //paddingTop: '200px'
        };

        let groupLeftStyle = {
            float: 'left',
            width: '75%'
        };

        let groupRightStyle = {
            marginTop: '100px',
            float: 'left',
            width: '25%'
        };

        let cardGroupStyle = {
            float: 'left',
            width: '100%'
        };

        return (
            <div style={containerStyle}>
                <div style={groupLeftStyle}>
                    <div>
                        <div style={cardGroupStyle}>
                            <ColourCard index={0}/>
                            <ColourCard index={1}/>
                            <ColourCard index={2}/>
                            <ColourCard index={3}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard index={4}/>
                            <ColourCard index={5}/>
                            <ColourCard index={6}/>
                            <ColourCard index={7}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard index={8}/>
                            <ColourCard index={9}/>
                            <ColourCard index={10}/>
                            <ColourCard index={11}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard index={12}/>
                            <ColourCard index={13}/>
                            <ColourCard index={14}/>
                            <ColourCard index={15}/>
                        </div>
                    </div>
                </div>
                <div style={groupRightStyle}>
                    <RaisedButton label="Restart" primary={true} onTouchTap={this._restart}/>
                </div>
            </div>
        );
    },

    _restart() {
        ColourMemoryActionCreators.restart();
    }

});

module.exports = ColourMemory;
