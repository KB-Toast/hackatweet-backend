var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweets = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');



module.exports = router;
