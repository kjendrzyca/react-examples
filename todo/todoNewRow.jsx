'use strict';

var React = require('react');

var TodoNewRow = React.createClass({
    _rowChanged: function() {
        var idOfChangedRow = this.props.rowId;
        var valueOfChangedRow = this.refs.newItemInput.getDOMNode().value;

        this.props.rowChangedHandler(idOfChangedRow, valueOfChangedRow);
    },

    render: function() {
        return (
            <div className="row">
                <label htmlFor={ 'newTitle' + this.props.rowId }>New item { this.props.rowId }</label>
                <input ref="newItemInput" type="text" onChange={ this._rowChanged } id={ 'newTitle' + this.props.rowId }/>
            </div>
        );
    }
});

module.exports = TodoNewRow;