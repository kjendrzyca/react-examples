'use strict';

const React = require('react'),
      page  = require('page');

require('../node_modules/materialize-css/bin/materialize.js');
require('../node_modules/materialize-css/bin/materialize.css');

const Menu = React.createClass({
    render () {
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

const Home = React.createClass({
    render () {
        return (
            <div className="Home">
                <Menu />
                <div>Hello from home</div>
            </div>
        );
    }
});

const About = React.createClass({
    render () {
        return (
            <div className="About">
                <Menu />
                <div>This is about, hello!</div>
            </div>
        );
    }
});

const Edit = React.createClass({
    render () {
        return (
            <div className="Edit">
                Editing something of id: {this.props.id}
            </div>
        );
    }
});

const mainContainerDiv = document.getElementById('main-container');

const routes = {
    home: () => React.render(<Home />, mainContainerDiv),
    about: () => React.render(<About />, mainContainerDiv),
    edit: (context) => React.render(<Edit id={context.params.id} />, mainContainerDiv),
    loading: (context, next) => {
        React.render(<div>Loading...</div>, mainContainerDiv);
        setTimeout(next, 3000);
    }
};

page('/pageJsRouting', routes.home);
page('/pageJsRouting/about', routes.about);
page('/pageJsRouting/edit/:id', routes.loading, routes.edit);
page();
