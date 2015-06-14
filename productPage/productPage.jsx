'use strict';

var React     = require('react'),
    superagent = require('superagent'),
    BasicInfo = require('./basicInfo.component');

var ProductPage = React.createClass({
    getInitialState: function() {
        return {
            product: {
                name: '',
                code: '',
                description: '',
                firstAdditionalInfo: '',
                secondAdditionalInfo: ''
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

        //_validateRequiredFields();

        superagent
            .post('/product')
            .send(this.state.product)
            .end(function(error, response) {
                if (error) { alert(error); return; }
                alert('saved !');
            });
    },

    render: function() {
        return (
            <div className="ProductPage container">
                <form name="productForm">
                    <BasicInfo updateValueHandler={ this._updateValueHandler } />
                    <button type="button" name="submit" onClick={ this._saveProduct }>Save</button>
                </form>
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');
React.render(<ProductPage />, mainContainerDiv);