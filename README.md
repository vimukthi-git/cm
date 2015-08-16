# Colour Memory Game

This is an app built based on Colour Memory game spec. This app uses following latest technologies/concepts for its implementation.

- [Flux architecure](https://facebook.github.io/flux/docs/overview.html) - The main framework concept used by the app. 
Flux architecture reduces the amount of data and event cross passing confusion by introducing a uni-directional data flow concept.

- [React](https://facebook.github.io/react/index.html) - Is a composable view component framework used by facebook. It abstracts browser 
DOM with a virtual DOM helping to do all kinds of optimizations.
 
- [Material-UI](http://material-ui.com/) - A UI framework for React inspired by Googles material design ui principles.

- [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) - Latest release of JS specification which introduces lot of new functionality.
This app uses [Babel](https://babeljs.io/) for ES6 compilation.

- [Browserify](http://browserify.org/) - Browserify allows the use of NPM for depandancy management of clientside JS apps.
 
- [Gulp](http://gulpjs.com/) - Build system.

- [NodeJS](https://nodejs.org/) - Server side enviroment.

- [Express](http://expressjs.com/) - Static server and REST API framework for the app.

- [Mongodb](https://www.mongodb.org) - No SQL database.

## Installation
After cloning the git repository or untaring the tar file, install dependencies:

```
cd <project folder>
```

```
npm install
```

Note - Before following step install gulp in your machine if not already installed with,
```
sudo npm install gulp -g
```

Then build app:

```
gulp build
```

Install mongodb locally if it isn't installed locally.

Now run the server with,

```
cd build
```

```
node server.js
```

Then visit
```
http://localhost:5000/
```

Now enjoy a Colour Memory game !! :)

## Source Directory Structure

- src - main source directory
- src/public - public files including JS and HTML
- src/public/app - App clientside JS files
- src/public/app/actions - Flux action creators
- src/public/app/components - React components
- src/public/app/constants - App constants
- src/public/app/dispatcher - Flux dispatchers
- src/public/app/stores - Flux stores
- src/public/www - html, CSS and image files
- src/server - server side logic

Serverside entry point - src/api.js

Clientside JS entry point - src/public/app/app.js
