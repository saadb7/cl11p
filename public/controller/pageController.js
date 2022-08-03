const pageModel = require('../models/pageModel');
const reviewModel = require('../models/reviewModel');
module.exports.getHome = function getHome(req, res) {
    let currUser = req.cookies.username;
    if (!currUser) currUser = '';
    res.render('index.ejs', {
        name: "CL!!P" ,
        username : currUser
    });
}

module.exports.fetchPage = async function fetchPage(req, res) {
    try {
        let currUser = req.cookies.username;
        if (!currUser) currUser = '';
        let link = req.params.id;
        req.link = link;
        // console.log(link);
        let page = await pageModel.findOne({
            pageId: link
        });
        let content = '';
        if (page)
            content = page.pageContent;
        // console.log(content);
        req.content = content;
        return res.render('any.ejs', {
            name: `${link}`,
            main: content ,
            username : currUser
        });
    }
    catch (err) {
        return res.send(err.message);
    }

}

module.exports.updatePage = async function updatePage(req, res) {
    try {

        let link = req.body.currLink.substr(1);
        let page = await pageModel.findOne({ pageId: link });
        if (page) {
            if (req.body.pass == page.password) {
                let updated = await pageModel.findByIdAndUpdate(page.id, { pageContent: req.body.content , 
                userName : req.cookies.username});
                // console.log('updated ', updated);
                // console.log(req.cookies.username);
                
            }
            else {
                // console.log(page.password);
                return res.send('Err');
            }
        }
        else {
            let created = await pageModel.create({
                pageId: link,
                pageContent: req.body.content,
                password: req.body.pass,
                username : req.cookies.username
            });

        }
        return res.send('handled');
    }
    catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }
}


module.exports.delPage = async function delPage(req, res) {
    try {
        let link = req.body.currLink.substr(1);
        let page = await pageModel.findOne({ pageId: link });
        if (page) {
            if (req.body.pass == page.password) {
                // console.log('here');
                let deleted = await pageModel.findByIdAndDelete(page.id);
                // console.log(deleted);
            }
            else {
                return res.send('Err');
            }
        }
        return res.send('Handled');
    }
    catch (err) {
        console.log(err.message);
        return res.end(err.message);
    }

}

module.exports.addReview = async function addReview(req , res){
    try{

        // console.log('here');
        // console.log(req.body);
        let review = await reviewModel.create({
            name : req.body.name,
            email :  req.body.email, 
            phone : req.body.phone,
            message : req.body.message 
        });

        if (review){
            return res.send('Rec');
        }
        else return res.send('Err');
    }
    catch(err){
        return res.send(err.message);
    }
        

};

