//Redux Imports

import { createStore, applyMiddleware, compose } from 'redux'


//Router Imports
import { routerMiddleware } from 'react-router-redux'

//history Imports
import createHistory from 'history/createBrowserHistory';

//Extensions Imports
import { devToolsEnhancer } from 'redux-devtools-extension';


import reducer from '../reducers'

const initialState = {
    
}

export const history = createHistory();
export const store = createStore(reducer, initialState, compose(
    applyMiddleware(routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

