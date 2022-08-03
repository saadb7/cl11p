const mongoose = require('mongoose'); 
const db_link = 'mongodb+srv://admin:23243535@cluster0.xbnsp.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connected for pages');
    })
    .catch(function (err) {
        console.log(err);
    });

const pageSchema = new mongoose.Schema({
    pageId: {
        type : String , 
        required : true
    },
    pageContent : {
        type : String
    },
    password : {
        type : String ,
        default : ''
    },
    username: {
        type: String, 
        default: ''
    } 
});


const pageModel = mongoose.model('pageModel' , pageSchema);

module.exports = pageModel;