import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {connect} from "react-redux"
import { bindActionCreators } from 'redux'

import {addToListAction, removeFromListAction} from 'js/actions/shopping-list'
import AddRecipe from 'js/components/recipes/add-recipe'
import Recipe from 'js/components/recipes/recipe'

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
        console.log(this.props.location);
        
        let jon = {
                name: "Chicken Cheddar Fajitas",
                subtitle: "with Bell Pepper, Lime Crema, and Pickled Jalapeno",
                prepTime: "10 mins",
                totalTime: "40 mins",
                ingredients: [
                    "Red Bell Pepper",
                    "Red Onion",
                    "Jalapeno",
                    "Lime",
                    "Southwest Spice Blend",
                    "Sour Cream",
                    "Chicken Breasts",
                    "Flour Tortillas",
                    "Cheddar Cheese"
                ],
                
                directions: [
                    {
                        header:"Preheat and Prep",
                        description:"Wash and dry all produce. Adjust rack to middle position and preheat oven to 400 degrees. Core and seed bell pepper, then thinly slice. Halve, peel, and thinly slice onion. Slice jalapeno into thin rounds, removing ribs and seeds for less hear. Place in a small bowl. Zest lime until you have 1/2 tsp zest, then cut into halves. Cut one half into wedges."
                    },{
                        header:"Cook Veggies",
                        description:"Squeeze juice from lime half into bowl with jalapeno and toss to coat. Set aside to marinate. Heat a drizzle of oil in a large pan over medium-high heat. Add onion, bell pepper, and 1 tsp Southwest spice. Cook until softened and lightly charred, 4-5 minutes, tossing. Season with salt and pepper. Remove pan and set aside."
                    },{
                        header:"Make Crema",
                        description:"Mix together sour cream, lime zest, and a squeeze of lime juice in another small bowl. Stir in 1 TBSP water. Season with salt and pepper"
                    },{
                        header:"Cook Chicken",
                        description:"Heat a large drizzle or oil in pan used for veggies over medium-high heat. Slice chicken into thin strips. Season with salt and pepper. Add to pan in a single layer and cook, tossing occasionally, until just browned on surface, 2-4 minutes. Toss in veggies and another 1 tsp Southest spice. Continue cooking until chicken is no longer pink in center, 2-3 minutes more."
                    },{
                        header:"Bake Tortillas",
                        description:"Meanwhile, place tortillas on a baking sheet in a single layer and sprinkle evenly with cheaddar. Bake in oven until cheese is just melted, 1-2 minutes. TIP: Don't let these sit in the oven too long. The tortillas should be soft, not crisp."
                    },{
                        header:"Assemble and Serve",
                        description:"Divide chicken and veggies between tortillas. Dollop with crema and scatter jalapeno over (to taste). Serve any remaining lime wedges on the side for squeezing over."
                    }
                    
                ]
            };
        
            let bill = {
                name: `Jon's secret pierogi`
            }
            
            let jons = (<Recipe recipe={jon}/>);
            let bills = (<Recipe recipe={bill}/>);
        
        return (
            <div id="">
                <h1>Recipes</h1>
                <div className="flex">
                    <div className="">
                        
                        <div><Link to="/recipes/jon"><h2>Chicken Cheddar Fajitas</h2></Link></div>
                        <div><Link to="/recipes/jons"><h2>Jon's Secret Pierogi</h2></Link></div>
                        <button>Add Recipe</button>
                        <input type="text" onChange={this.handleChange} value={this.state.recipeName}/>
                    </div>
                    <div className="flex-expand">
                        <Switch>
                            <Route exact path={"/recipes/add"} component={AddRecipe}/>
                        </Switch>
                        {jon}
                    </div>
                </div>
            </div>
        
        )
    }   
}

export default Recipes;