'use strict';

var React = require('react');

var TodoList = React.createClass({
    render: function() {
        var todos = this.props.todos.map(function(element) {
            return (
                <div>
                    <div className="row">
                        <div className="col s6">{ element.id }</div>
                        <div className="col s6">{ element.title }</div>
                    </div>
                </div>
            );
        });

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