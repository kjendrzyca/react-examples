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
                    <div><input type="text" placeholder="Name" name="name" onBlur={ this._updateValue }/></div>
                    <div><input type="text" placeholder="Code" name="code" onBlur={ this._updateValue }/></div>
                    <div><textarea cols="30" rows="10" name="firstAdditionalInfo" onBlur={ this._updateValue }></textarea></div>
                </div>
                <div className="col s6">
                    <div><input type="text" placeholder="Description" name="description" onBlur={ this._updateValue }/></div>
                    <div><textarea cols="30" rows="10" name="secondAdditionalInfo" onBlur={ this._updateValue }></textarea></div>
                </div>
            </div>
        );
    }
});

module.exports = BasicInfo;