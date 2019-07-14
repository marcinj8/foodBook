import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import menageReceiptReducer from './Store/Reducers/MenageReceipts'

import './index.css';

const store = createStore(menageReceiptReducer, composeWithDevTools(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
