const express = require('express');
const pageRouter = express.Router();

const {getHome , goToLink , fetchPage , updatePage , delPage , addReview} = require('../controller/pageController');

const {createUser , loginUser , logoutUser , checkAdmin , getReviews ,showAllPages , checkLogin} = require ('../controller/userController');

pageRouter.route('/contact').get(function (req , res){
    let currUser = req.cookies.username;
    if (!currUser) currUser = '';
    return res.render('contact.ejs' , {
        name : 'Contact Us' , 
        username : currUser
    })
})
.post(addReview);

pageRouter.route('/about').get(function (req , res){
    let currUser = req.cookies.username;
    if (!currUser) currUser = '';
    return res.render('about.ejs' , {
        name : 'Tutorial' , 
        username : currUser
    });
});

pageRouter.route('/signup')
.get(function (req , res){
    return res.render('signup.ejs' , {
        name : 'Sign Up' , 
        username : ''
    });
})
.post(createUser);

pageRouter.route('/login')
.get(function (req , res){
    return res.render('login.ejs' , {
        name : 'Login' , 
        username : ''
    });
})
.post(loginUser);

pageRouter.route('/logout')
.get(logoutUser);

pageRouter.route('/')
.get(getHome);

pageRouter.route('/reviews')
.get(checkAdmin , getReviews);
pageRouter.route('/:id')
.get(fetchPage)
.patch(updatePage)
.delete(delPage);

pageRouter.route('/user/:user')
.get(checkLogin,showAllPages);

pageRouter.route('/codemode/:id')
.get(fetchPage)
.patch(updatePage)
.delete(delPage);
module.exports = pageRouter;

