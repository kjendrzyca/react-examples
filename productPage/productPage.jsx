'use strict';

var React     = require('react'),
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

    render: function() {
        return (
            <div className="ProductPage container">
                <form name="productForm">
                    <BasicInfo updateValueHandler={ this._updateValueHandler } />
                </form>
            </div>
        );
    }
});

var mainContainerDiv = document.getElementById('main-container');
React.render(<ProductPage />, mainContainerDiv);