/**
 * Created by vimukthib on 8/13/15.
 * WonDialog React component which represents the winning dialog in the Colour Memory game board.
 */

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
let ScoreStore = require('../stores/ScoreStore');

let WonDialog = React.createClass({

    getInitialState: function() {
        return {msg:""};
    },

    componentDidMount: function() {
        ColourMemoryStore.addWonListener(this._initDialog);
        //ColourMemoryStore.addFlipListener(this._initDialog);
        ScoreStore.addScoreSavedListener(this._scoreSaved);
        ScoreStore.addScoreSaveErrorListener(this._scoreSaveError);
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
                title="Congratulations! You Won !"
                actions={actions}
                actionFocus="submit"
                onShow={this._onShow}
                modal={true}
                ref="wondialog">
                <h3>{this.state.msg}</h3>

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

    _scoreSaved: function(event){
        this.refs.wondialog.dismiss();
        ColourMemoryActionCreators.showRank(event.rank);
    },

    _scoreSaveError: function(){
        this._setMsg("We are having trouble with the score server..");
    },

    _inputalidationError: function(){
        this._butttonBlur(this.refs.submit);
        this._setMsg("Please double check name and email you entered..");
    },

    _onDialogCancel: function(event){
        this.refs.wondialog.dismiss();
        ColourMemoryActionCreators.restart();
    },

    _onDialogSubmit: function(event){
        let name = this.refs.name.getValue();
        let email = this.refs.email.getValue();

        if(this._validateName(name) && this._validateEmail(email)) {
            ColourMemoryActionCreators.submitScore(name, email);
        } else {
            this._inputalidationError();
        }
    },

    _validateName: function(name) {
        return name !== null || name !== '' || name !== undefined;
    },

    _validateEmail: function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    _onShow: function() {
        this._setMsg("You scored  "+ this.state.score + " . Please enter your details for the Leaderboard..");
    },

    _setMsg: function(msg){
        this.setState({msg: msg});
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

    _initDialog(event) {
        this.state.score = event.score;
        this.refs.wondialog.show();
    }

});

module.exports = WonDialog;
