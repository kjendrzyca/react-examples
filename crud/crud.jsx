'use strict';

var React = require('react');
var mainContainerDiv = document.getElementById('main-container');
console.log(mainContainerDiv);

var CrudExample = React.createClass({
    render: function() {
        return (
            <div>Crud example</div>
        );
    }
});

React.render(<CrudExample />, mainContainerDiv);