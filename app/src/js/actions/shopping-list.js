const ADD_TO_LIST_ACTION = 'ADD_TO_LIST_ACTION';
const REMOVE_FROM_LIST_ACTION = 'REMOVE_FROM_LIST_ACTION'

export const addToListAction = (shoppingListItem) => {
    return {
        type: ADD_TO_LIST_ACTION,
        shoppingListItem
    }
    
}

export const removeFromListAction = (idx) => {
    return {
        type: REMOVE_FROM_LIST_ACTION,
        idx
    }
    
}