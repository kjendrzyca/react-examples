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

    _addNewTodoRow: function() {
        var rowsCounter = this.state.numberOfTodosToAdd + 1;
        this.setState({ numberOfTodosToAdd: rowsCounter });
    },

    _saveAllNewTodos: function() {
        var newTodosThatAreNotEmpty = this.state.newTodos.filter(function(todoTitle) {
            return todoTitle.length > 0;
        });

        this.props.saveNewTodosHandler(newTodosThatAreNotEmpty);
        this.setState({ numberOfTodosToAdd: 0 });
    },

    _newTodoStateChangedHandler: function(todoId, newValue) {
        var todoItemsState = this.state.newTodos;
        todoItemsState[todoId] = newValue;

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

        var saveButton = <button type="button" className="btn orange" onClick={ this._saveAllNewTodos }>Save all items</button>;

        var newRows = [];
        for(var i = 0; i < this.state.numberOfTodosToAdd; i++){
            newRows.push(
                <TodoNewRow rowId={ i } newTodoStateChangedHandler={ this._newTodoStateChangedHandler } key={ i } />
            );
        }

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">TodoList</a>
                    </div>
                </nav>
                <div>
                    { todos }
                    <div>
                        { newRows }
                        <button type="button" onClick={ this._addNewTodoRow } className="btn blue">Add</button>
                        { this.state.numberOfTodosToAdd ? saveButton : null }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoList;