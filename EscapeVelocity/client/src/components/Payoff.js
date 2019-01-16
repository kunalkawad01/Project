import React, { Component } from 'react'
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import _ from 'lodash'


export default class Payoff extends Component {

    constructor(props) {
        super(props)

        this.state = {
            strikeprice: '',
            optiontype: '',
            positiontype: '',
            quantity: '',
            premium: '',
            positions: [],
            totalProfit: []
        }
    }

    handleOnSubmit = (e) => {

        e.preventDefault()

        let oldpositions = this.state.positions
        let newPosition = {
            strikeprice: this.state.strikeprice,
            optiontype: this.state.optiontype,
            positiontype: this.state.positiontype,
            quantity: this.state.quantity,
            premium: this.state.premium
        }


        let newpositions = oldpositions.push(newPosition)


        this.setState(
            {
                postions: newpositions,
                strikeprice: '',
                optiontype: '',
                positiontype: '',
                quantity: '',
                premium: ''
            }
        )





    }

    getTotalProfits = (legs) => {

        let legprofits = legs.map(leg => leg.y)
        console.log(legprofits)

        let kprofits = []
        for (let i = 0; i < legprofits[0].length; i++) {
            kprofits[i] = legprofits.map(leg => leg[i])
        }

        console.log(kprofits)

        let consprofits = kprofits.map(k => _.sum(k))
        console.log('consolidated', consprofits)
    }


    getProfitLegs = () => {
        let legs = this.state.positions
        let x = [135, 140, 145, 150, 160, 165, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 290, 295, 300]
        legs = legs.map(leg => {
            if (leg.optiontype === 'CE') {
                let xdash = x.map(x => x - leg.strikeprice)
                let y = xdash.map(x => Math.max(0, x))
                y = y.map(y => (y - leg.premium) * ((leg.positiontype === 'Long' ? 1 : -1)) * (leg.quantity))
                leg.y = y
            }

            return leg
        })

        this.getTotalProfits(legs)


    }


    render() {
        return (
            <div className='ml-5 mr-5 p-grid'>
                <form onSubmit={this.handleOnSubmit}>


                    <span className="p-float-label mt-4 p-col-12">
                        <InputText name="strikeprice"
                            value={this.state.strikeprice}
                            onChange={(e) => this.setState({ strikeprice: e.target.value })} />
                        <label className='p-col-12 p-1 ml-2' htmlFor="strikeprice">Strike Price</label>
                    </span>


                    <div className='mt-2'>
                        <RadioButton inputId='CallOption' value="CE" name="optiontype" onChange={(e) => this.setState({ optiontype: e.value })} checked={this.state.optiontype === 'CE'} />
                        <label htmlFor="CallOption" className="p-radiobutton-label mr-3">Call</label>
                        <RadioButton inputId='PutOption' value="PE" name="optiontype" onChange={(e) => this.setState({ optiontype: e.value })} checked={this.state.optiontype === 'PE'} />
                        <label htmlFor="PutOption" className="p-radiobutton-label">Put</label>
                    </div>


                    <div className='mt-2'>
                        <RadioButton inputId='LongPosition' value="Long" name="positiontype" onChange={(e) => this.setState({ positiontype: e.value })} checked={this.state.positiontype === 'Long'} />
                        <label htmlFor="LongPosition" className="p-radiobutton-label mr-3">Long</label>
                        <RadioButton inputId='ShortPosition' value="Short" name="positiontype" onChange={(e) => this.setState({ positiontype: e.value })} checked={this.state.positiontype === 'Short'} />
                        <label htmlFor="ShortPosition" className="p-radiobutton-label">Short</label>
                    </div>


                    <span className="p-float-label mt-4 p-col-12">
                        <InputText name="quantity"
                            value={this.state.quantity}
                            onChange={(e) => this.setState({ quantity: e.target.value })} />
                        <label className='p-col-12 p-1 ml-2' htmlFor="quantity">Quantity</label>
                    </span>

                    <span className="p-float-label mt-4 p-col-12">
                        <InputText name="premium"
                            value={this.state.premium}
                            onChange={(e) => this.setState({ premium: e.target.value })} />
                        <label className='p-col-12 p-1 ml-2' htmlFor="premium">Premium</label>
                    </span>

                    <Button className='mt-4 btn-block' label="Add Leg" onClick={this.handleOnSubmit} />
                    <Button className='mt-4 btn-block' label="Profits" onClick={this.getProfitLegs} />



                </form>
            </div>
        )
    }
}
