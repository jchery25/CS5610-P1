// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
// import css from "../css/app.css"

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from 'react';
import ReactDOM from 'react-dom';
import index from "./index";
import socket from "./socket";
import Join from "./join";


/*
$(() => {
  let root = $('#root')[0];
  game_init(root);
});
*/

$(() => {
  let start = document.getElementById('start');
  let join = document.getElementById('join');
  if (start) {
    let channel = socket.channel("games:" + window.gameName, {});
    index(start, channel);
  }
  else if(join){
    let channel = socket.channel("games:" + window.gameName, {});
    ReactDOM.render(<Join channel={channel} />, join);
  }

});