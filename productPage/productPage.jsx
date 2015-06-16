'use strict';

var React     = require('react'),
    BasicInfo = require('./basicInfo.component'),
    PhotosAndColors = require('./photosAndColors.component'),
    productApi = require('./productApi');

var _ = require('lodash');

var possibleErrors = {
    required: function(fieldName) {
        return { type: 'required', text: fieldName };
    }
};

var ProductPage = React.createClass({
    getInitialState: function() {
        return {
            product: {
                name: '',
                code: '',
                description: '',
                firstAdditionalInfo: '',
                secondAdditionalInfo: ''
            },
            validationErrors: {
                name: [],
                description: []
            }
        };
    },

    _updateValueHandler: function(name, value) {
        if (!this.state.product.hasOwnProperty(name)) {
            return;
        }

        var product = this.state.product;
        product[name] = value;
        this.setState({ product: product });
        console.log(product);
    },

    _saveProduct: function(event) {
        event.preventDefault();

        this._validateProductBeforeSaving();

        var thereAreErrors = _.some(this.state.validationErrors, function(array) {
            return array.length > 0;
        });

        if (thereAreErrors) {
            console.log('there are errors!');
        } else {
            productApi.save(this.state.product);
        }
    },

    _validateProductBeforeSaving: function() {
        if (!this.state.product.name) {
            this._setRequiredValidationMessageFor('name');
        }
        if (!this.state.product.description) {
            this._setRequiredValidationMessageFor('description');
        }
    },

    _setRequiredValidationMessageFor: function(fieldName) {
        var validationErrors = this.state.validationErrors;
        validationErrors[fieldName].push(possibleErrors.required(fieldName));
        this.setState({ validationErrors: validationErrors });
        console.log(this.state.validationErrors);
    },

    render: function() {
        return (
            <div className="ProductPage container">
                <form name="productForm">
                    <BasicInfo updateValueHandler={ this._updateValueHandler } />
                    <PhotosAndColors />
                    <button className="btn btn-primary right" type="button" name="submit" onClick={ this._saveProduct }>Save</button>
                </form>
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');
React.render(<ProductPage />, mainContainerDiv);