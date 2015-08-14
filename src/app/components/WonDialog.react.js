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

let WonDialog = React.createClass({

    getInitialState: function() {
        return {displayed:false};
    },

    componentDidMount: function() {
        ColourMemoryStore.addWonListener(this._initDialog);
        //ColourMemoryStore.addFlipListener(this._initDialog);
    },

    render() {
        //Standard Actions
        let actions = [
            <FlatButton
                label="Try Again"
                secondary={true}
                onClick={this._onDialogCancel} />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this._onDialogSubmit} />
        ];

        return (
            <Dialog
                title="You Won !!!"
                actions={actions}
                actionFocus="submit"
                modal={true}
                ref="wondialog">
                <h3>Let's add you to the Leaderboard. Please enter your details..</h3>

                <TextField
                    hintText="Enter your name"
                    floatingLabelText="Name"
                    underlineStyle={{borderColor:Colors.green500}}/>
                <br/>
                <TextField
                    hintText="Enter your email address"
                    floatingLabelText="Email"
                    underlineStyle={{borderColor:Colors.green500}}/>
            </Dialog>
        );
    },

    _onDialogCancel: function(event){
        this.refs.wondialog.dismiss();
        ColourMemoryActionCreators.restart();
    },

    _onDialogSubmit: function(event){
        this.setState({score: event.score});
    },

    _initDialog() {
        this.refs.wondialog.show();
    }

});

module.exports = WonDialog;
