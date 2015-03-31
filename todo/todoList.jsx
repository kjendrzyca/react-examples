'use strict';

var React = require('react');

var TodoList = React.createClass({
    render: function() {
        var todos = (
            <div>
                <div className="row">todo1</div>
                <div className="row">todo2</div>
                <div className="row">todo3</div>
            </div>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">TodoList</a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="#">{ 'Add new' }</a></li>
                        </ul>
                    </div>
                </nav>
                <div>
                    { todos }
                </div>
            </div>
        );
    }
});

module.exports = TodoList;