'use strict';

/* global $ */

var React = require('react'),
    _     = require('lodash');

var ColorsModal = React.createClass({
    propTypes: {
        closeColorsModalHandler: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            colors: [
                {id:1, name: 'white', code: '#ffffff'},
                {id:2, name: 'black', code: '#000000'},
                {id:3, name: 'purple', code: '#9c27b0'},
                {id:4, name: 'blue', code: '#5677fc'}
            ],
            selectedColors: []
        };
    },

    componentDidMount: function() {
        $('select').material_select();
    },

    _closeColorsModal: function() {
        this.props.closeColorsModalHandler();
    },

    _getColorOptions: function() {
        var options = _.map(this.state.colors, function(color) {
            return <option key={ color.id } value={ color.id }>{ color.name }</option>;
        });

        return options;
    },

    _addSelectedColor: function() {
        var selectedColorId = _.parseInt(this.refs.selectedColor.getDOMNode().value);
        var selectedColor = _.find(this.state.colors, function(color) {
            return color.id === selectedColorId;
        });

        if (!selectedColor) {
            return;
        }

        var selectedColors = this.state.selectedColors;

        if (!this._colorAlreadyDefined(selectedColors, selectedColor.id)) {
            selectedColors.push(selectedColor);
            this.setState({ selectedColors: selectedColors });
        }
    },

    _colorAlreadyDefined: function(selectedColors, selectedColorId) {
        return _.any(selectedColors, function(color) {
            return color.id === selectedColorId;
        });
    },

    _getSelectedColors: function() {
        var selectedColors = _.map(this.state.selectedColors, function(color) {
            return <span>{ color.name }</span>;
        });

        return selectedColors;
    },

    render: function() {
        return (
            <div className="ColorsModal">
                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <div className="container">
                            <h4>Assign colors:</h4>
                            <div className="row">
                                <div className="input-field col s12">
                                    <select ref="selectedColor">
                                        <option value="" disabled selected>Choose your option</option>
                                        { this._getColorOptions() }
                                    </select>
                                    <label>Pick color</label>
                              </div>
                                <div className="col s4">
                                    <button className="btn" type="button" onClick={ this._addSelectedColor }>Add</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="selectedColorsContainer">
                                    { this._getSelectedColors() }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={ this._closeColorsModal }>Done</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ColorsModal;