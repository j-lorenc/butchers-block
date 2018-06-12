import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import flash from "connect-flash";

import indexRouter from "./routes/index";

import tunnel from "tunnel-ssh";
import sshd from "../config/sshd";
import sessionConf from "../config/session";

import passport from "passport";

const app = express();

tunnel(sshd, () =>{
	
	app.set("views", path.join(__dirname, "/views"));
	app.set("view engine", "hbs");

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	
	app.use(session(sessionConf));
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.use("/static", express.static(path.join(__dirname, "/../app/static")));
	app.use("/js", express.static(path.join(__dirname, "/../app/static/js")));
	app.use("/assets", express.static(path.join(__dirname, "/../app/assets")));

	app.use("/", indexRouter(app, passport));

	app.use((req, res, next) => {
		next(createError(404));
	});

	app.use((err, req, res) => {
		res.locals.message = err.message;
		res.locals.error = req.app.get("env") === "development" ? err : {};

		res.status(err.status || 500);
		res.render("error");
	});
	
});


module.exports = app;
