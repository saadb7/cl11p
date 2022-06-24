const mongoose = require('mongoose'); 
const db_link = 'mongodb+srv://admin:23243535@cluster0.xbnsp.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connected for reviews');
    })
    .catch(function (err) {
        console.log(err);
    });

const reviewSchema = new mongoose.Schema({
    name : {
        type: String ,
    } , 
    email : {
        type : String , 
    } , 
    phone : {
        type :  Number, 
        default : 100
    } , 
    message : {
        type : String
    }
});


const reviewModel = mongoose.model('reviewModel' , reviewSchema);

module.exports = reviewModel;