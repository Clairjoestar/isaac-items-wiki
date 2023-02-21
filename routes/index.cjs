var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const items = require('../models/items')

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

module.exports = router;
