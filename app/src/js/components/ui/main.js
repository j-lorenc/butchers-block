import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom';

import ShoppingList from "js/components/shopping-list/index.js";
import RecipesList from "js/components/recipes/index.js";

class Main extends Component {
    
    render() {
        return (
            <main>
                <Switch>                
                    <Route exact path='/' component={ShoppingList}/>
                    <Route exact path='/shopping-list' component={ShoppingList}/>
                    <Route path='/recipes' component={RecipesList}/>
                </Switch>
            </main>
        ) 
    }
}

export default Main;