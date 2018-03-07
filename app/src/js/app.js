import React, {Component} from 'react';

import Header from "./components/ui/header.js";
import Footer from "./components/ui/footer.js";
import Sidebar from "./components/ui/sidebar.js";
import Main from "./components/ui/main.js";

class App extends Component {
    
    render(){
        return (
            <div id="app">
                <Header loggedIn={true}/>
                <div id="container">
                    <Sidebar />
                    <Main />
                </div>
                <Footer/>
            </div>
        );    
    }
    
}

export default App