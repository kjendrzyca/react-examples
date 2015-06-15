'use strict';
var React = require('react');

var BasicInfo = React.createClass({
    propTypes: {
        updateValueHandler: React.PropTypes.func.isRequired
    },

    _updateValue: function(event) {
        var name = event.target.name;
        var value = event.target.value;
        console.log(name, value);
        this.props.updateValueHandler(name, value);
    },

    render: function() {
        return (
            <div className="BasicInfo row">
                <div className="col s6">
                    <div className="input-field"><input type="text" placeholder="Name" name="name" onChange={ this._updateValue }/></div>
                    <div className="input-field"><input type="text" placeholder="Code" name="code" onChange={ this._updateValue }/></div>
                    <div className="input-field">
                        <textarea cols="30" rows="10" className="materialize-textarea" name="firstAdditionalInfo" onChange={ this._updateValue }></textarea>
                        <label>First additional info:</label>
                    </div>
                </div>
                <div className="col s6">
                    <div className="input-field"><input type="text" placeholder="Description" name="description" onChange={ this._updateValue }/></div>
                    <div className="input-field">
                        <textarea cols="30" rows="10" className="materialize-textarea" name="secondAdditionalInfo" onChange={ this._updateValue }></textarea>
                        <label>Second additional info:</label>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BasicInfo;