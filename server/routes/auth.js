import setupPassport from "../../config/passport.js";

const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	
	res.redirect("/signup");
};


const authedRouter = (router, passport) =>{
	
	setupPassport(passport);

	router.post("/api/signup", (req, res, next) => {
		passport.authenticate("local-signup", {
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
		const pathname = "/";
		res.status(301).redirect(pathname);
	});
	
	return router;
};

export default authedRouter;
export {isLoggedIn};
