const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment')
const EquityOption = require('../models/EquityOptions')
const _ = require('lodash')




router.get('/', (req, res) => {

    const legs = req.query.legs.map(leg => JSON.parse(leg))
    const startDate = moment(legs[0].startDate).format('YYYY-MM-DD')
    const endDate = moment(legs[0].endDate).format('YYYY-MM-DD')

    const legSymbols = _.uniq(legs.map(leg => leg.symbol))
    console.log(legSymbols)

    //get expiry dates
    let expiryDates = []
    let entryDates = []
    let exitPrices = []
    let promises = []
    let OriginalLegs = [...legs]





    EquityOption.find({ SYMBOL: { $in: legSymbols } }).then(data => {


        let expiryDates1 = _.uniq(data.map(option => option.EXPIRY_DT))
        return expiryDates = expiryDates1.filter(date => (date > startDate) && (date < endDate))


    }).then(dates => {

        console.log('EXPIRY DATES', dates)
        entryDates = [startDate, ...dates.slice(0, expiryDates.length - 1)]
        return entryDates



    }).then(entryDates => {

        console.log('entryDates', entryDates)

        //add symbol in symbomls condn
        return promises = entryDates.map(date => (date == startDate) ? EquityOption.find({ $and: [{ NEAR_CHECK: true }, { TIMESTAMP: date }, { SYMBOL: { $in: legSymbols } }] }) : EquityOption.find({ $and: [{ FAR_CHECK: true }, { TIMESTAMP: date }, { SYMBOL: { $in: legSymbols } }] }))


    }).then(promises => {


        Promise.all(promises).then((results) => {
            entryPrices = [].concat.apply([], results)

            //entry prices contain all options for that date for given symbol

            mlegsEntry = legs.map(leg => {

                let dblegs = entryPrices.filter(result => (result.OPTION_TYP === leg.optiontype) && (result.STRIKE_RANK.toString() === leg.strikeprice) && (result.SYMBOL === leg.symbol))
                return dblegs.map(dbleg => ({ ...dbleg.toObject(), POSITION_TYP: leg.positiontype }))

            })

            //mlegsEntry contains the pne option per entry date per symbol

            mlegsEntryFlat = [].concat.apply([], mlegsEntry)
            EntryLegsFlat = [...mlegsEntryFlat]
            console.log(EntryLegsFlat)





            // below line finds the expiry condition of each of the above leg
            promises2 = mlegsEntryFlat.map(entry => EquityOption.find({ $and: [{ TIMESTAMP: entry.EXPIRY_DT }, { SYMBOL: entry.SYMBOL }, { EXPIRY_DT: entry.EXPIRY_DT }, { STRIKE_PR: entry.STRIKE_PR * entry.LOT_SIZE / LOT_SIZE }, { OPTION_TYP: entry.OPTION_TYP }] }))

            Promise.all(promises2).then(ExitLegs => {

                ExitLegsFlat = [].concat.apply([], ExitLegs)

                let NetLegsFlat = EntryLegsFlat.map((entryLeg, i) => ({ ...entryLeg, EXIT_PRICES: ExitLegsFlat[i].CLOSE_PRIC, EXIT_UNDERLYING: ExitLegsFlat[i].UNDRLNG_ST, EXIT_LOT_SIZE: ExitLegsFlat[i].LOT_SIZE }))

                NetLegsFlat = NetLegsFlat.map(leg => ({ ...leg, PROFIT: (((leg.EXIT_PRICES * leg.EXIT_LOT_SIZE) - (leg.CLOSE_PRIC * leg.LOT_SIZE)) * leg.POSITION_TYP) }))

                res.send(JSON.stringify(NetLegsFlat))




            }



            )


        })


    })

})


module.exports = router