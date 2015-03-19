'use strict';

var React = require('react');

var CrudList = React.createClass({

    render: function() {
        var cartoonCharactersElements = this.props.cartoonCharacters.map(function(cartoonCharacter) {
            return (
                <div key={ cartoonCharacter.name } className="row">
                    <div className="col s6">
                        { cartoonCharacter.name }
                    </div>
                    <div className="col s6">
                        { cartoonCharacter.description }
                    </div>
                </div>
            );
        });

        return (
            <div className="row">
                <h1>Crud example</h1>
                <div className="col s12">
                    <div className="row red darken-1">
                        <div className="col s6">Name</div>
                        <div className="col s6">Description</div>
                    </div>
                    { cartoonCharactersElements }
                </div>
            </div>
        );
    }
});

module.exports = CrudList;