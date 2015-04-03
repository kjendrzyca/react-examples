'use strict';

var React = require('react');
var TodoNewRow = require('./TodoNewRow.jsx');

var TodoList = React.createClass({
    getInitialState: function() {
        return {
            numberOfTodosToAdd: 0,
            newTodos: []
        };
    },

    _addNewRow: function() {
        var rowsCounter = this.state.numberOfTodosToAdd + 1;
        this.setState({ numberOfTodosToAdd: rowsCounter });
    },

    _saveAllNewItems: function() {
        this.props.saveNewTodosHandler(this.state.newTodos);
        this.setState({ numberOfTodosToAdd: 0 });
    },

    _rowChangedEventHandler: function(rowId, rowValue) {
        var todoItemsState = this.state.newTodos;
        todoItemsState[rowId] = rowValue;

        this.setState({newTodos: todoItemsState });
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

        var saveButton = <button type="button" className="btn orange" onClick={ this._saveAllNewItems }>Save all items</button>;

        var newRows = [];

        for(var i = 0; i < this.state.numberOfTodosToAdd; i++){
            newRows.push(
                <TodoNewRow rowId={ i } rowChangedHandler={ this._rowChangedEventHandler } key={ i } />
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
                        <button type="button" onClick={ this._addNewRow } className="btn blue">Add</button>
                        { this.state.numberOfTodosToAdd ? saveButton : null }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;