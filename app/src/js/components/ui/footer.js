import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render(){
        return (
            <footer>
                <div>Created by &copy; Jonathan Lorenc</div>
                <div><span>Careers </span>|<span> Help </span>|<span> Site Map</span> | <span>Contact Us</span></div>
            </footer>        
        )
    }   
}

export default Header;