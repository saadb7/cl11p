const userModel = require('../models/userModel');
const reviewModel = require('../models/reviewModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'mykey123';
const bcrypt = require('bcrypt');
const pageModel = require('../models/pageModel');


module.exports.createUser = async function createUser (req , res){
    try{

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password , salt);
        let createdUser = await userModel.create({
            name : req.body.name , 
            username : req.body.username , 
            email : req.body.email , 
            password : hashed
        });
        // console.log(createdUser);
        return res.send('User Created , Kindly Login');
    }
    catch(err){
        return res.send(err.message);
    }
};

module.exports.loginUser = async function loginUser(req , res){

    try{
        let currUser = await userModel.findOne({
            username : req.body.username
        });

        if (currUser){ 
            // console.log(currUser);
            let match = await bcrypt.compare(req.body.password , currUser.password)
            if (match) {    
                let uid = currUser['id'];
                let token  = jwt.sign({payload:uid} , JWT_KEY);
                res.cookie('login' , token, {httpOnly:true});
                res.cookie('username' , req.body.username , {httpOnly : true});
                return res.send('loggedin');
            }
            else {
                return res.send("Incorrect Password");
            }
        }  
        else {
            return res.send('User Not Found');
        }
    }
    catch(err){
        return res.send(err.message);
    }
};

module.exports.logoutUser = async function logoutUser(req , res){
    res.cookie('username' , '' , {maxAge:1});
    res.cookie('login' , '' , {maxAge:1});
    return res.redirect('/');
};


module.exports.checkAdmin = async function checkAdmin(req , res , next){
    if (req.cookies.login){
        let currPayload = jwt.verify(req.cookies.login , JWT_KEY).payload;
        let currUser = await userModel.findById(currPayload);
        if (currUser.role == 'admin')
            next();
        else {
            return res.render ('error.ejs' , {
                name : "Error" , 
                err : 'Error 403' , 
                username : req.cookies.username , 
                msg : "Access Denied"
            });
        }
    }
    else {
        return res.render('error.ejs' , {
            name : 'Error' , 
            err : 'Error 401' , 
            username : '' , 
            msg : "Login to see content"
        })
    }
};
module.exports.getReviews = async function getReviews(req , res){
    let reviews = await reviewModel.find();
    // console.log(reviews);
    return res.render('reviews.ejs' , {
        name : 'Reviews' , 
        username : req.cookies.username , 
        content : reviews
    });
};


module.exports.checkLogin = async function checkLogin(req , res , next){
    if (req.cookies.login){
        let currPayload = jwt.verify(req.cookies.login , JWT_KEY).payload;
        let currUser = await userModel.findById(currPayload);
        if (req.cookies.username == req.params.user)
            next();
        else {
            return res.render ('error.ejs' , {
                name : "Error" , 
                err : 'Error 403' , 
                username : req.cookies.username , 
                msg : "Access Denied"
            });
        }
    }
    else {
        return res.render('error.ejs' , {
            name : 'Error' , 
            err : 'Error 401' , 
            username : '' , 
            msg : "Login to see content"
        })
    }
};
module.exports.showAllPages = async function showAllPages(req , res){
    try{
        let allPages = await pageModel.find({username : req.cookies.username});
        if (allPages.length == 0){
            let currUser = req.cookies.username;
            return res.render('error.ejs' , {
                name : 'Error' , 
                err : 'No Links Found' , 
                username : currUser , 
                msg : "Currently no links are associated to your account"
            })
        }
        let allLinks = [];
        for (let i = 0 ; i < allPages.length ; ++i){
            allLinks[i] = allPages[i].pageId;
        }
        return res.render('userLinks.ejs' , {
            name : req.cookies.username , 
            content : allLinks , 
            username : req.cookies.username
        });
    }
    catch(err){
        return res.send(err.message);
    }
};