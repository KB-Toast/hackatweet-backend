var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users')

router.get('/', (req, res) => {
    Tweet.find().then(data => {
    res.json({ result: true, Tweet: data })
});
})


router.post('/addtweet/:token', (req, res) => {
    console.log("Admin addtweet") 
    //    Utiliser un regExp pour extraire les trends 
    let regExp = /\#\w*/g ;
    // console.log(req.body.text)
    const trendOftweet = Array.from(req.body.text.matchAll(regExp));
    // utiliser un findOne avec token pour le rattacher au tweet
    User.findOne({ token: req.params.token }).then(data => {
        // console.log(data.token) 
        const newTweet = new Tweet ({
            date: Date.now(),
            text: req.body.text,
            trend: trendOftweet,
            numberLikes: [],
            author: data.id,
          });
          newTweet.save().then(newDoc => {
            res.json({ result: true, newTweet: newDoc })
        });
      })
})


router.delete("/delete/:id", (req, res) => {
    Tweet.deleteOne({_id: req.params.id}).then(data => {
        res.json({ result: true })
    })
 })

 router.put('/addLikes/:id/:token', (req, res) => {
    const token = req.params.token
    // faire une condition si token déjà présent dans numberLikes
    // si non => push
    // si oui => delete
       if(!Tweet.findOne({ _id: req.params.id, numberLikes: token })
        .then(() => {
        res.json({result: true});
        })) {
            Tweet.updateOne({ _id: req.params.id }, { $push: {numberLikes: token}})
            .then(() => {
                res.json({result: true});
                console.log(`Tweet ${req.params.id} updated`);
            }) 
        } else {
            Tweet.updateOne({ _id: req.params.id }, { $pull: {numberLikes: token}})
            .then(() => {
                res.json({result: true});
                console.log('like delete');
        })}
    })

 module.exports = router;