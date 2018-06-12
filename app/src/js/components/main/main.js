import React from "react";

import Header from "../header/header";
import Footer from "../footer/footer";
import Signup from "../signup";

import PropTypes from "prop-types";

import RecipeList from "../recipe-list";


import styles from "./main.scss";
import "../../../scss/index.scss";

  
const Main = ({user})=> {
	console.log(user);
	return (
		<div className={styles.app}>
			<Header user={user}/>
			<div className={styles.container}>
				<main><RecipeList/></main> 
			</div>
			<Footer/>
		</div>
	);
};


const MainS = ()=> {
	return (
		<div className={styles.app}>
			<Header/>
			<div className={styles.container}>
				<main className={styles.main}><Signup/></main> 
			</div>
			<Footer/>
		</div>
	);
};


Main.propTypes = {
	user: PropTypes.object
};


export default Main;
export {MainS};