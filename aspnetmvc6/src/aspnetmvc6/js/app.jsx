let React = require('react');

let Menu = React.createClass({
    render () {
        return (
            <ul className="Menu">
                <li><a href="./">Home</a></li>
                <li><a href="./about">About</a></li>
            </ul>
        );
    }
});

let Home = React.createClass({
    render () {
        return (
            <div className="Home">
                <Menu />
                <div>Hello everyone! something new here</div>
            </div>
        );
    }
});

let About = React.createClass({
    render () {
        return (
            <div className="About">
                <Menu />
                <div>This is about, hello!</div>
            </div>
        );
    }
});

let Edit = React.createClass({
    render () {
        return (
            <div className="Edit">
                Editing something of id: {this.props.id}
            </div>
        );
    }
});

let mainContainerDiv = document.getElementById('main-container');
React.render(<Home />, mainContainerDiv);
