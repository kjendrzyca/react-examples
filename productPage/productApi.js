'use strict';

var superagent = require('superagent');

var productApi = {
    save: function(newProduct) {
        superagent
            .post('/product')
            .send(newProduct)
            .end(function(error, response) {
                if (error) { alert(error); return; }
                alert('saved !');
            });
    }
};

module.exports = productApi;