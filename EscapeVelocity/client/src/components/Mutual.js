import React, { Component } from 'react'
import axios from 'axios'
import Line from './Line'

import Line2 from './Line2'
import Barchart from './Barchart'
import DatePicker from './DatePicker';
import MFLine from './MFLine';
class Mutual extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mutuals: [],
            symbol: ['Axis Multicap Fund - Direct Plan - Dividend',
                'Axis Multicap Fund - Direct Plan - Growth',
                'Axis Multicap Fund - Regular Plan - Dividend',
                'Axis Multicap Fund - Regular Plan - Growth',
                'Axis Bluechip Fund - Direct Plan - Dividend',
                'Axis Bluechip Fund - Direct Plan - Growth',
                'Axis Bluechip Fund - Dividend', 'Axis Bluechip Fund - Growth',
                'Axis Growth Opportunities Fund - Direct Plan - Dividend',
                'Axis Growth Opportunities Fund - Direct Plan - Growth',
                'Axis Growth Opportunities Fund - Regular Plan - Dividend',
                'Axis Growth Opportunities Fund - Regular Plan - Growth',
                'Axis Midcap Fund - Direct Plan - Dividend',
                'Axis Midcap Fund - Direct Plan - Growth',
                'Axis Midcap Fund - Dividend', 'Axis Midcap Fund - Growth',
                'Axis Small Cap Fund - Direct Plan - Dividend',
                'Axis Small Cap Fund - Direct Plan - Growth',
                'Axis Small Cap Fund - Regular Plan - Dividend',
                'Axis Small Cap Fund - Regular Plan - Growth',
                'Axis Focused 25 Fund - Direct Plan - Dividend Option',
                'Axis Focused 25 Fund - Direct Plan - Growth Option',
                'Axis Focused 25 Fund - Dividend Option',
                'Axis Focused 25 Fund - Growth Option',
                'Axis Long Term Equity Fund - Direct Plan - Dividend option',
                'Axis Long Term Equity Fund - Direct Plan - Growth Option',
                'Axis Long Term Equity Fund - Dividend',
                'Axis Long Term Equity Fund - Growth',
                'Axis Liquid Fund - Daily Dividend Option',
                'Axis Liquid Fund - Direct plan - Bonus Option',
                'Axis Liquid Fund - Direct Plan - Daily Dividend Option',
                'Axis Liquid Fund - Direct Plan - Growth Option',
                'Axis Liquid Fund - Direct Plan - Monthly Dividend Option',
                'Axis Liquid Fund - Direct Plan - Weekly Dividend Option',
                'Axis Liquid Fund - Growth Option',
                'Axis Liquid Fund - Monthly Dividend Option',
                'Axis Liquid Fund - Retail Plan - Daily Dividend Option',
                'Axis Liquid Fund - Retail Plan - Growth Option',
                'Axis Liquid Fund - Retail Plan - Monthly Dividend Option',
                'Axis Liquid Fund - Retail Plan - Weekly Dividend Option',
                'Axis Liquid Fund - Weekly Dividend Option',
                'Axis Ultra Short Term Fund - Direct Plan Daily Dividend Reinvestment',
                'Axis Ultra Short Term Fund - Direct Plan Growth',
                'Axis Ultra Short Term Fund - Direct Plan Monthly Dividend',
                'Axis Ultra Short Term Fund - Direct Plan Regular Dividend',
                'Axis Ultra Short Term Fund - Direct Plan Weekly Dividend',
                'Axis Ultra Short Term Fund - Regular Plan Daily Dividend Reinvestment',
                'Axis Ultra Short Term Fund - Regular Plan Growth',
                'Axis Ultra Short Term Fund - Regular Plan Monthly Dividend',
                'Axis Ultra Short Term Fund - Regular Plan Regular Dividend',
                'Axis Ultra Short Term Fund - Regular Plan Weekly Dividend',
                'Axis Treasury Advantage Fund - Daily Dividend Option',
                'Axis Treasury Advantage Fund - Direct Plan - Bonus Option',
                'Axis Treasury Advantage Fund - Direct Plan - Daily Dividend Option',
                'Axis Treasury Advantage Fund - Direct Plan - Growth Option',
                'Axis Treasury Advantage Fund - Direct Plan - Monthly Dividend Option',
                'Axis Treasury Advantage Fund - Direct Plan - Weekly Dividend Option',
                'Axis Treasury Advantage Fund - Growth Option',
                'Axis Treasury Advantage Fund - Institutional Plan - Weekly Dividend Option',
                'Axis Treasury Advantage Fund - Monthly Dividend Option',
                'Axis Treasury Advantage Fund - Retail Plan - Daily Dividend Option',
                'Axis Treasury Advantage Fund - Retail Plan - Growth Option',
                'Axis Treasury Advantage Fund - Retail Plan - Monthly Dividend Option',
                'Axis Treasury Advantage Fund - Retail Plan - Weekly Dividend Option',
                'Axis Short Term Fund - Bonus Option',
                'Axis Short Term Fund - Direct Plan - Growth Option',
                'Axis Short Term Fund - Direct Plan - Monthly Dividend Option',
                'Axis Short Term Fund - Direct Plan - Regular Dividend Option',
                'Axis Short Term Fund - Direct Plan - Weekly Dividend Option',
                'Axis Short Term Fund - Growth Option',
                'Axis Short Term Fund - Monthly Dividend Option',
                'Axis Short Term Fund - Regular Dividend Option',
                'Axis Short Term Fund - Retail Plan - Growth Option',
                'Axis Short Term Fund - Retail Plan - Monthly Dividend Option',
                'Axis Short Term Fund - Retail Plan - Weekly Dividend Option',
                'Axis Short Term Fund - Weekly Dividend Option',
                'Axis Strategic Bond Fund - Bonus Option',
                'Axis Strategic Bond Fund - Direct Plan - Growth Option',
                'Axis Strategic Bond Fund - Direct Plan - Half Yearly Dividend option',
                'Axis Strategic Bond Fund - Direct Plan - Quarterly Dividend option',
                'Axis Strategic Bond Fund - Growth Option',
                'Axis Strategic Bond Fund - Half Yearly Dividend Option',
                'Axis Strategic Bond Fund - Quarterly Dividend Option',
                'Axis Dynamic Bond Fund  - Half Yearly Dividend option',
                'Axis Dynamic Bond Fund - Direct Plan - Growth Option',
                'Axis Dynamic Bond Fund - Direct Plan - Half Yearly Dividend Option',
                'Axis Dynamic Bond Fund - Direct Plan - Quarterly Dividend Option',
                'Axis Dynamic Bond Fund - Growth Option',
                'Axis Dynamic Bond Fund - Quarterly Dividend option',
                'Axis Corporate Debt Fund - Direct Plan Daily Dividend Reinvestment',
                'Axis Corporate Debt Fund - Direct Plan Growth',
                'Axis Corporate Debt Fund - Direct Plan Monthly Dividend',
                'Axis Corporate Debt Fund - Direct Plan Regular Dividend',
                'Axis Corporate Debt Fund - Direct Plan Weekly Dividend',
                'Axis Corporate Debt Fund - Regular Plan Daily Dividend Reinvestment',
                'Axis Corporate Debt Fund - Regular Plan Growth',
                'Axis Corporate Debt Fund - Regular Plan Monthly Dividend',
                'Axis Corporate Debt Fund - Regular Plan Regular Dividend',
                'Axis Corporate Debt Fund - Regular Plan Weekly Dividend',
                'Axis Credit Risk Fund - Direct Plan - Growth',
                'Axis Credit Risk Fund - Direct Plan - Monthly Dividend',
                'Axis Credit Risk Fund - Direct Plan - Weekly Dividend',
                'Axis Credit Risk Fund - Regular Plan - Growth',
                'Axis Credit Risk Fund - Regular Plan - Monthly Dividend',
                'Axis Credit Risk Fund - Regular Plan - weekly Dividend',
                'Axis Banking & PSU Debt Fund - Bonus Option',
                'Axis Banking & PSU Debt Fund - Daily Dividend Option',
                'Axis Banking & PSU Debt Fund - Direct Plan - Bonus Option',
                'Axis Banking & PSU Debt Fund - Direct Plan - Daily Dividend Option',
                'Axis Banking & PSU Debt Fund - Direct Plan - Growth Option',
                'Axis Banking & PSU Debt Fund - Direct Plan - Monthly Dividend Option',
                'Axis Banking & PSU Debt Fund - Direct Plan - Weekly Dividend Option',
                'Axis Banking & PSU Debt Fund - Growth option',
                'Axis Banking & PSU Debt Fund - Monthly Dividend Option',
                'Axis Banking & PSU Debt Fund - Weekly Dividend option',
                'Axis Gilt Fund - Direct Plan - Bonus Option',
                'Axis Gilt Fund - Direct Plan - Growth Option',
                'Axis Gilt Fund - Direct Plan - Half Yearly Dividend Option',
                'Axis Gilt Fund - Direct Plan - Regular Dividend Option',
                'Axis Gilt Fund - Growth Option',
                'Axis Gilt Fund - Half Yearly Dividend Option',
                'Axis Gilt Fund - Regular Dividend Option',
                'Axis Regular Saver Fund - Direct Plan - Half Yearly',
                'Axis Regular Saver Fund - Direct Plan - Quarterly',
                'Axis Regular Saver Fund - Dividend Option - Annual Dividend Option',
                'Axis Regular Saver Fund - Dividend Option - Half Yearly',
                'Axis Regular Saver Fund - Dividend Option - Quarterly',
                'Axis Regular Saver Fund -Growth Option',
                'Axis Regular Saver Fund- Direct Plan - Dividend Option - Annual Dividend Option',
                'Axis Regular Saver Fund- Direct Plan - Growth Option',
                'Axis Equity Hybrid Fund - Direct Plan - Growth Option',
                'Axis Equity Hybrid Fund - Direct Plan - Monthly Dividend Option',
                'Axis Equity Hybrid Fund - Direct Plan - Quarterly Dividend Option',
                'Axis Equity Hybrid Fund - Direct Plan - Regular Dividend Option',
                'Axis Equity Hybrid Fund - Regular Plan - Growth Option',
                'Axis Equity Hybrid Fund - Regular Plan - Monthly Dividend Option',
                'Axis Equity Hybrid Fund - Regular Plan - Quarterly Dividend Option',
                'Axis Equity Hybrid Fund - Regular Plan - Regular Dividend Option',
                'Axis Dynamic Equity Fund - Direct Plan - Dividend',
                'Axis Dynamic Equity Fund - Direct Plan - Growth',
                'Axis Dynamic Equity Fund - Regular Plan - Dividend',
                'Axis Dynamic Equity Fund - Regular Plan - Growth',
                'Axis Triple Advantage Fund - Direct Plan - Dividend Option',
                'Axis Triple Advantage Fund - Direct Plan - Growth Option',
                'Axis Triple Advantage Fund - Dividend Option',
                'Axis Triple Advantage Fund - Growth Option',
                'Axis Arbitrage Fund - Direct Plan - Dividend',
                'Axis Arbitrage Fund - Direct Plan - Growth',
                'Axis Arbitrage Fund - Regular Plan - Dividend',
                'Axis Arbitrage Fund - Regular Plan - Growth',
                'Axis Equity Saver Fund - Direct Plan - Growth',
                'Axis Equity Saver Fund - Direct Plan - Monthly Dividend',
                'Axis Equity Saver Fund - Direct Plan - Quarterly Dividend',
                'Axis Equity Saver Fund - Direct Plan - Regular Dividend',
                'Axis Equity Saver Fund - Regular Plan - Growth',
                'Axis Equity Saver Fund - Regular Plan - Monthly Dividend',
                'Axis Equity Saver Fund - Regular Plan - Quarterly Dividend',
                'Axis Equity Saver Fund - Regular Plan - Regular Dividend',
                "Axis Children's Gift Fund - Lock in - Direct Dividend",
                "Axis Children's Gift Fund - Lock in - Direct Growth",
                "Axis Children's Gift Fund - Lock in - Dividend",
                "Axis Children's Gift Fund - Lock in - Growth",
                "Axis Children's Gift Fund - without Lock in - Direct Dividend",
                "Axis Children's Gift Fund - without Lock in - Direct Growth",
                "Axis Children's Gift Fund - without Lock in - Dividend",
                "Axis Children's Gift Fund - without Lock in - Growth",
                'Axis Nifty ETF', 'Axis Gold ETF',
                'Axis Gold Fund - Direct Plan - Dividend option',
                'Axis Gold Fund - Direct Plan - Growth option',
                'Axis Gold Fund - Dividend Option',
                'Axis Gold Fund - Growth Option'],
            returns: [],
            CAGR: 0,
            startDate: '',
            endDate: '',
            x: '',
            y: ''



        }
    }

    getData = () => {
        let k = []
        let l = this.state.symbol

        axios.get('/api/mutuals', {
            params: { symbol: l }
        }).then(res => {
            this.setState({ mutuals: res.data })

        }

        )
    }




    render() {
        return (
            <div>
                <div>
                    <button onClick={this.getData} className='btn btn-dark m-5'>Data</button>
                </div>
                {this.state.mutuals.length != 0 && this.state.symbol.map(stock => <MFLine
                    x={this.state.mutuals.filter(x => x.NAME == stock).map(fund => fund.DATE)}
                    y0={this.state.mutuals.filter(x => x.NAME == stock).map(fund => fund.NAV)[0]}
                    y={this.state.mutuals.filter(x => x.NAME == stock).map(fund => fund.NAV)}
                    title={stock}
                    className='m-5' />)}

            </div>
        )
    }

}

export default Mutual