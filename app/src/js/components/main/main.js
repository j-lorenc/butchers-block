import React from "react";
//import styles from "/app/src/scss/index.scss";

import Header from "../header/header";
import Footer from "../footer/footer";
import Signup from "../signup";


import styles from "./main.scss";
import "../../../scss/index.scss";

  
const Main = ()=> {
	return (
		<div className={styles.app}>
			<Header/>
			<div className={styles.container}>
				<main></main> 
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

export default Main;
export {MainS};