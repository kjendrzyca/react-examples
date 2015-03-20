'use strict';

var React = require('react');

var SingleEntity = React.createClass({
    onFormSubmit: function(event) {
        event.preventDefault();
        var formValues = {
            id: this.refs.id.getDOMNode().value,
            name: this.refs.name.getDOMNode().value,
            description: this.refs.description.getDOMNode().value
        };

        // TODO: post to server
        console.log(formValues);
    },

    render: function() {
        return (
            <div className="container">
                <form onSubmit={ this.onFormSubmit }>
                    <div className="input-field">
                        <label htmlFor="id" className="active">Id</label>
                        <input type="text" id="id" ref="id" defaultValue={ this.props.cartoonCharacter.id } readOnly />
                    </div>
                    <div className="input-field">
                        <label htmlFor="id" className="active">Name</label>
                        <input type="text" id="name" ref="name" defaultValue={ this.props.cartoonCharacter.name } />
                    </div>
                    <div className="input-field">
                        <label htmlFor="id" className="active">Description</label>
                        <input type="text" id="description" ref="description" defaultValue={ this.props.cartoonCharacter.description } />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = SingleEntity;