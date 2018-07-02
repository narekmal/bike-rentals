import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, Route, hashHistory} from 'react-router';
import ManagerRoot from './components/ManagerRoot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ManagerRoot />, document.getElementById('root'));
registerServiceWorker();
