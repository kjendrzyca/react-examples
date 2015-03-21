'use strict';

var React = require('react');
var superagent = require('superagent');

var SingleEntity = React.createClass({
    onFormSubmit: function(event) {
        event.preventDefault();
        var formValues = {
            id: this.refs.id.getDOMNode().value,
            name: this.refs.name.getDOMNode().value,
            description: this.refs.description.getDOMNode().value
        };

        superagent
            .put('/cartoonCharacters/' + formValues.id)
            .send(formValues)
            .end(function(error, response) {
                if (response.ok) {
                    alert('Saved!');
                    window.location = '/crud';
                } else {
                    alert(error);
                }
            });
    },

    render: function() {
        return (
            <div className="container">
                <h2>{ this.props.cartoonCharacter.name }</h2>
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