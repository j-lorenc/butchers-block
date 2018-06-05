import React, {Component} from "react";
import PropTypes from "prop-types";

import { Provider } from "react-redux";

class EnhancedRouter extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			module: null 
		};
	}
  
	async componentDidMount() {
		const {source, url, children, component:Component} = this.props;

		if(source === "server"){
			let router = (<ServerRouter url={url} component={Component} />);
			this.setState({ module: router});
		}else if(source === "browser"){
			let router = (
				<ClientRouter component={Component}>
					{children}
				</ClientRouter>
			);
			this.setState({ module: router});
		}
	}
	
	render() {
		const { module: Component } = this.state;
		return(
			<div>
				{Component}		
			</div>
		);
	}
}

class ServerRouter extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			module: null 
		};
	}
	
	async componentDidMount() {
		const {url, component:Component} = this.props;

		try{
			const {StaticRouter} = await import("react-router-dom");
			const router = (
				<StaticRouter location={url} context={{}}>
					<Component/>
				</StaticRouter>
			);
			
			this.setState({ module: router});

		}catch(err){
			console.log(err); // eslint-disable-line no-console
			return (<div/>);
		}
	}
	
	render(){
		const { module: Component } = this.state;
		return(
			<div id="router">
				{Component}		
			</div>
		);
	}
}

class ClientRouter extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			module: null 
		};
	}
	
	async componentDidMount() {
		const {children} = this.props;
		
		try{
			const {ConnectedRouter} = await import("react-router-redux");
			const {store, history} = await import("../../store/store");
			const router = (
				<Provider store={store}>
					<ConnectedRouter history={history}>
						{children}
					</ConnectedRouter>
				</Provider>		
			);

			this.setState({ module: router});
		}catch(err){
			console.log(err); // eslint-disable-line no-console
		}
	}
	
	render(){
		const { module: Component } = this.state;
		return(
			<div id="router">
				{Component}		
			</div>
		);
	}
}

EnhancedRouter.propTypes = {
	source: PropTypes.string,
	url: PropTypes.string
};

export default EnhancedRouter;
