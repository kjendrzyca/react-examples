'use strict';

var React = require('react');

var ColorsModal = React.createClass({
    propTypes: {
        closeColorsModalHandler: React.PropTypes.func.isRequired
    },

    _closeColorsModal: function() {
        this.props.closeColorsModalHandler();
    },

    render: function() {
        return (
            <div className="ColorsModal">
                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <div className="container">
                            <h4>Assign colors:</h4>
                            <div className="row">
                                <div className="col s8">
                                    <input type="text" placeholder="type color name..." />
                                </div>
                                <div className="col s4">
                                    <button className="btn" type="button" onClick={ this._addSelectedColor }>Add</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="selectedColorsContainer">
                                    // selected colors placeholder
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