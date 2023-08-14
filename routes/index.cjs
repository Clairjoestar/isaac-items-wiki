var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const items = require('../models/items')
const users = require('../models/users')
const argon2 = require('argon2')
const session = require('express-session');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.session.loginUser)
    if (req.session.status!=true){
        req.session.status=false
    }
    let islog = req.session.status
    let user_name = req.session.loginUser
    let thing = items.find({}, function (error, result) {
        let item = []
        // let item_id =[]
        for (let i = 0; i < result.length; i++) {
            item.push({
                title: result[i].title,
                id: result[i].item_id,
            });
        }
        res.render('index', {
            title: 'isaac_item', thing: item, isLogined: islog,
            name: user_name
        });
    })

});

router.get('/wiki/:items', function (req, res, next) {
    let islog = req.session.status
    let user_name = req.session.loginUser
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
            isLogined: islog,
            name: user_name
        });
    })
});
router.get('/search', function (req, res, next) {
    // console.log(req.query.searchResult)
    let islog = req.session.status
    let user_name = req.session.loginUser
    const search_id = req.query.searchResult
    let results = items.find({$text: {$search: search_id}})
        .exec(function (error, result) {
            // console.log(result)
            let item_2 = []
            for (let i = 0; i < result.length; i++) {
                item_2.push({
                    title: result[i].title,
                    id: result[i].item_id,
                    english_title: result[i].english_title,
                    pickup_message: result[i].pickup_message,
                    description: result[i].description,
                    extra: result[i].extra
                });
            }
            res.render('search', {
                search_res: item_2, isLogined: islog,
                name: user_name
            })
        })
})

router.get('/user-need', function (req, res, next) {
    let islog = req.session.status
    let user_name = req.session.loginUser
    res.render('user-need', {
        title: 'isaac_item', isLogined: islog,
        name: user_name
    });
});

router.post('/signup', function (req, res, next) {
    // console.log(req.body)
    (async () => {
        let user_inf = await users.find()
        let issame = true
        for (let i = 0; i < user_inf.length; i++) {
            if (req.body.name === user_inf[i].user_name) {
                issame = false;
                res.render('sign-succ', {result: "注册失败，用户名重复"});
            }
        }
        if (issame === true) {
            const hash_password = await argon2.hash(req.body.password);
            let sign_inf = {
                user_name: req.body.name,
                password: hash_password,
                mail: req.body.email
            }
            let Newuser = new users(sign_inf)
            await Newuser.save();
            res.render('sign-succ', {result: "注册成功"});
        }
    })()
});

router.post('/signin', function (req, res, next) {
    (async () => {
        let sess = req.session;
        let user = await users.find()
        let userissame = false
        let i = 0;
        for (i = 0; i < user.length; i++) {
            if (req.body.name === user[i].user_name) {
                userissame = true;
            }
        }
        let pwdissame = false
        let pwd = await argon2.verify(user[i-1].password, req.body.password)
        if (pwd) {
            pwdissame = true
        }
        console.log(userissame)
        console.log(pwdissame)
        if (userissame && pwdissame) {
                req.session.loginUser = user[i-1].user_name;
                req.session.status = true;
                console.log('log-succ')

        } else {

        }
        res.redirect('/');
    })()
});

router.get('/signout', function (req, res, next) {
    req.session.destroy(function (err) {

        // req.session.loginUser = null;
        res.clearCookie('loginUser');
        res.clearCookie('status')
        res.redirect('/');
    })
})

module.exports = router;
