import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ManagerRoot from './components/ManagerRoot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ManagerRoot />, document.getElementById('root'));
registerServiceWorker();
