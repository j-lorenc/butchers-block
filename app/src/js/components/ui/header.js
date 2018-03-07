import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render(){
        const LinkElement = this.props.link || "span";
        
        return (
            <header>
                <div>
                    <h1><a href="/">Butcher's Block</a></h1>
                </div>
                <div className="spacer">
                </div>                
                {this.props.loggedIn && (
                    <div className="user-info">
                        <div className="mail">
                            <span className="fa-layers fa-fw" title="You have 1 pending message">
                              <i className="fal fa-envelope"></i>
                              <span className="fa-layers-counter fa-layers-top-right">1</span>
                            </span>
                        </div>  
                        <div className="profile">
                            <div className="profile-img"></div>
                            Welcome, Jonathan Lorenc
                        </div>
                        <div className="logoutButton"><a href="/logout">Log out</a></div> 
                    </div>)
                }
            </header>        
        )
    }   
}

export default Header;