import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
// import FormBacktest from './FormBacktest'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import Converter from 'number-to-words'
//import axios from 'axios'
import _ from 'lodash'
import { connect } from 'react-redux'
import Barchart from './Barchart';
import * as moment from 'moment';
import DonutChart from './Donutchart';
import BoxPlot from './BoxPlot';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class BacktestReport extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Results: [],
            NetProfit: 0,
            MonthlyProfit: [],
            stats: {}
        }


    }//constructor

    componentWillMount() {
        console.log('inside')
        this.setState({ Results: this.props.backtest.NetResultsFlat })
        console.log('State', this.state.Results.length)


    }

    componentDidMount() {

        this.calculateProfit(this.state.Results)
        this.calculateMonthlyProfit(this.state.Results)


    }

    componentDidUpdate() {
        if ((this.state.MonthlyProfit.length > 0) && (_.isEmpty(this.state.stats)))
            this.calulateStatistics(this.state.MonthlyProfit)
    }



    calculateProfit = (Results) => {
        console.log('cprofirt')
        if (Results.length > 0) {
            console.log('cprofitifpass')
            let profit = 0
            let Results2 = [...Results]
            profit = Results2.reduce(function (accumulator, Result) {
                return accumulator + Result.PROFIT;
            }, 0);

            this.setState({ NetProfit: (profit) })


        }
    }//calculateProfit


    calculateMonthlyProfit = (Results) => {

        if (Results.length > 0) {
            let alldates = _.uniq(Results.map(result => result.TIMESTAMP))
            let m = alldates.map(date => {
                return Results.filter(result => result.TIMESTAMP === date)
            })

            let MonthlyProfit = m.map(months => {

                return months.reduce(function (accumulator, month) {
                    return (accumulator + month.PROFIT);
                }, 0);


            })

            MonthlyProfit = MonthlyProfit.map(profit => Math.round(profit * 1 * 100) / 100)
            this.setState({ MonthlyProfit })
            console.log("Final Profit", _.sum(MonthlyProfit))


        }

    }//calculateMonthlyProfit


    calulateStatistics = (MonthlyProfit) => {
        console.log('Hello Stats')
        if (MonthlyProfit.length > 0) {
            console.log('Hello Stats, I m in')
            // let standard_deviation = _.standard_deviation(MonthlyProfit)
            //console.log('sd', standard_deviation)
            let max_drawdown = _.min(MonthlyProfit)
            let best_month = _.max(MonthlyProfit)
            let mean_month = _.mean(MonthlyProfit)
            let pos = MonthlyProfit.filter(month => month > 0)
            let neg = MonthlyProfit.filter(month => month < 0)
            let no_up_months = pos.length
            let no_down_months = neg.length
            let consistency = (no_up_months * 100) / (no_down_months + no_up_months)

            let cum_profit = []
            MonthlyProfit.reduce(function (a, b, i) { return cum_profit[i] = a + b; }, 0);



            const stats = {
                max_drawdown, best_month, mean_month, no_up_months, no_down_months, consistency, cum_profit
            }

            this.setState({ stats })







        }

    }//calculateStatistics






    render() {


        const ResultTable = (
            <div className="card optiontable">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="tableheader">
                            <th scope="col">Option Leg</th>
                            <th scope="col">Option Type</th>
                            <th scope="col">Position Type</th>
                            <th scope="col">Entry Strike Price</th>
                            <th scope="col">Entry Strike Lot Size</th>
                            <th scope="col">Exit Strike Price</th>
                            <th scope="col">Exit Lot Size</th>
                            <th scope="col">Entry Option Price</th>
                            <th scope="col">Exit Option Price</th>
                            <th scope="col">Profiit</th>
                            <th scope="col">Entry Underlying Price</th>
                            <th scope="col">Exit Underlying Price</th>
                            <th scope="col">Timestamp</th>
                            <th scope="col">Expiry Date</th>

                        </tr>
                    </thead>

                    <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

                        {this.state.Results.map(leg => {

                            return (

                                <tr key={leg._id}>
                                    <td>{leg.CONTRACT_D}</td>
                                    <td>{leg.OPTION_TYP}</td>
                                    <td>{leg.POSITION_TYP}</td>
                                    <td>{leg.STRIKE_PR}</td>
                                    <td>{leg.LOT_SIZE}</td>
                                    <td>{leg.ALT_STRIKE}</td>
                                    <td>{leg.EXIT_LOT}</td>
                                    <td>{leg.CLOSE_PRIC}</td>
                                    <td>{leg.EXIT_PRICES}</td>
                                    <td>{leg.PROFIT}</td>
                                    <td>{leg.UNDRLNG_ST}</td>
                                    <td>{leg.EXIT_UNDERLYING}</td>
                                    <td>{leg.TIMESTAMP}</td>
                                    <td>{leg.EXPIRY_DT}</td>



                                </tr>

                            )
                        })}

                    </ReactCSSTransitionGroup>

                </table>
                <button className="btn btn-block backtestbutton" onClick={this.postLegs}>Run Backtest</button>
            </div>
        )


        const template = (
            <div className="template">
                <div className="container card mt-4 containerReport">

                    <div className="row firstrow">



                        <div className="card col-3 mr-auto ml-3 mb-4 mt-4 p-1 totalprofit">
                            <div className="card-header totalprofitheader">
                                <h4> <i className="fas fa-chart-bar icon-2x"></i></h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Total Profit</h5>
                                <p className="card-text">₹ {Math.round(this.state.NetProfit * 100) / 100}</p>

                            </div>
                        </div>



                        <div className="card col-3 m-4 p-1 worstmonth">
                            <div className="card-header worstmonthheader">
                                <h4> <i class="fas fa-bomb icon-4x"></i></h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Worst Month</h5>
                                <p className="card-text">₹ {Math.round(this.state.stats.max_drawdown * 100) / 100}</p>

                            </div>
                        </div>

                        <div className="card col-3 ml-auto mr-4 mb-4 mt-4 p-1 bestmonth">
                            <div className="card-header bestmonthheader">
                                <h4><i className="fas fa-chess-queen"></i></h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Best Month</h5>
                                <p className="card-text">₹ {Math.round(this.state.stats.best_month * 100) / 100}</p>

                            </div>
                        </div>


                    </div>

                    <div className="row mt-4 p-4 justify-content-center">


                        <Barchart
                            className="align-middle justify-content-center"
                            x={_.uniq(this.state.Results.map(e => (e.TIMESTAMP))).map(f => moment(f).format('YYYY-MMM'))}
                            y={this.state.MonthlyProfit}
                            cum_x={_.uniq(this.state.Results.map(e => (e.TIMESTAMP))).map(f => moment(f).format('YYYY-MMM'))}
                            cum_y={this.state.stats.cum_profit}
                        />


                    </div>





                    <div className="row mb-5">

                        <div className="col-4 mb-4 mt-4 p-1 donutconsistency">
                            <DonutChart

                                values1={[(this.state.stats.consistency), (100 - this.state.stats.consistency)]}

                            />

                        </div>

                        <div className="col-4 mb-4 mt-4 p-1 boxdistribution">
                            <BoxPlot

                                y1={this.state.MonthlyProfit}
                                y2={this.state.stats.cum_profit}

                            />

                        </div>




                    </div>

                    <div>
                        <br></br>
                        <br></br>
                        <br></br>

                        {ResultTable}
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>







                </div>
            </div>
        )




        return (
            <div className="backtestReportBody">
                {this.state.Results.length > 0 ? template : this.props.history.push('/')}
            </div>

        )
    }//render



}//class


const mapStateToProps = state => ({
    // eslint-disable-next-line
    backtest: state.backtest
})

export default connect(mapStateToProps, null)(BacktestReport)
