var express = require('express');
var router = express.Router();

const {renderToString} = require('react-dom/server');
const Application = require('../views/components/built/app.js');
const SignUp = require('../views/components/built/signup.js');


const tunnel = require('tunnel-ssh');
const sshd = require("../../config/sshd.js");
const mysqld = require("../../config/mysqld.js");

const mysql = require('mysql');

module.exports = (app, passport) => {
    

    const passportConf = require("../../config/passport.js")(passport);
    

    /* GET home page. */
    router.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', {
              successRedirect: '/api/auth-succeeded',
              failureRedirect: '/api/auth-failed',
              failureFlash: true
          })(req, res); 
    });

    router.get('/api/auth-failed', function(req, res, next) {
        let messages =  req.flash();
        res.status(401).json(messages);
    });
    
    router.get('/api/auth-succeeded', function(req, res, next) {
        res.status(303).json({redirectPath:'/'});
    });


    router.get('/signup', function(req, res, next) {
        let messages =  req.flash();
        res.render('signup', {app: renderToString(SignUp(messages))});        
    });
    
    router.get('/logout', function(req, res, next) {
        req.logout();
        res.redirect('/');
    });

    router.post('/api/login', function(req, res, next) {
          passport.authenticate('local-login', {
              successRedirect: '/api/auth-succeeded',
              failureRedirect: '/api/auth-failed',
              failureFlash: true
          })(req, res); 
    });

    router.get('*', isLoggedIn, function(req, res, next) {
        let app = renderToString(Application(req.url));
        res.render('index', {app});
    });
    
    return router;
}


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signup");
}





