import React, { Component } from 'react'
import axios from 'axios'
import Line from './Line'
import Line2 from './Line2'
import Scatter from './Scatter'


import Barchart from './Barchart'
import DatePicker from './DatePicker';
import TickerSelect from './TickerSelect'
class CompEquities extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equities: [],
            symbol: '',
            returns: [],
            CAGR: 0,
            startDate: '',
            endDate: '',
            scatterx: [],
            scattery: [],
            name1: '',
            name2: ''



        }
    }

    getData = (Tickers) => {
        let k = []
        let l = Tickers

        axios.get('/api/equities', {
            params: { symbol: l }
        }).then(res => {
            this.setState({ equities: res.data })
            this.calculateReturns()



        }



        )

    }

    calculateReturns = () => {

        let prices = this.state.equities
        prices = prices.filter(price => (price.TIMESTAMP > this.state.startDate) && (price.TIMESTAMP < this.state.endDate))
        // close = this.state.equities.map(price => price.CLOSE)
        this.setState({ equities: prices })
        let returns = prices.map((price, i, prices) => {

            if (i > 0) {
                return ((price.CLOSE / prices[i - 1].CLOSE) - 1) * 100
            }

        })
        this.setState({ returns: returns })

        let times = ((prices[(prices.length - 1)].CLOSE) / (prices[0].CLOSE))
        let factor = 252 / (prices.length - 1)
        let CAGR = (Math.pow(times, factor) - 1) * 100
        this.setState({ CAGR })
        var mydata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];






    }

    getscatter = (x, y, name1, name2) => {
        this.setState({ scatterx: x, scattery: y, name1, name2 })
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    setDate = (range) => {
        this.setState({ startDate: range['startDate'].format('YYYY-MM-DD').toString() })
        this.setState({ endDate: range['endDate'].format('YYYY-MM-DD').toString() })

    }

    getTickers = (Tickers) => {

        this.getData(Tickers)
    }

    render() {
        return (
            <div>

                <TickerSelect getTickers={this.getTickers} />
                {/* <button onClick={this.getData}>Get Data</button>
                <button onClick={this.calculateReturns}>Get Returns</button> */}



                <DatePicker handleSelect={this.setDate} />

                {((this.state.equities.length > 0) && (


                    <div className='container'>
                        <div className='m-5'>
                            <Line data={this.state.equities} />
                        </div>

                        <div className='m-5 scatter'>
                            <Line2 data={this.state.equities} id={'cor'} getScatter={this.getscatter} />
                        </div>

                        {this.state.scatterx.length != 0 && <div>

                            <Scatter x={this.state.scatterx[0]}
                                y={this.state.scattery[0]}
                                title={this.state.name1 + " VS " + this.state.name2}
                            />
                        </div>}



                        <div className='m-5'>
                            <Barchart x={this.state.equities.map(x => x.TIMESTAMP)}
                                y={this.state.returns.map(x => x)}
                                title={this.state.symbol} />
                        </div>

                        <div>
                            {this.state.CAGR}
                            {this.state.equities[(this.state.equities.length - 1)].CLOSE}
                        </div>

                    </div>




                ))}

            </div>
        )
    }
}

export default CompEquities