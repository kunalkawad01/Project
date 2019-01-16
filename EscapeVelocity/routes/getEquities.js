
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment')
const Equity = require('../models/Equity')
const _ = require('lodash')

const k = require('pyextjs')

router.get('/', (req, res) => {

    let symbol = req.query.symbol
    console.log(symbol)


    Equity.find({ SYMBOL: { $in: symbol } }).then(data => res.send(JSON.stringify(data)))
    // res.send('hello')

})//router

module.exports = router