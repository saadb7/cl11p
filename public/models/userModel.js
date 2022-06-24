const mongoose = require('mongoose'); 
const db_link = 'mongodb+srv://admin:23243535@cluster0.xbnsp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connected for user');
    })
    .catch(function (err) {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    name : {
        type : String 
    } ,
    username : {
        type : String , 
        unique : true
    } ,
    email : {
        type : String , 
        unique : true
    } , 
    password : {
        type : String
    } ,
    role : {
        type : String , 
        enum : ["admin" , "user"] ,
        default : "user"
    }
});
const userModel = mongoose.model('userModel' , userSchema);

module.exports = userModel;