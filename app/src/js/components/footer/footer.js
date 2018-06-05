import React, {Component} from "react";
import styles from "./footer.scss";

class Footer extends Component {
    
	render(){
		return (
			<footer className={styles.footer}>
				<div>Created by &copy; Jonathan Lorenc</div>
				<div><span>Careers </span>|<span> Help </span>|<span> Site Map</span> | <span>Contact Us</span></div>
			</footer>        
		);
	}   
}

export default Footer;