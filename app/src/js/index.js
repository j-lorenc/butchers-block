//React Imports
import React, {Component} from 'react';
import {render, hydrate}from 'react-dom';

import {Route} from 'react-router';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import {history, store} from "./store"

//App Imports
import App from './App'

import "scss/index.scss";
import fontawesome from 'font-awesome-pro';

const Root = ()=> (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App} />
        </ConnectedRouter>
    </Provider>
)
hydrate(
    <Root/>,            
    document.getElementById("root")
);
