import React, {Component} from 'react';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'

import {addToListAction, removeFromListAction} from 'js/actions/shopping-list'
import Calendar from 'js/components/ui/calendar'

@connect((store)=>{
    return {
        test: store.test,
        shoppingList: store.shoppingList
    }    
},(dispatch)=>{
    return{
        addToListAction: bindActionCreators(addToListAction,dispatch),
        removeFromListAction: bindActionCreators(removeFromListAction,dispatch)
    }
})
class ShoppingList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            shoppingListInput: ""
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitItem = this.submitItem.bind(this);
        this.handleDblClick = this.handleDblClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    
    handleClick(e){
        this.submitItem();
    }
    
    handleDblClick(idx){
        let {removeFromListAction} = this.props;
        removeFromListAction(idx); 
    }
    
    handleKeyUp(e){
        if(e.keyCode == 13){
            this.submitItem();
        }
    }
    
    handleChange(e){
        this.setState({shoppingListInput:e.target.value});
    }
    
    submitItem(){
        let {addToListAction} = this.props;
        this.setState({shoppingListInput:""});
        addToListAction({desc: this.state["shoppingListInput"]});
    }
    
    render(){
        let {shoppingList} = this.props;
        
        return (
            <div id="shoppingListContainer">
                <div id="shoppingList">
                    <h1>Shopping List</h1>
                    <ul>
                        {shoppingList.items.length > 0 ? shoppingList.items.map((item, idx)=>{
                            return (<li onDoubleClick={()=>{this.handleDblClick(idx)}} key={idx}>{item.desc}</li>)
                        }) : (<li>You haven't added any items to your shopping list</li>)}             
                    </ul>                                            
                </div>
                <div id="shoppingListForm">
                    <div>
                        <label htmlFor="shoppingItemDescription">Description: </label>
                        <input id="shoppingItemDescription" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyUp} value={this.state.shoppingListInput}/>
                    </div>
                    <div>
                        <label htmlFor="shoppingItemCategory">Category: </label>
                        <input id="shoppingItemCategory" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyUp} value={this.state.shoppingListInput}/>
                    </div>
                    <div>
                        <label htmlFor="shoppingItemAmount">Amount: </label>
                        <input id="shoppingItemAmount" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyUp} value={this.state.shoppingListInput}/>
                    </div>
                    <div>
                    <label htmlFor="shoppingItemCategory">Category: </label>
                    <input id="shoppingItemCategory" type="text" onChange={this.handleChange} onKeyDown={this.handleKeyUp} value={this.state.shoppingListInput}/>
                    </div>
                    
                    <button onClick={this.handleClick}>Add</button>
                </div>
                
            </div>
        
        )
    }   
}

export default ShoppingList;