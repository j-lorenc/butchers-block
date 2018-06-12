import express from "express";

import React from "react";
import {renderToString} from "react-dom/server";

import App from "app/src/js/app";

import authRoutes from "./auth";

const authedRouter = (app, passport) =>{
	
	let router = express.Router();
	
	router = authRoutes(router, passport);
	
	
	router.get("/signup", (req, res) => {
		let messages =  req.flash();
		const main = renderToString(<App source="server" url="/signup" messages={messages}/>);
		res.render("index", {app:main});
	});
	
	router.get("*", 
		passport.authenticate("jwt", {
			session: false, 
			failureRedirect: "/signup", 
			failureFlash: true 
		}), (req, res) => {
			const user = {...req.user};
			const main = renderToString(<App source="server"/>);
			res.render("index", {app:main});
		}
	);
	
	
	return router;
};


export default authedRouter;




