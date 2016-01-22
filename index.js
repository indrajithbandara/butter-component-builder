import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../../src';

let testData = {}
try {
    testData = require('json!../../test/data.json');
} catch (e){
    console.error ('could not load test data')
}

import fa from './node_modules/font-awesome/css/font-awesome.css';

window.i18n = {
    __: x => x
}

ReactDOM.render(<Component {...testData}/>, document.getElementById('root'));
