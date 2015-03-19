'use strict';

var React = require('react');

var CrudList = React.createClass({

    render: function() {
        var cartoonCharactersElements = this.props.cartoonCharacters.map(function(cartoonCharacter) {
            return (
                <div key={ cartoonCharacter.name } className="row">
                    <div className="col s4">
                        { cartoonCharacter.name }
                    </div>
                    <div className="col s4">
                        { cartoonCharacter.description }
                    </div>
                    <div className="col s4">
                        <a href={ '/crud/cartoonCharacter/' + cartoonCharacter.id.toString() }>Edit</a>
                    </div>
                </div>
            );
        });

        return (
            <div className="row">
                <h1>Crud example</h1>
                <a href="crud/cartoonCharacter/add" className="btn btn-large waves-effect waves-light red">Add new</a>
                <div className="col s12">
                    <div className="row red darken-1 white-text">
                        <div className="col s4">Name</div>
                        <div className="col s4">Description</div>
                        <div className="col s4">Actions</div>
                    </div>
                    { cartoonCharactersElements }
                </div>
            </div>
        );
    }
});

module.exports = CrudList;