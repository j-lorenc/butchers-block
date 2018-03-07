//React Imports
import React, {Component} from 'react';
import {render}from 'react-dom';
import {Route} from 'react-router';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
//Redux Imports
import { createStore, applyMiddleware, compose } from 'redux';
//App Imports
import App from 'src/js/app.js';
//Router Imports
import { routerMiddleware } from 'react-router-redux';
//history Imports
import createHistory from 'history/createMemoryHistory';

import reducer from 'src/js/reducers';
const initialState = {}

const history = createHistory();
const store = createStore(reducer, initialState, compose(
    applyMiddleware(routerMiddleware(history))
));




const Root = (url)=> {
    let ctx = {};
    return (
        <Provider store={store}>
            <StaticRouter location={url} context={ctx}>
                <App />
            </StaticRouter>
        </Provider>
    )
}

module.exports = Root;
