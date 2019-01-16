import React, { Component } from 'react'
import axios from 'axios'
import Line from './Line'

import Line2 from './Line2'
import Barchart from './Barchart'
import DatePicker from './DatePicker';
class Equities extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equities: [],
            symbol: '',
            returns: [],
            CAGR: 0,
            startDate: '',
            endDate: ''



        }
    }

    getData = () => {
        let k = []
        let l = this.state.symbol

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





    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    setDate = (range) => {
        this.setState({ startDate: range['startDate'].format('YYYY-MM-DD').toString() })
        this.setState({ endDate: range['endDate'].format('YYYY-MM-DD').toString() })

    }

    render() {
        return (
            <div>
                <input type='text' name='symbol' value={this.state.symbol} onChange={this.onChange} />
                <button onClick={this.getData}>Get Data</button>
                <button onClick={this.calculateReturns}>Get Returns</button>



                <DatePicker handleSelect={this.setDate} />

                {((this.state.equities.length > 0) && (


                    <div className='container'>
                        <div className='m-5'>
                            <Line

                                x={this.state.equities.map(x => x.TIMESTAMP)}
                                y={this.state.equities.map(x => x.CLOSE)}

                                title={this.state.symbol} />

                        </div>




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

export default Equities