'use strict';

var React = require('react');
var mainContainerDiv = document.getElementById('main-container');

var CrudExample = React.createClass({

    render: function() {
        var cartoonCharactesElements = this.props.cartoonCharacters.map(function(cartoonCharacter) {
            return (
                <div className="row">
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
                    { cartoonCharactesElements }
                </div>
            </div>
        );
    }
});

var cartoonCharacters = [
    {
        name: 'Batman',
        description: 'Lost his parents and was afraid of bats but he\'s awesome.`'
    },
    {
        name: 'Spider-man',
        description: 'Lost (surprise) his parents and he\'s living in NYC.'
    }
];

React.render(<CrudExample cartoonCharacters={ cartoonCharacters } />, mainContainerDiv);