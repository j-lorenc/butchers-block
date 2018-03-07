const ADD_TO_LIST_ACTION = 'ADD_TO_LIST_ACTION';
const REMOVE_FROM_LIST_ACTION = 'REMOVE_FROM_LIST_ACTION';

export const shoppingListReducer = (state={items:[]}, action) => {
   
    if(action.type === ADD_TO_LIST_ACTION){
       let items = state.items;
       if(items && action.shoppingListItem){
           items = [...items].concat(action.shoppingListItem);
           state = {...state, items}
       }
    }
    
    if(action.type === REMOVE_FROM_LIST_ACTION){
       let items = state.items;
        console.log("items", items)
        console.log("idx", action.idx);
        
       if(items && action.idx >= 0){
           console.log(items);
           items = [...items].filter((val, idx)=>{
               return idx != action.idx;   
           })
           state = {...state, items}
       }
    }
    return state;
}
