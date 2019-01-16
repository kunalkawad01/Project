// let x = 8;
// let array = [5, 10, 15, 20, 25, 30, 35];
// let closest = array.sort((a, b) => Math.abs(x - a) - Math.abs(x - b))[0];

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment')
const EquityOption = require('../models/EquityOptions')
const _ = require('lodash')

const k = require('pyextjs')


async function getExpiryDates(startDate, endDate, symbols) {
    //from an async function return either a resolved value or a Promise
    expiryDates = await EquityOption.find(
        {
            $and: [
                // {
                //     TIMESTAMP:
                //     {
                //         $gte: startDate,
                //         $lte: endDate
                //     }
                // },
                { SYMBOL: { $in: symbols } }
            ]//and
        },
        //projection below
        { EXPIRY_DT: 1 }).lean().then(dates => dates.map(date => date.EXPIRY_DT))

    return expiryDates = expiryDates.filter(date => date >= startDate && date <= endDate)
}


async function getEntryDump(startDate, entryDates, exitDates, legs, legSymbols) {
    //from an async function return either a resolved value or a Promise.

    promises = entryDates.map(date => (date === startDate) ? EquityOption.find({ $and: [{ NEAR_CHECK: true }, { TIMESTAMP: date }, { SYMBOL: { $in: legSymbols } }] }).lean() : EquityOption.find({ $and: [{ FAR_CHECK: true }, { TIMESTAMP: date }, { SYMBOL: { $in: legSymbols } }] }).lean())

    entryPrices = Promise.all(promises).then((results) => {
        return entryPrices = [].concat.apply([], results)
    })

    return entryPrices

}

// async function getEntryLegs(entryPricesDump, legs) {
//     mlegsEntry = legs.map(leg => {

//         let dblegs = entryPricesDump.filter(result => (result.OPTION_TYP === leg.optiontype) && (result.STRIKE_RANK.toString() === leg.strikeprice) && (result.SYMBOL === leg.symbol))
//         return dblegs.map(dbleg => ({ ...dbleg, POSITION_TYP: leg.positiontype }))

//     })
//     //mlegsEntry contains the pne option per entry date per symbol

//     mlegsEntryFlat = [].concat.apply([], mlegsEntry)
//     EntryLegsFlat = [...mlegsEntryFlat]

//     return EntryLegsFlat

// }

async function getEntryLegs(entryPricesDump, legs, entryDates) {
    excludetracker = []
    mlegsEntry = legs.map(leg => {



        let dblegs = entryPricesDump.filter(result => (result.OPTION_TYP === leg.optiontype) && (result.STRIKE_RANK.toString() === leg.strikeprice) && (result.SYMBOL === leg.symbol))
        dblegs = dblegs.map(dbleg => ({ ...dbleg, POSITION_TYP: leg.positiontype }))

        if (dblegs.length != entryDates.length) {
            legdates = dblegs.map(leg => leg.TIMESTAMP)


            legdatesSet = new Set(legdates)
            entryDatesSet = new Set(entryDates)
            excludedDates = ([...entryDatesSet].filter(x => !legdatesSet.has(x)))

            exe = excludedDates.map(date => {

                kes = entryPricesDump.filter(result =>
                    (result.OPTION_TYP === leg.optiontype) &&
                    (result.TIMESTAMP === date) &&
                    (result.SYMBOL === leg.symbol))
                excludetracker.push({
                    SYMBOL: leg.symbol,
                    OPTION_TYP: leg.optiontype,
                    Nearest: _.uniq(kes.map(x => x.STRIKE_RANK)).sort((a, b) => Math.abs(leg.strikeprice - a) - Math.abs(leg.strikeprice - b))[0],
                    REQUESTED_RANK: leg.strikeprice,
                    Date: date
                }
                )
                return {
                    excludeddate: date,
                    STRIKE_RANK_ARRAY: _.uniq(kes.map(x => x.STRIKE_RANK)),
                    Nearest: _.uniq(kes.map(x => x.STRIKE_RANK)).sort((a, b) => Math.abs(leg.strikeprice - a) - Math.abs(leg.strikeprice - b))[0],
                    REQUESTED_RANK: leg.strikeprice
                }

            })//excludeDates Map
            console.log('exe', exe)

            newlegs = exe.map(exeleg => {
                g = entryPricesDump.filter(result =>
                    (result.OPTION_TYP === leg.optiontype) &&
                    (result.STRIKE_RANK.toString() === exeleg.Nearest.toString()) &&
                    (result.SYMBOL === leg.symbol) &&
                    (result.TIMESTAMP === exeleg.excludeddate))

                return g.map(x => ({ ...x, POSITION_TYP: leg.positiontype }))


            })

            newlegs = [].concat.apply([], newlegs)
            // console.log('dbnew', newlegs)


        }

        dblegs = [...dblegs, ...newlegs]
        dblegs = dblegs.sort((a, b) => new Date(a.TIMESTAMP) - new Date(b.TIMESTAMP))

        return dblegs


    })


    //mlegsEntry contains the pne option per entry date per symbol

    mlegsEntryFlat = [].concat.apply([], mlegsEntry)
    EntryLegsFlat = [...mlegsEntryFlat]
    console.log('exclude', excludetracker)
    return EntryLegsFlat

}


