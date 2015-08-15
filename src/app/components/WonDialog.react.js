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
                ref="try"
                onKeyDown={this._onTryKeyDown}
                onClick={this._onDialogCancel} />,
            <FlatButton
                label="Submit"
                ref="submit"
                primary={true}
                onKeyDown={this._onSubmitKeyDown}
                onClick={this._onDialogSubmit} />
        ];

        return (
            <Dialog
                title="You Won !!!"
                actions={actions}
                actionFocus="submit"
                onShow={this._onShow}
                modal={true}
                ref="wondialog">
                <h3>Let's add you to the Leaderboard. Please enter your details..</h3>

                <TextField
                    hintText="Enter your name"
                    floatingLabelText="Name"
                    ref="name"
                    onKeyDown={this._onNameKeyDown}
                    underlineStyle={{borderColor:Colors.green500}}/>
                <br/>
                <TextField
                    hintText="Enter your email address"
                    floatingLabelText="Email"
                    ref="email"
                    onKeyDown={this._onEmailKeyDown}
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

    _onShow() {
        this.refs.name.focus();
    },

    _onTryKeyDown(e) {
        switch(e.key) {
            case "ArrowLeft":
            case "ArrowUp":
                this._butttonBlur(this.refs.try);
                this.refs.email.focus();
                break;
            case "ArrowRight":
                this._butttonBlur(this.refs.try);
                this._butttonFocus(this.refs.submit);
                break;
        }
    },

    _onSubmitKeyDown(e) {
        switch(e.key) {
            case "ArrowUp":
                this._butttonBlur(this.refs.submit);
                this.refs.email.focus();
                break;
            case "ArrowLeft":
                this._butttonBlur(this.refs.submit);
                this._butttonFocus(this.refs.try);
                break;
        }
    },

    _onNameKeyDown(e) {
        switch(e.key) {
            case "ArrowDown":
                this.refs.email.focus();
                break;
        }
    },

    _onEmailKeyDown(e) {
        switch(e.key) {
            case "ArrowUp":
                this.refs.name.focus();
                break;
            case "ArrowRight":
            case "ArrowDown":
                this._butttonFocus(this.refs.try);
                break;
        }
    },

    _butttonFocus(ref){
        ref.getDOMNode().focus();
        ref._handleKeyboardFocus({}, true);
    },

    _butttonBlur(ref){
        ref.getDOMNode().blur();
        ref._handleKeyboardFocus({}, false);
    },

    _initDialog() {
        this.refs.wondialog.show();
    }

});

module.exports = WonDialog;
