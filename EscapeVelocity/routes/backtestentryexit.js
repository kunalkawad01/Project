const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment')
const Option = require('../models/Options')
const _ = require('lodash')




router.get('/', (req, res) => {

    const legs = req.query.legs.map(leg => JSON.parse(leg))
    const startDate = moment(legs[0].startDate).format('YYYY-MM-DD')
    const endDate = moment(legs[0].endDate).format('YYYY-MM-DD')


    //get expiry dates
    let expiryDates = []
    let entryDates = []
    let exitPrices = []
    let promises = []
    let OriginalLegs = [...legs]


    Option.find({}).then(data => {


        let expiryDates1 = _.uniq(data.map(option => option.EXPIRY_DT))
        return expiryDates = expiryDates1.filter(date => (date > startDate) && (date < endDate))


    }).then(dates => {


        entryDates = [startDate, ...dates.slice(0, expiryDates.length - 1)]
        return entryDates



    }).then(entryDates => {




        return promises = entryDates.map(date => (date == startDate) ? Option.find({ $and: [{ NEAR_CHECK: true }, { TIMESTAMP: date }] }) : Option.find({ $and: [{ FAR_CHECK: true }, { TIMESTAMP: date }] }))


    }).then(promises => {


        Promise.all(promises).then((results) => {
            entryPrices = [].concat.apply([], results)

            mlegsEntry = legs.map(leg => {

                let dblegs = entryPrices.filter(result => (result.OPTION_TYP === leg.optiontype) && (result.STRIKE_RANK.toString() === leg.strikeprice))
                return dblegs.map(dbleg => ({ ...dbleg.toObject(), POSITION_TYP: leg.positiontype }))

            })



            mlegsEntryFlat = [].concat.apply([], mlegsEntry)
            EntryLegsFlat = [...mlegsEntryFlat]
            // res.send({ mlegsEntryFlat })
            promises2 = mlegsEntryFlat.map(entry => Option.find({ $and: [{ TIMESTAMP: entry.EXPIRY_DT }, { EXPIRY_DT: entry.EXPIRY_DT }, { STRIKE_PR: entry.STRIKE_PR }, { OPTION_TYP: entry.OPTION_TYP }] }))

            Promise.all(promises2).then(ExitLegs => {

                ExitLegsFlat = [].concat.apply([], ExitLegs)

                let NetLegsFlat = EntryLegsFlat.map((entryLeg, i) => ({ ...entryLeg, EXIT_PRICES: ExitLegsFlat[i].CLOSE }))

                NetLegsFlat = NetLegsFlat.map(leg => ({ ...leg, PROFIT: ((leg.EXIT_PRICES - leg.CLOSE) * leg.POSITION_TYP) }))

                res.send(JSON.stringify(NetLegsFlat))



            }



            )


        })


    })

})


module.exports = router