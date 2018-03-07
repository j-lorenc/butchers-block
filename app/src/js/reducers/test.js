const TEST_ACTION = 'TEST_ACTION'

export const testReducer = (state={idx:1}, action) => {
   
    if(action.type === TEST_ACTION){
       var idx = state["idx"];
       if(idx){
           idx += 1;
       }else{
           idx = 1;
       }
        
       state = {...state, idx}
    }
    
    return state;
}
