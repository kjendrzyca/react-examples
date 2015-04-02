'use strict';

var React = require('react');

var TodoList = React.createClass({
    getInitialState: function() {
        return {
            numberOfNewRowsToAdd: 0
        };
    },

    addNew: function() {
        var rowsCounter = this.state.numberOfNewRowsToAdd + 1;
        this.setState({ numberOfNewRowsToAdd: rowsCounter });
    },

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


        var newRows = [];

        for(var i = 0; i < this.state.numberOfNewRowsToAdd; i++){
            newRows.push(
                <div className="row" key={ 'newRow' + i }>
                    <label htmlFor={ 'newTitle' + i}>New: </label>
                    <input type="text" id={ 'newTitle' + i}/>
                </div>
            );
        }

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
                    <div>
                        { newRows }
                        <button type="button" onClick={ this.addNew } className="btn blue">Add</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;