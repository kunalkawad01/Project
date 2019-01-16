const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment')
const _ = require('lodash')
const request = require('request')
const cheerio = require('cheerio')


function getOptionChain(url) {

    return new Promise((resolve, reject) => {
        let k = []
        request(url, (err, res, html) => {

            if (!err && res.statusCode == 200) {

                const $ = cheerio.load(html)


                $('tr').each(function (i, e) {

                    if (i > 13) {
                        c = {
                            COpenInterest: $(this).children('td').first().next().text(),
                            CChangeInOI: $(this).children('td').first().next().next().text(),
                            CLTP: $(this).children('td').first().next().next().next().text(),
                            CNetChange: $(this).children('td').first().next().next().next().next().text(),
                            CVolume: $(this).children('td').first().next().next().next().next().next().text(),
                            CBidQty: $(this).children('td').first().next().next().next().next().next().next().text(),
                            CBidPrice: $(this).children('td').first().next().next().next().next().next().next().next().text(),
                            COfferPrice: $(this).children('td').first().next().next().next().next().next().next().next().next().text(),
                            COfferQty: $(this).children('td').first().next().next().next().next().next().next().next().next().next().text(),
                            StrikePrice: $(this).children('td.cht2').first().text(),
                            PBidQty: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().text(),
                            PBidPrice: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            POfferPrice: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            POfferQty: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            PVolume: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            PNetChange: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            PLTP: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            POpenInterest: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text(),
                            PChangeInOI: $(this).children('td').first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text()
                        }
                        k[i] = c

                    }
                })



                k = k.slice(14, k.length - 1)


                resolve(k)
                return




            }
            else {
                reject('err')
            }



        })
    })




}





router.get('/', (req, res) => {


    let symbol = req.query.symbol
    let date = req.query.date
    url = `https://www.nseindia.com/marketinfo/companyTracker/mtOptionKeys.jsp?companySymbol=${symbol}&indexSymbol=NIFTY&series=EQ&instrument=OPTSTK&date=${date}`



    getOptionChain(url).then(d => res.send(JSON.stringify(d)))



})








module.exports = router