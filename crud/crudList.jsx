'use strict';

var React = require('react');
var superagent = require('superagent');

var CrudList = React.createClass({
    _onDelete: function(characterId, event) {
        superagent
            .del('/cartoonCharacters/' + characterId.toString())
            .end(function(error, response) {
                if (response.ok) {
                    alert('Deleted!');
                    window.location = '/crud';
                } else {
                    alert(error);
                }
            });
    },

    getInitialState: function() {
        return {
            searchText: 'batman'
        };
    },

    _meetsFilteringCriteria: function(cartoonCharacter) {
        return (
            cartoonCharacter.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 ||
            cartoonCharacter.description.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1
            );
    },

    _onSearching: function() {
        this.setState({ searchText: this.refs.searchBox.getDOMNode().value.trim() });
    },

    render: function() {

        var cartoonCharactersElements = this.props.cartoonCharacters.map(function(cartoonCharacter) {
            if (!this._meetsFilteringCriteria(cartoonCharacter)) {
                return;
            }

            return (
                <div key={ cartoonCharacter.name } className="row">
                    <div className="col s4">
                        { cartoonCharacter.name }
                    </div>
                    <div className="col s4">
                        { cartoonCharacter.description }
                    </div>
                    <div className="col s4">
                        <a href={ '/crud/cartoonCharacters/' + cartoonCharacter.id.toString() } className="btn">Edit</a>
                        <button onClick={ this._onDelete.bind(this, cartoonCharacter.id) } className="btn">Delete</button>
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="row">
                <h1>Crud example</h1>
                <div>
                    <label htmlFor="serchBox">Search: </label>
                    <input type="text" id="searchBox" ref="searchBox" onChange={ this._onSearching } />
                </div>
                <a href="crud/cartoonCharacters/new" className="btn btn-large waves-effect waves-light red">Add new</a>
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