import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import uuid from 'uuid'




export default class FormBacktest extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: uuid.v4(),
            optiontype: 'CE',
            positiontype: '1',
            strikeprice: 0,
            startDate: moment(),
            endDate: moment(),
            symbols: ['Select Ticker', 'ABIRLANUVO', 'ACC', 'ADANIENT', 'ADANIPORTS', 'ADANIPOWER',
                'AJANTPHARM', 'ALBK', 'AMARAJABAT', 'AMBUJACEM', 'ANDHRABANK',
                'APOLLOHOSP', 'APOLLOTYRE', 'ARVIND', 'ASHOKLEY', 'ASIANPAINT',
                'AUROPHARMA', 'AXISBANK', 'BAJAJ-AUTO', 'BAJFINANCE', 'BANKBARODA',
                'BANKINDIA', 'BATAINDIA', 'BEL', 'BEML', 'BHARATFORG',
                'BHARTIARTL', 'BHEL', 'BIOCON', 'BPCL', 'BRITANNIA', 'CADILAHC',
                'CAIRN', 'CANBK', 'CASTROLIND', 'CEATLTD', 'CENTURYTEX', 'CESC',
                'CIPLA', 'COALINDIA', 'COLPAL', 'CONCOR', 'CROMPGREAV', 'DABUR',
                'DHFL', 'DISHTV', 'DIVISLAB', 'DLF', 'DRREDDY', 'EICHERMOT',
                'ENGINERSIN', 'EXIDEIND', 'FEDERALBNK', 'GAIL', 'GLENMARK',
                'GMRINFRA', 'GODREJIND', 'GRASIM', 'HAVELLS', 'HCLTECH', 'HDFC',
                'HDFCBANK', 'HDIL', 'HEROMOTOCO', 'HEXAWARE', 'HINDALCO',
                'HINDPETRO', 'HINDUNILVR', 'HINDZINC', 'IBREALEST', 'IBULHSGFIN',
                'ICICIBANK', 'IDBI', 'IDEA', 'IDFC', 'IFCI', 'IGL', 'INDIACEM',
                'INDUSINDBK', 'INFRATEL', 'INFY', 'IOB', 'IOC', 'IRB', 'ITC',
                'JETAIRWAYS', 'JINDALSTEL', 'JISLJALEQS', 'JPASSOCIAT',
                'JSWENERGY', 'JSWSTEEL', 'JUBLFOOD', 'JUSTDIAL', 'KOTAKBANK',
                'KSCL', 'KTKBANK', 'L&TFH', 'LICHSGFIN', 'LT', 'LUPIN', 'M&M',
                'M&MFIN', 'MARICO', 'MARUTI', 'MCLEODRUSS', 'MINDTREE',
                'MOTHERSUMI', 'NCC', 'NHPC', 'NMDC', 'NTPC', 'OIL', 'ONGC',
                'ORIENTBANK', 'PETRONET', 'PFC', 'PIDILITIND', 'PNB', 'POWERGRID',
                'PTC', 'RCOM', 'RECLTD', 'RELCAPITAL', 'RELIANCE', 'RELINFRA',
                'RPOWER', 'SAIL', 'SBIN', 'SIEMENS', 'SKSMICRO', 'SOUTHBANK',
                'SRF', 'SRTRANSFIN', 'STAR', 'SUNPHARMA', 'SUNTV', 'SYNDIBANK',
                'TATACHEM', 'TATACOMM', 'TATAGLOBAL', 'TATAMOTORS', 'TATAMTRDVR',
                'TATAPOWER', 'TATASTEEL', 'TCS', 'TECHM', 'TITAN', 'TORNTPHARM',
                'TV18BRDCST', 'TVSMOTOR', 'UBL', 'UCOBANK', 'ULTRACEMCO',
                'UNIONBANK', 'UNITECH', 'UPL', 'VEDL', 'VOLTAS', 'WIPRO',
                'WOCKPHARMA', 'YESBANK', 'ZEEL', 'GODREJCP', 'BOSCHLTD',
                'CUMMINSIND', 'GRANULES', 'ICIL', 'KPIT', 'MCDOWELL-N',
                'PCJEWELLER', 'TATAELXSI', 'MRF', 'OFSS', 'PAGEIND', 'BHARATFIN',
                'NIITTECH', 'SINTEX', 'DCBBANK', 'IDFCBANK', 'TORNTPOWER',
                'CGPOWER', 'CAPF', 'DALMIABHA', 'EQUITAS', 'ESCORTS', 'INDIANB',
                'INDIGO', 'INFIBEAM', 'MFSL', 'MUTHOOTFIN', 'PEL', 'PVR', 'RDEL',
                'SHREECEM', 'SUZLON', 'UJJIVAN', 'BAJAJFINSV', 'BALKRISIND',
                'BALRAMCHIN', 'BERGEPAINT', 'CANFINHOME', 'FORTIS', 'GODFRYPHLP',
                'GSFC', 'MCX', 'MGL', 'MRPL', 'NBCC', 'NESTLEIND', 'RAYMOND',
                'VGUARD', 'CHOLAFIN', 'HCC', 'NATIONALUM', 'RBLBANK', 'KAJARIACER',
                'RAMCOCEM', 'CHENNPETRO', 'ICICIPRULI', 'MANAPPURAM', 'SREINFRA',
                'REPCOHOME', 'RNAVAL'],
            symbol: 'SBIN'


        }





    }//contructor ends

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSymbol = (e) => {
        console.log('nsfkls')
        this.setState({ [e.target.name]: e.target.value });
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            id: uuid.v4()
        })

        this.props.addLegs(this.state)







    }



    render() {
        return (
            <div>


                <form className="chiefform" onSubmit={this.onSubmit}>
                    <div className="ch ml-auto mr-auto"><div className="cha"></div></div>
                    <p className='display-4  p-2 chh'>Add Option Leg</p>
                    <div className="pl-2 pr-2 ml-3 mr-3 mb-2">
                        <div className="text-left">
                            <label className="backtestformlabel display-4">Start Date</label>
                            <div className="form-group form-control text-left ">

                                <DatePicker className="df"
                                    selected={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                    dateFormat="YYYY-MM-DD"
                                    placeholder="Start Date"
                                />
                            </div>
                        </div>



                        <div className="text-left">
                            <label className="backtestformlabel display-4">End Date</label>
                            <div className="form-group form-control text-left ">

                                <DatePicker className="df"
                                    selected={this.state.endDate}
                                    onChange={this.handleEndDateChange}
                                    dateFormat="YYYY-MM-DD"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>



                        {/* <div className="row radiomastermarginoption">
                            <p className="backtestformlabel display-4 ml-3 text-left">Option Type:</p>

                            <div className="ml-auto">
                                <div className="custom-control custom-radio custom-control-inline">

                                    <input
                                        type="radio"
                                        id="customRadioInline1"
                                        name="optiontype"
                                        className="mr-5 custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.optiontype === 'CE'}
                                        value='CE' />

                                    <p
                                        className="custom-control-label mr-5"
                                        htmlFor="customRadioInline1">Call</p>
                                </div>


                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="customRadioInline2"
                                        name="optiontype"
                                        className="pr-5 custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.optiontype === 'PE'}
                                        value='PE' />
                                    <label
                                        className="pr-3 custom-control-label"
                                        htmlFor="customRadioInline2">Put</label>
                                </div>
                            </div>
                        </div>
 */}

                        <div className="row radiomastermarginposition">
                            <p className="backtestformlabel display-4 ml-3 text-left">Option Type:</p>

                            <div className="radiomarginposition ml-auto">
                                <div className="custom-control custom-radio custom-control-inline">

                                    <input
                                        type="radio"
                                        id="customRadioInline1"
                                        name="optiontype"
                                        className="mr-5 custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.optiontype === 'CE'}
                                        value='CE'
                                    />

                                    <label
                                        className="mr-5 custom-control-label"
                                        htmlFor="customRadioInline1">Call</label>
                                </div>


                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="customRadioInline2"
                                        name="optiontype"
                                        className="pr-5 custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.optiontype === 'PE'}
                                        value='PE' />
                                    <label
                                        className="pr-3 custom-control-label"
                                        htmlFor="customRadioInline2">Put</label>
                                </div>
                            </div>
                        </div>















































                        <div className="row radiomastermarginposition">
                            <p className="backtestformlabel display-4 ml-3 text-left">Position Type:</p>

                            <div className="radiomarginposition ml-auto">
                                <div className="custom-control custom-radio custom-control-inline">

                                    <input
                                        type="radio"
                                        id="customRadioInline3"
                                        name="positiontype"
                                        className="mr-4 custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.positiontype === '1'}
                                        value='1'
                                    />

                                    <label
                                        className="mr-4 pr-3 custom-control-label"
                                        htmlFor="customRadioInline3">Long</label>
                                </div>


                                <div className="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="customRadioInline4"
                                        name="positiontype"
                                        className="custom-control-input"
                                        onChange={this.onChange}
                                        checked={this.state.positiontype === '-1'}
                                        value='-1' />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customRadioInline4">Short</label>
                                </div>
                            </div>
                        </div>



                        <div className="dropdown mt-2">
                            <button
                                className="btn btn-block btn-outline-primary strike-button text-left dropdown-toggle"
                                type="button"
                                id="dropdownMenu2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                selected={this.state.strikeprice}>
                                Strike Price Distance
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">


                                {[-11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(strike => {

                                    return (
                                        <button key={strike}
                                            className="dropdown-item"
                                            type="button"
                                            onClick={this.onChange}
                                            name='strikeprice'
                                            value={strike}

                                        >{strike}</button>)


                                })}



                            </div>
                        </div>

                        <br></br>
                        <div>
                            <select className="btn"
                                value={this.state.symbol}
                                onClick={this.onChangeSymbol}
                                onChange={this.onChangeSymbol}
                                name='symbol'
                                data-live-search="true">
                                {this.state.symbols.map(symbol => {
                                    return (
                                        <option
                                            data-live-search={true}
                                            data-tokens={symbol}
                                            key={symbol}


                                        >{symbol}
                                        </option>)
                                })}

                            </select>

                        </div>

                        <button className="btn btn-dark btn-block mt-3 backtestformbutton" type="submit">Add Leg</button>




                    </div>



                </form>


            </div>
        )
    }
}
