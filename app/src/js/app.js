import React from "react";
import PropTypes from "prop-types";

import { Route, Switch } from "react-router";

import Main, {MainS} from "./components/main/main";
import EnhancedRouter from "./components/general/enhanced-router.js";

const App = ({source="browser", url, user}) => {
	console.log(user);
	return (
		<EnhancedRouter source={source} url={url} component={Main}>
			<Switch>
				<Route exact path="/" component={Main}/>
				<Route path="/signup" component={MainS}/>
			</Switch>
		</EnhancedRouter>
	);	
}; 


App.propTypes = {
	source: PropTypes.string,
	url: PropTypes.string,
	user: PropTypes.object
	
};



export default App;