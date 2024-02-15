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
            res.json({ result: true, trend: newDoc.trend })
        });
      })
})


router.delete("/:tweets", (req, res) => {
    Tweet.deleteOne({id})
    res.json({ result: true });
 })

 module.exports = router;