const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
// require('dotenv').config();
const port = process.env.PORT || 5000;
//init
const app = express();
app.use(expressLayout);
app.use(express.json());
app.listen(port);
app.use(cookieParser());

//static files
app.use('public' , express.static('public'));
app.use('/css' , express.static('public/css'));
app.use('/img' , express.static('public/views/img'));
app.use('/user/css' , express.static('public/css'));
app.use('/user/img' , express.static('public/views/img'));
app.use('/codemode/codemirror/lib' , express.static('public/codemirror/lib'))
app.use('/codemode/codemirror/mode/clike' , express.static('public/codemirror/mode/clike'));
app.use('/codemode/codemirror/theme' , express.static('public/codemirror/theme'));
app.use('/codemode/css' , express.static('public/css'));
app.use('/codemode/img' , express.static('public/views/img'));

//setting the template engine
app.set('view engine' , 'ejs');
app.set('views' , 'public/views');

//routing
const pageRouter = require('./public/routers/pageRouter');
app.use('' , pageRouter);


