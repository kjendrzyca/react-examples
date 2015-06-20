'use strict';

var React     = require('react'),
    BasicInfo = require('./basicInfo.component'),
    PhotosAndColors = require('./photosAndColors.component'),
    productApi = require('./productApi');

require('../node_modules/materialize-css/bin/materialize.js');
require('../node_modules/materialize-css/bin/materialize.css');

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
                secondAdditionalInfo: '',
                selectedImage: {}
            },
            validationErrors: {
                name: [],
                description: [],
                selectedImage: []
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

    _imageSelectHandler: function(imageName, imageBuffer) {
        var selectedImage = {
            name: imageName,
            imageBuffer: imageBuffer
        };

        var product = this.state.product;
        product.selectedImage = selectedImage;
        this.setState({ product: product });
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
        if (!this.state.product.selectedImage) {
            this._setRequiredValidationMessageFor('selectedImage');
        }
    },

    _setRequiredValidationMessageFor: function(fieldName) {
        var validationErrors = this.state.validationErrors;
        validationErrors[fieldName].push(possibleErrors.required(fieldName));
        this.setState({ validationErrors: validationErrors });
    },

    _getValidationErrors: function() {
        var errors = _.map(this.state.validationErrors, function(validationError) {
            var errorValues = _.values(validationError);
            var concatenatedErrors = _.reduce(errorValues, function(result, nextError) {
                result = result+ nextError.type + ' ' + nextError.text + ', ';
                return result;
            }, '');

            return <span>{ concatenatedErrors }</span>;
        });

        return errors;
    },

    render: function() {
        return (
            <div className="ProductPage container">
                <form name="productForm">
                    <BasicInfo updateValueHandler={ this._updateValueHandler } />
                    <PhotosAndColors imageSelectHandler={ this._imageSelectHandler } />
                    <button className="btn btn-primary right" type="button" name="submit" onClick={ this._saveProduct }>Save</button>
                </form>
                <div className="row">
                    { this._getValidationErrors() }
                </div>
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');
React.render(<ProductPage />, mainContainerDiv);