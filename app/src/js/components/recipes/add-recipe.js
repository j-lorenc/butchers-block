import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'

import {addToListAction, removeFromListAction} from 'js/actions/shopping-list'
import Calendar from 'js/components/ui/calendar'

@connect((store)=>{
    return {
        test: store.test,
        //shoppingList: store.shoppingList
    }    
},(dispatch)=>{
    return{
        addToListAction: bindActionCreators(addToListAction,dispatch),
        removeFromListAction: bindActionCreators(removeFromListAction,dispatch)
    }
})
class Recipes extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            recipeName: ""
        }
        
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange(e){
        this.setState({recipeName:e.target.value});
    }

    
    render(){
        let {shoppingList} = this.props;
        
        return (
            <div id="shoppingList">
                <h1>Jon</h1>
            </div>
        
        )
    }   
}

export default Recipes;