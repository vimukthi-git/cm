/** In this file, we create a React component which incorporates components provided by material-ui */

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
let ColourCard = require('./ColourCard.react');
let NewGameButton = require('./NewGameButton.react');
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
                            <ColourCard tabindex={3} index={0}/>
                            <ColourCard tabindex={3} index={1}/>
                            <ColourCard tabindex={3} index={2}/>
                            <ColourCard tabindex={2} index={3}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard tabindex={3} index={4}/>
                            <ColourCard tabindex={3} index={5}/>
                            <ColourCard tabindex={3} index={6}/>
                            <ColourCard tabindex={2} index={7}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard tabindex={3} index={8}/>
                            <ColourCard tabindex={3} index={9}/>
                            <ColourCard tabindex={3} index={10}/>
                            <ColourCard tabindex={2} index={11}/>
                        </div>
                        <div style={cardGroupStyle}>
                            <ColourCard tabindex={3} index={12}/>
                            <ColourCard tabindex={3} index={13}/>
                            <ColourCard tabindex={3} index={14}/>
                            <ColourCard tabindex={2} index={15}/>
                        </div>
                    </div>
                </div>
                <div style={groupRightStyle}>
                    <NewGameButton tabindex={1} index={16}/>
                </div>
            </div>
        );
    }

});

module.exports = ColourMemory;
