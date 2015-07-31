'use strict';

var React = require('react'),
    page  = require('page');

require('../node_modules/materialize-css/bin/materialize.js');
require('../node_modules/materialize-css/bin/materialize.css');

var Menu = React.createClass({
    render: function() {
        return (
            <ul className="Menu">
                <li><a href="./">Home</a></li>
                <li><a href="./about">About</a></li>
                <li><a href="./edit/1">Edit something of id 1</a></li>
                <li><a href="./edit/2">Edit something of id 2</a></li>
            </ul>
        );
    }
});

var Home = React.createClass({
    render: function() {
        return (
            <div className="Home">
                <Menu />
                <div>Hello from home</div>
            </div>
        );
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div className="About">
                <Menu />
                <div>This is about, hello!</div>
            </div>
        );
    }
});

var Edit = React.createClass({
    render: function() {
        return (
            <div className="Edit">
                Editing something of id: { this.props.id }
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');

function renderHome() {
    React.render(<Home />, mainContainerDiv);
}

function renderAbout() {
    React.render(<About />, mainContainerDiv);
}

function editSomething(context) {
    console.log(context.params);
    React.render(<Edit id={ context.params.id } />, mainContainerDiv);
}

page('/pageJsRouting', renderHome);
page('/pageJsRouting/about', renderAbout);
page('/pageJsRouting/edit/:id', editSomething);
page();