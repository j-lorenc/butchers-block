import React, {Component} from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import styles from "./header.scss"; 

class Header extends Component { 
    
	render(){
		return ( 
			<header className={styles.header}>
				<div>
					<h1><Link to="/asd">Butcher&apos;s Block</Link></h1>
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
		);
	}
}

Header.propTypes = {
	loggedIn: PropTypes.string
};

export default Header;