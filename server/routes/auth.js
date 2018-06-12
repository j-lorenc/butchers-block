import setupPassport from "../../config/passport.js";
const jwt = require("jsonwebtoken");

const authedRouter = (router, passport) =>{
	
	setupPassport(passport);

	router.post("/api/signup", (req, res, next) => {
		passport.authenticate("jwt-signup", {
			successRedirect: "/api/auth-succeeded",
			failureRedirect: "/api/auth-failed",
			failureFlash: true
		})(req, res, next); 
	});

	router.post("/api/login", (req, res, next) => {
		passport.authenticate("local-login", {
			successRedirect: "/api/auth-succeeded",
			failureRedirect: "/api/auth-failed",
			failureFlash: true
		})(req, res, next); 
	});
	
	router.get("/logout", (req, res)=> {
		req.logout();
		res.redirect("/");
	});

	router.get("/api/auth-failed", (req, res) => {
		let messages =  req.flash();
		res.status(401).json(messages);
	});
 
	router.get("/api/auth-succeeded", (req, res) => {
		const token = jwt.sign(req.user, "secret");
		const options = {
			maxAge: 1000 * 60 * 60 * 12, //12 hours
			httpOnly: true
		};
		res.cookie("token",token, options);
		res.status(200).json();
	}); 
	
	return router;
};

export default authedRouter;
