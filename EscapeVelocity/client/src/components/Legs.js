import React, { Component } from 'react'

import 'react-datepicker/dist/react-datepicker.css';
import FormBacktest from './FormBacktest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Converter from 'number-to-words'
//import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { backtestFire } from '../actions/backtestAction'


class Legs extends Component {

    constructor(props) {
        super(props)

        this.state = {
            legs: [],



        }





    }//contructor ends






    addLegs = (leg) => {
        const legs = [...this.state.legs, leg]
        this.setState({ legs: legs })
    }

    handleDelete = (id) => {
        let legs = [...this.state.legs]
        legs = legs.filter(leg => leg.id !== id)
        this.setState({ legs: legs })
    }

    postLegs = () => {

        // let promise2 = instance2.get('/api/backtestentry', {
        //     params: {
        //         ...k
        //     }
        // }).then(response => console.log(response.data))
        //     .catch(err => console.log(err))


        this.props.backtestFire(this.state, this.props.history)
        //this.props.history will allow us to redirect from with the action 'backtestFire'

    }


    render() {



        const optiontable = (
            <div className="card optiontable">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="tableheader">
                            <th scope="col">Option Leg</th>
                            <th scope="col">Option Type</th>
                            <th scope="col">Position Type</th>
                            <th scope="col">Strike Distance</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <ReactCSSTransitionGroup component="tbody" transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

                        {this.state.legs.map(leg => {
                            const strikeprice = Converter.toWords(leg.strikeprice).charAt(0).toUpperCase() + Converter.toWords(leg.strikeprice).slice(1)
                            return (

                                <tr key={leg.id}>
                                    <td>{leg.id.toString()}</td>
                                    <td>{leg.optiontype === 'CE' ? 'Call' : 'Put'}</td>
                                    <td>{leg.positiontype === '1' ? 'Long' : 'Short'}</td>
                                    <td>{leg.strikeprice > 0 ? `${strikeprice} Strikes above the Market Price` : `${strikeprice} Strikes below the Market Price`}</td>
                                    <td><FontAwesomeIcon icon="trash" className="deleteLegButton" onClick={() => this.handleDelete(leg.id)} /></td>

                                </tr>

                            )
                        })}

                    </ReactCSSTransitionGroup>

                </table>
                <button className="btn btn-block backtestbutton" onClick={this.postLegs}>Run Backtest</button>
            </div>
        )


        return (
            <div>
                <div className="row">
                    <div className="col-md-3 card m-5 formbacktest ">
                        <FormBacktest addLegs={this.addLegs} />
                    </div>
                    <div className="col-md-7 mt-5">
                        {(this.state.legs.length > 0) && optiontable}


                    </div>
                </div>
            </div>
        )
    }
}

// eslint-disable-next-line
const mapStateToProps = state => ({
    // eslint-disable-next-line
    backtest: state.backtest
})


export default connect(mapStateToProps, { backtestFire })(withRouter(Legs))