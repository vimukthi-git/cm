(function () {
    let React = require('react/addons');
    let injectTapEventPlugin = require('react-tap-event-plugin');
    let ColourMemory = require('./components/ColourMemory.react.js'); // Our custom react component
    let ColourMemoryActionCreators = require('./actions/ColourMemoryActionCreators');

    //Needed for React Developer Tools
    window.React = React;

    //Needed for onTouchTap
    //Can go away when react 1.0 release
    //Check this repo:
    //https://github.com/zilverline/react-tap-event-plugin
    //injectTapEventPlugin();
    ColourMemoryActionCreators.init();

    // Render the main app react component into the document body.
    // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
    React.render(<ColourMemory />, document.body);

})();