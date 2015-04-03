'use strict';

var React = require('react');

var TodoNewRow = React.createClass({
    _valueChanged: function() {
        var idOfChangedRow = this.props.rowId;
        var valueOfChangedRow = this.refs.newItemInput.getDOMNode().value;

        this.props.newTodoStateChangedHandler(idOfChangedRow, valueOfChangedRow);
    },

    render: function() {
        return (
            <div className="row">
                <label htmlFor={ 'newTitle' + this.props.rowId }>New item { this.props.rowId }</label>
                <input ref="newItemInput" type="text" onChange={ this._valueChanged } id={ 'newTitle' + this.props.rowId }/>
            </div>
        );
    }
});

module.exports = TodoNewRow;