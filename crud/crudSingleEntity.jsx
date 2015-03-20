'use strict';

var React = require('react');

var SingleEntity = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="input-field">
                    <label htmlFor="id" className="active">Id</label>
                    <input type="text" id="id" value={ this.props.cartoonCharacter.id } readOnly />
                </div>
                <div className="input-field">
                    <label htmlFor="id" className="active">Name</label>
                    <input type="text" id="name" value={ this.props.cartoonCharacter.name } />
                </div>
                <div className="input-field">
                    <label htmlFor="id" className="active">Description</label>
                    <input type="text" id="description" value={ this.props.cartoonCharacter.description } />
                </div>
            </div>
        );
    }
});

module.exports = SingleEntity;