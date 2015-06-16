'use strict';

var React = require('react');

var PhotosAndColors = React.createClass({
    render: function() {
        return (
            <div className="PhotosAndColors row">
                 <div className="file-field input-field">
                    <input className="file-path validate" type="text"/>
                    <div className="btn">
                        <span>Main photo</span>
                        <input type="file" name="mainPhoto" />
                    </div>
                </div>
                <div className="colors-container">
                    //placeholder for colors
                </div>
            </div>
        );
    }
});

module.exports = PhotosAndColors;