import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { optionchainAction } from '../actions/optionchainAction'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import { Accordion, AccordionTab } from 'primereact/accordion';
import Footer from "./Footer";
import Payoff from './Payoff';

class ProspectiveOptions extends Component {


    constructor(props) {
        super(props)

        this.state = {
            symbol: '',
            date: '29NOV2018',
            OPTIONCHAIN: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.optionchain !== prevState.OPTIONCHAIN) {
            return { OPTIONCHAIN: nextProps.optionchain };
        }
        else return null;
    }



    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    getOptionChains = (e) => {
        e.preventDefault()
        let K = {
            symbol: this.state.symbol,
            date: this.state.date
        }


        this.props.optionchainAction(K, this.props.history)


    }

    handleStrikePrice = (StrikePrice, CallBid, PutBid, CallOffer, PutOffer) => {
        console.log({
            StrikePrice,
            CallBid,
            PutBid,
            CallOffer,
            PutOffer
        })


    }






    render() {

        const optionChainTable = (
            <div>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="tableheader">
                            <th scope="col">Sparklines</th>
                            <th scope="col">Call OpenInterest</th>
                            <th scope="col">Call Change In OI</th>
                            <th scope="col">Call LTP</th>
                            <th scope="col">Call Net Change</th>
                            <th scope="col">Call Volume</th>
                            <th scope="col">Call Bid Quantity</th>
                            <th scope="col">Call Bid Price</th>
                            <th scope="col">Call Offer Price</th>
                            <th scope="col">Call Offer Quantity</th>
                            <th scope="col">Strike Price</th>
                            <th scope="col">Put Bid Quantity</th>
                            <th scope="col">Put Bid Price</th>
                            <th scope="col">Put Offer Price</th>
                            <th scope="col">Put Offer Quantity</th>
                            <th scope="col">Put Volume</th>
                            <th scope="col">Put Net Change</th>
                            <th scope="col">Put LTP</th>
                            <th scope="col">Put Open Interest</th>
                            <th scope="col">Put Change in OI</th>
                        </tr>
                    </thead>

                    <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

                        {this.state.OPTIONCHAIN.OptionChain.map(leg => {

                            return (

                                <tr key={leg.StrikePrice}>
                                    <td> </td>
                                    <td>{leg.COpenInterest}</td>
                                    <td>{leg.CChangeInOI}</td>
                                    <td>{leg.CLTP}</td>
                                    <td>{leg.CNetChange}</td>
                                    <td>{leg.CVolume}</td>
                                    <td>{leg.CBidQty}</td>
                                    <td>{leg.CBidPrice}</td>
                                    <td>{leg.COfferPrice}</td>
                                    <td>{leg.COfferQty}</td>
                                    <td><b><u><a className='deleteLegButton' onClick={() => this.handleStrikePrice(leg.StrikePrice, leg.CBidPrice, leg.PBidPrice, leg.COfferPrice, leg.POfferPrice)}>{leg.StrikePrice}</a></u></b></td>
                                    <td>{leg.PBidQty}</td>
                                    <td>{leg.PBidPrice}</td>
                                    <td>{leg.POfferPrice}</td>
                                    <td>{leg.POfferQty}</td>
                                    <td>{leg.PVolume}</td>
                                    <td>{leg.PNetChange}</td>
                                    <td>{leg.PLTP}</td>
                                    <td>{leg.POpenInterest}</td>
                                    <td>{leg.PChangeInOI}</td>



                                </tr>

                            )
                        })}

                    </ReactCSSTransitionGroup>

                </table>

            </div>
        )



















        return (
            <div className="masteroptionchain">

                <input type='text' name='symbol' value={this.state.symbol} onChange={this.onChange}></input>
                <input type='text' name='date' value={this.state.date} onChange={this.onChange}></input>
                <button className="btn btn-block" onClick={this.getOptionChains}>Run</button>
                {this.state.OPTIONCHAIN.OptionChain.length > 0 &&
                    <div>
                        <div className='p-grid'>
                            <div className='p-col-2'>
                                <Payoff />
                            </div>
                            <div className='p-col-10'>
                                <Accordion>
                                    <AccordionTab header="View Option Chain">
                                        <div className="opt table-responsive">{optionChainTable}</div>
                                    </AccordionTab>
                                </Accordion>
                            </div>

                        </div>
                    </div>








                }




            </div>
        )
    }
}

const mapStateToProps = state => ({
    // eslint-disable-next-line
    optionchain: state.optionchain
})



export default connect(mapStateToProps, { optionchainAction })(withRouter(ProspectiveOptions))