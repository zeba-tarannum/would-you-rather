import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './components/App';

let store = createStore(reducer, middleware);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
