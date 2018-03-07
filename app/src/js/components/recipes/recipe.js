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
        this.state = {}
        this.state.recipe = {...this.props.recipe};
        
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange(e){
        this.setState({recipeName:e.target.value});
    }

    
    render(){
        let {name, subtitle, prepTime, totalTime, ingredients, directions} = this.state.recipe;
        
        return (
            <div id="recipe">
                <h1>{name}</h1> 
                <h2>{subtitle}</h2>
                <h3>Prep Time: {prepTime}</h3>
                <h3>Total Time: {totalTime}</h3>
                
                <div><h4>Ingredients</h4></div>
                <ul>
                    {ingredients && ingredients.map((ingredient)=>{
                        return (<li>{ingredient}</li>)
                    })}
                </ul>
                
                <div><h4>Directions</h4></div>
                <ol>
                    {directions && directions.map((direction)=>{
                        return (<li><h4>{direction.header}</h4>{direction.description}</li>)
                    })}
                </ol>
            </div>
        
        )
    }   
}

export default Recipes;