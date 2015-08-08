'use strict';

/* global $ */

var React        = require('react'),
    _            = require('lodash'),
    colorsHelper = require('./colorsHelper'),
    ColorsModal  = require('./colorsModal.component');

var PhotosAndColors = React.createClass({
    getInitialState: function() {
        return {
            selectedFileUrl: '',
            selectedColors: []
        };
    },

    propTypes: {
        imageSelectHandler: React.PropTypes.func.isRequired,
        updateSelectedColorsHandler: React.PropTypes.func.isRequired
    },

    _fileSelected: function(event) {
        var image = event.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function(event)
        {
            var imageBuffer = event.target.result;
            this.setState({ selectedFileUrl: imageBuffer });

            this.props.imageSelectHandler(image.name, imageBuffer);
        }.bind(this);

        reader.readAsDataURL(image);
    },

    _openColorsModal: function() {
        $('#modal1').openModal();
    },

    _closeColorsModalHandler: function() {
        $('#modal1').closeModal();
    },

    _updateSelectedColorsHandler: function(selectedColors) {
        this.setState(function() {
            return { selectedColors: selectedColors };
        }, function() {
            this.props.updateSelectedColorsHandler(selectedColors);
        });
    },

    render: function() {
        var thumbnail;
        if (this.state.selectedFileUrl) {
            thumbnail = <div className="thumbnail">
                <img src={ this.state.selectedFileUrl} alt="thumbail" />
            </div>;
        }
        return (
            <div className="PhotosAndColors row">
                 <div className="file-field input-field">
                    <input className="file-path validate" type="text"/>
                    <div className="btn">
                        <span>Main photo</span>
                        <input type="file" name="mainPhoto" accept="image/*" onChange={ this._fileSelected } />
                    </div>
                </div>
                { thumbnail }
                <div className="colors-container">
                    <button className="btn" type="button" onClick={ this._openColorsModal }>Manage colors</button>
                </div>
                <div>
                    <p>Selected colors: </p>
                    { colorsHelper.mapToHtml(this.state.selectedColors) }
                </div>

                <ColorsModal closeColorsModalHandler={ this._closeColorsModalHandler } updateSelectedColorsHandler={ this._updateSelectedColorsHandler }/>
            </div>
        );
    }
});

module.exports = PhotosAndColors;