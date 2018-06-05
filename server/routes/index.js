import express from "express";

import React from "react";
import {renderToString} from "react-dom/server";

import App from "app/src/js/app";

import authRoutes, {isLoggedIn} from "./auth";

const authedRouter = (app, passport) =>{
	
	let router = express.Router();
	
	router = authRoutes(router, passport);
	
	
	router.get("/signup", (req, res) => {
		const main = renderToString(<App source="server" url="/signup"/>);
		res.render("index", {app:main});
	});
	
	router.get("*", isLoggedIn,  (req, res) => {
		const main = renderToString(<App source="server"/>);
		res.render("index", {app:main});
	});
	
	return router;
};


export default authedRouter;




