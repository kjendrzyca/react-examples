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

        var callback = function(error, response) {
            if (response.ok) {
                alert('Saved!');
                window.location = '/crud';
            } else {
                alert(error);
            }
        };

        if (this.props.isEditForm) {
        superagent
            .put('/cartoonCharacters/' + formValues.id)
            .send(formValues)
            .end(callback);
        } else {
            superagent
            .post('/cartoonCharacters')
            .send(formValues)
            .end(callback);
        }
    },

    entity: {

    },

    componentWillMount: function() {
        if (this.props.isEditForm) {
            this.entity = {
                id: this.props.cartoonCharacter.id,
                name: this.props.cartoonCharacter.name,
                description: this.props.cartoonCharacter.description
            };
        } else {
            this.entity = {
                id: '',
                name: '',
                description: ''
            };
        }
    },

    render: function() {
        var idStyle = {

        };

        var labelClass = 'active';

        if (!this.props.isEditForm) {
            idStyle = {
                display: 'none'
            };

            labelClass = '';
        }

        return (
            <div className="container">
                <h2>{ this.entity.name }</h2>
                <form onSubmit={ this.onFormSubmit }>
                    <div className="input-field">
                        <label htmlFor="id" className={ labelClass } style={ idStyle } >Id</label>
                        <input type="text" id="id" style={ idStyle } ref="id" defaultValue={ this.entity.id } readOnly />
                    </div>
                    <div className="input-field">
                        <label htmlFor="id" className={ labelClass }>Name</label>
                        <input type="text" id="name" ref="name" defaultValue={ this.entity.name } />
                    </div>
                    <div className="input-field">
                        <label htmlFor="id" className={ labelClass }>Description</label>
                        <input type="text" id="description" ref="description" defaultValue={ this.entity.description } />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = SingleEntity;