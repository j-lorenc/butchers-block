import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

import { withRouter } from "react-router";
import url from "url";


const SignupView = ({errorMessages, username, password, handleUserChange, handlePasswordChange, handleLogin, handleClick}) => {
	
	return (
		<div className={styles.login}>
			<div className={styles.loginBody}>
				<div className={styles.form}>
					<span className={"errorMessages" + (errorMessages.length > 0 && " active")}>{errorMessages}</span>
					<div><input type="text" placeholder="username" value={username} onChange={handleUserChange}/></div>
					<div><input type="password" placeholder="password" value={password} onChange={handlePasswordChange}/></div>
					<div>
						<button onClick={handleLogin}>Login</button><button onClick={handleClick}>Signup</button>
					</div>
				</div>
			</div> 
		</div>
	);
};

SignupView.propTypes = {
	errorMessages: PropTypes.string,
	username: PropTypes.string,
	password: PropTypes.string,
	handleUserChange: PropTypes.func,
	handlePasswordChange: PropTypes.func,
	handleLogin: PropTypes.func,
	handleClick: PropTypes.func
};




class Signup extends Component {
	
	constructor(props){
		super(props);
		
		this.state={
			errorMessages: "",
			username: "",
			password: ""
		};
		
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	
	handleUserChange(e){
		this.setState({
			username: e.target.value
		});
	}
	
	
	handlePasswordChange(e){
		this.setState({
			password: e.target.value
		});
	}
	
	
	async handleLogin(){
		const { history } = this.props;
		
		const res = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			credentials: "include",
			redirect: "follow",
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		});
		if(res.redirected){
			history.push(url.parse(res.url).pathname);
		}		
	}
	
	
	async handleClick(){
		await fetch("/api/signup", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			credentials:"include",
			redirect: "follow",
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		});
	}
	
	
	render(){
		return React.createElement(SignupView, {
			errorMessages: this.state.errorMessages,
			username: this.state.username,
			password: this.state.password,
			handleUserChange: this.handleUserChange,
			handlePasswordChange: this.handlePasswordChange,
			handleLogin: this.handleLogin,
			handleClick: this.handleClick
		});
	}
}

export default withRouter(Signup);