var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const items = require('../models/items')
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/* GET home page. */
router.get('/', function (req, res, next) {
    let thing = items.find({}, function (error, result) {
        let item=[]
        // let item_id =[]
        for (let i=0;i<result.length;i++) {
            item.push({
                title:result[i].title,
                id:result[i].item_id,
            });
        }
        res.render('index', {title: 'isaac_item',thing:item});
    })

});

router.get('/wiki/:items', function (req, res, next) {
    let thing = items.find({item_id: req.params.items}, function (error, result) {
        // console.log(result[0].english_title)
        res.render('layout', {
            title: result[0].title,
            english_title: result[0].english_title,
            item_id: result[0].item_id,
            pickup_message: result[0].pickup_message,
            description: result[0].description,
            item_type: result[0].item_type,
            extra: result[0].extra,
        });
    })
});
router.get('/search',function (req, res,next){
    // console.log(req.query.searchResult)
    const search_id=new RegExp(req.body.name, 'i');
    let result =items.find({search_id}).then((data)=>{
        res.render('search',{

        })
    }).catch((e) => {
        console.log(e)
        res.render('search',{

        })
        })
})
module.exports = router;