async function getExitDump(entryLegsFlat, exitDates) {
    promises = entryLegsFlat.map(leg => EquityOption.find({
        $and: [{ TIMESTAMP: leg.EXPIRY_DT }
            , { EXPIRY_DT: leg.EXPIRY_DT },
        { OPTION_TYP: leg.OPTION_TYP },
        { SYMBOL: leg.SYMBOL }
        ]
    }
    ).lean()//find
    )//map
    exitPricesDump = Promise.all(promises).then((results) => {
        exitPricesDump = [].concat.apply([], results)
        var arrayOfObjAfter = _.map(
            _.uniq(
                _.map(exitPricesDump, function (obj) {
                    return JSON.stringify(obj);
                })
            ), function (obj) {
                return JSON.parse(obj);
            }
        );

        return arrayOfObjAfter

    })



    return exitPricesDump

}

const getAltLot = (exitDump, entryLegsFlat) => {
    MentryLegsFlat = entryLegsFlat.map(leg => {

        return {
            ...leg,
            EXIT_LOT: exitDump.filter(exitleg => exitleg.SYMBOL === leg.SYMBOL &&
                exitleg.TIMESTAMP === leg.EXPIRY_DT &&
                exitleg.EXPIRY_DT === leg.EXPIRY_DT &&
                exitleg.OPTION_TYP === leg.OPTION_TYP
            )[0].LOT_SIZE,

            ALT_STRIKE_ARRAY: _.uniq(exitDump.filter(exitleg => exitleg.SYMBOL === leg.SYMBOL &&
                exitleg.TIMESTAMP === leg.EXPIRY_DT &&
                exitleg.EXPIRY_DT === leg.EXPIRY_DT &&
                exitleg.OPTION_TYP === leg.OPTION_TYP
            ).map(x => x.STRIKE_PR))

        }
    }
    )//map
    return MentryLegsFlat
}


const getAltStrike = (MentryLegsFlat) => {
    MentryLegsFlat = MentryLegsFlat.map(leg => {
        if (leg.LOT_SIZE === leg.EXIT_LOT) {
            factor = 1
        }
        else {
            factor = leg.LOT_SIZE / leg.EXIT_LOT
        }

        alternateStrike = leg.STRIKE_PR * factor
        let x = alternateStrike;
        let array = leg.ALT_STRIKE_ARRAY;
        let originalfind = leg.ALT_STRIKE_ARRAY.find((element) => element === leg.STRIKE_PR)
        let closestStrike = array.sort((a, b) => Math.abs(x - a) - Math.abs(x - b))[0];

        return {
            ...leg,
            ALT_STRIKE: (originalfind ? leg.STRIKE_PR : closestStrike)
        }
    })
    return MentryLegsFlat
}


const getExitLegs = (MentryLegsFlat, exitDump) => {
    ExitLegs = MentryLegsFlat.map(entryleg => {
        return exitDump.filter(exitleg => exitleg.SYMBOL === entryleg.SYMBOL &&
            exitleg.TIMESTAMP === entryleg.EXPIRY_DT &&
            exitleg.EXPIRY_DT === entryleg.EXPIRY_DT &&
            exitleg.OPTION_TYP === entryleg.OPTION_TYP &&
            exitleg.STRIKE_PR === entryleg.ALT_STRIKE
        )//filter
    }//map inner function
    )//map

    return ExitLegsFlat = [].concat.apply([], ExitLegs)

}

const getNetLegsFlat = (MentryLegsFlat, ExitLegsFlat) => {

    // console.log('Entry', MentryLegsFlat)
    // console.log('Exit', ExitLegsFlat)

    NetLegsFlat = MentryLegsFlat.map((entryLeg, i) => ({ ...entryLeg, EXIT_PRICES: ExitLegsFlat[i].CLOSE_PRIC, EXIT_UNDERLYING: ExitLegsFlat[i].UNDRLNG_ST }))
    NetLegsFlat = NetLegsFlat.map(leg => ({ ...leg, PROFIT: (((leg.EXIT_PRICES * leg.EXIT_LOT) - (leg.CLOSE_PRIC * leg.LOT_SIZE)) * leg.POSITION_TYP) }))

    return NetLegsFlat
}






router.get('/', async (req, res) => {

    const legs = req.query.legs.map(leg => JSON.parse(leg))
    const startDate = moment(legs[0].startDate).format('YYYY-MM-DD')
    const endDate = moment(legs[0].endDate).format('YYYY-MM-DD')

    const legSymbols = _.uniq(legs.map(leg => leg.symbol))
    // console.log(legSymbols)


    //Get the Expiry Dates
    P1 = getExpiryDates(startDate, endDate, legSymbols)
    expiryDates = await P1
    exitDates = _.uniq(expiryDates)


    //  Get Entry Dates
    entryDates = [startDate, ...exitDates.slice(0, exitDates.length - 1)]
    // console.log(entryDates)



    //Get Entry Prices Dump
    P2 = getEntryDump(startDate, entryDates, exitDates, legs, legSymbols)
    entryPricesDump = await P2


    //Get Entry Legs
    P3 = getEntryLegs(entryPricesDump, legs, entryDates)
    entryLegsFlat = await P3

    //Add Get exIT Lot size for each of the leg
    P4 = getExitDump(entryLegsFlat, exitDates)
    exitDump = await P4

    //oNE lEG PER SYMBOL PER ENTRY DATE WITH EXIT LOT
    MentryLegsFlat = getAltLot(exitDump, entryLegsFlat)

    //Get Alternate Strike
    MentryLegsFlat = getAltStrike(MentryLegsFlat)

    //Get Exit Legs
    ExitLegsFlat = getExitLegs(MentryLegsFlat, exitDump)

    //Get Net Legs

    NetLegsFlat = getNetLegsFlat(MentryLegsFlat, ExitLegsFlat)


    res.send(JSON.stringify(NetLegsFlat))



})//router


module.exports = router