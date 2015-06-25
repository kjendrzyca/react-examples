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
                selectedImage: {},
                selectedColorsIds: []
            },
            validationErrors: {
                name: [],
                description: [],
                selectedImage: []
            }
        };
    },

    _updateValueHandler: function(name, value) {
        if (!this._productFieldIsValid(name)) {
            return;
        }

        this._setProductState(function(product) {
            product[name] = value;
            return { product: product };
        });

        console.log(this.state.product);
    },

    _productFieldIsValid: function(name) {
        return this.state.product.hasOwnProperty(name) && name !== 'selectedImage' && name !== 'selectedColorsIds';
    },

    _imageSelectHandler: function(imageName, imageBuffer) {
        var selectedImage = {
            name: imageName,
            imageBuffer: imageBuffer
        };

        this._setProductState(function(product) {
            product.selectedImage = selectedImage;
            return { product: product };
        });
    },

    _updateSelectedColorsHandler: function(selectedColors) {
        var colorsIds = _.map(selectedColors, function(color) {
            return color.id;
        });

        this._setProductState(function(product) {
            product.selectedColorsIds = colorsIds;
            this.setState({ product: product });
        }.bind(this));
    },

    _setProductState: function(updateFn) {
        var product = this.state.product;
        updateFn(product);
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
                    <PhotosAndColors imageSelectHandler={ this._imageSelectHandler } updateSelectedColorsHandler={ this._updateSelectedColorsHandler } />
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