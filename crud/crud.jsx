'use strict';

var React = require('react');
var mainContainerDiv = document.getElementById('main-container');

var CrudExample = React.createClass({

    render: function() {
        var cartoonCharactesElements = this.props.cartoonCharacters.map(function(cartoonCharacter) {
            return (
                <div>
                    <div>
                        { cartoonCharacter.name }
                    </div>
                    <div>
                        { cartoonCharacter.description }
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div>Crud example</div>
                <div>
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