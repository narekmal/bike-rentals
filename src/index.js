import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import Home from './components/Home';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store/store';

ReactDOM.render(<Provider store={store}><Home /></Provider>, document.getElementById('root'));
registerServiceWorker();
