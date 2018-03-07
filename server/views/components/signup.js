//React Imports
import React, {Component} from 'react';
import Header from 'js/components/ui/header';

import ajax from 'js/lib/ajax'

import fsfsf from "src/scss/index.scss";
import scss from "src/scss/signup.scss";


class Signup extends Component {
    
    constructor(props){
        super(props);
        
        console.log(this.props.messages);
        this.state = {
            username:"",
            password:"",
            errorMessages: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    
    handleClick(e){
        ajax.ajaxPost("/api/signup", {...this.state}).then((redirect)=>{
            redirect();
        },(err, errText)=>{
            console.log(err)
        });
    }
    
    handleLogin(e){
        ajax.ajaxPost("/api/login", {...this.state}).then((redirect)=>{
            redirect();
        },(err, errText)=>{
            console.log(JSON.parse(err.response));
            this.setState({errorMessages:JSON.parse(err.response).LoginMessage[0]});
        });
    }
    
    handleUserChange(e){
        this.setState({username:e.target.value})
    }
    
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    
    render(){
        return (
            <div className="login">
                <Header/>
                <div className="loginBody">
                    
                    <div className="form">
                        <span className={"errorMessages" + (this.state.errorMessages.length > 0 && " active")}>{this.state.errorMessages}</span>
                        <div><input type="text" placeholder="username" value={this.state.username} onChange={this.handleUserChange}/></div>
                    <div><input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/></div>
                        <div>
                            <button onClick={this.handleLogin}>Login</button><button onClick={this.handleClick}>Signup</button></div>
                    </div>
                </div> 
            </div>
        )
    }
}


const getSignup = (messages) => {
    return (
        <Signup messages={messages}/>
    )
}

export default getSignup;
module.exports = getSignup;
