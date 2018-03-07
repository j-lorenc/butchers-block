import React, {Component} from "react";
import {NavLink, Link} from 'react-router-dom';

import {routes} from 'js/routes/index' 
 
class Sidebar extends Component {
    
    render() {
        
        return (
            <nav>
                <ul>
                    {routes.map((route)=> (<li key={route.label}><NavLink to={route.url}>{route.label}</NavLink></li>))}
                </ul>
            </nav>
        
        )
    }
    
    
}

export default Sidebar;