import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import menageReceiptReducer from './Store/Reducers/MenageReceipts';
import menagePurchaseList from './Store/Reducers/MenagePurchaseList';

import './index.css';

const rootReducers = combineReducers({
    recipesReducer: menageReceiptReducer,
    purchaseListReducer: menagePurchaseList
})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
