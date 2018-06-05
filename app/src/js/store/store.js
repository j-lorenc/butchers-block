import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware, compose } from "redux";

import reducer from "../reducers/base-reducer";

const initialState = {};

const history = createHistory();
const store = createStore(reducer, initialState, compose(
	applyMiddleware(routerMiddleware(history)),
	window && window.devToolsExtension ? window.devToolsExtension() : f => f
));

export {store, history};