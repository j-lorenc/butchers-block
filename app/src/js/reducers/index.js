import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

import {testReducer} from './test';
import {shoppingListReducer} from './shopping-list'


const reducer = combineReducers({
    test:testReducer,
    shoppingList: shoppingListReducer
})

export default reducer;