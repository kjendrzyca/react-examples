'use strict';

var React = require('react'),
    _     = require('lodash');

module.exports = {
    mapToHtml: function(colors) {
        return _.map(colors, function(color) {
            return <span key={ color.id } className="selectedColorOnList" style={ { padding: 10, backgroundColor: color.code } }>{ color.name }</span>;
        });
    }
};