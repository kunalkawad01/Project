import React, { Component } from 'react'
export default class TickerSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tickers: []
        }

    }
    onChangeSymbol = (e) => {
        if (this.state.tickers.length > 1)
            this.props.getTickers([...this.state.tickers, e.target.value])
        let s = e.target.value
        this.setState(prevState => {
            return { tickers: [...prevState.tickers, s] }
        })


    }

    handleDelete = (ticker) => {
        this.props.getTickers(this.state.tickers.filter(x => x !== ticker))
        this.setState(prevState => {
            return { tickers: prevState.tickers.filter(x => x !== ticker) }

        })



    }
    sendData = (e) => {
        return this.props.getTickers(this.state.tickers)
    }
    render() {
        const symbols = ['ABB',
            'ACC',
            'AUBANK',
            'ADANIPORTS',
            'ADANIPOWER',
            'ABCAPITAL',
            'ABFRL',
            'AJANTPHARM',
            'ALKEM',
            'AMARAJABAT',
            'AMBUJACEM',
            'APOLLOHOSP',
            'APOLLOTYRE',
            'ASHOKLEY',
            'ASIANPAINT',
            'AUROPHARMA',
            'DMART',
            'AXISBANK',
            'BAJAJ-AUTO',
            'BAJFINANCE',
            'BAJAJFINSV',
            'BALKRISIND',
            'BANDHANBNK',
            'BANKBARODA',
            'BANKINDIA',
            'BATAINDIA',
            'BERGEPAINT',
            'BEL',
            'BHARATFIN',
            'BHARATFORG',
            'BHEL',
            'BPCL',
            'BHARTIARTL',
            'INFRATEL',
            'BIOCON',
            'BOSCHLTD',
            'BRITANNIA',
            'CADILAHC',
            'CANBK',
            'CASTROLIND',
            'CENTRALBK',
            'CENTURYTEX',
            'CHOLAFIN',
            'CIPLA',
            'COALINDIA',
            'COLPAL',
            'CONCOR',
            'COROMANDEL',
            'CROMPTON',
            'CUMMINSIND',
            'DLF',
            'DABUR',
            'DHFL',
            'DBL',
            'DISHTV',
            'DIVISLAB',
            'DRREDDY',
            'EDELWEISS',
            'EICHERMOT',
            'ENDURANCE',
            'ENGINERSIN',
            'ESCORTS',
            'EXIDEIND',
            'FEDERALBNK',
            'FCONSUMER',
            'FRETAIL',
            'GAIL',
            'GMRINFRA',
            'GICRE',
            'GLENMARK',
            'GODREJAGRO',
            'GODREJCP',
            'GODREJIND',
            'GRAPHITE',
            'GRASIM',
            'GRUH',
            'GSPL',
            'HEG',
            'HCLTECH',
            'HDFCBANK',
            'HDFCLIFE',
            'HAVELLS',
            'HEROMOTOCO',
            'HEXAWARE',
            'HINDALCO',
            'HINDPETRO',
            'HINDUNILVR',
            'HINDZINC',
            'HUDCO',
            'HDFC',
            'ITC',
            'ICICIBANK',
            'ICICIGI',
            'ICICIPRULI',
            'IDBI',
            'IDFCBANK',
            'IBULHSGFIN',
            'IBVENTURES',
            'INDIANB',
            'INDHOTEL',
            'IOC',
            'IGL',
            'INDUSINDBK',
            'NAUKRI',
            'INFY',
            'INDIGO',
            'JSWENERGY',
            'JSWSTEEL',
            'JINDALSTEL',
            'JUBLFOOD',
            'JUBILANT',
            'KOTAKBANK',
            'L&TFH',
            'LICHSGFIN',
            'LTI',
            'LT',
            'LUPIN',
            'MRF',
            'MGL',
            'M&MFIN',
            'M&M',
            'MANAPPURAM',
            'MRPL',
            'MARICO',
            'MARUTI',
            'MFSL',
            'MINDTREE',
            'MOTHERSUMI',
            'MPHASIS',
            'MUTHOOTFIN',
            'NATCOPHARM',
            'NBCC',
            'NHPC',
            'NMDC',
            'NTPC',
            'NATIONALUM',
            'OBEROIRLTY',
            'ONGC',
            'OIL',
            'OFSS',
            'PCJEWELLER',
            'PIIND',
            'PNBHOUSING',
            'PAGEIND',
            'PETRONET',
            'PIDILITIND',
            'PEL',
            'PFC',
            'POWERGRID',
            'PRESTIGE',
            'PGHH',
            'PNB',
            'QUESS',
            'RBLBANK',
            'RECLTD',
            'RAJESHEXPO',
            'RELCAPITAL',
            'RELIANCE',
            'RELINFRA',
            'RPOWER',
            'SBILIFE',
            'SRF',
            'SHREECEM',
            'SRTRANSFIN',
            'SIEMENS',
            'SBIN',
            'SAIL',
            'STRTECH',
            'SPARC',
            'SUNPHARMA',
            'SUNTV',
            'SYNGENE',
            'TV18BRDCST',
            'TVSMOTOR',
            'TATACHEM',
            'TCS',
            'TATAGLOBAL',
            'TATAMTRDVR',
            'TATAMOTORS',
            'TATAPOWER',
            'TATASTEEL',
            'TECHM',
            'NIACL',
            'RAMCOCEM',
            'TITAN',
            'TORNTPHARM',
            'TORNTPOWER',
            'UPL',
            'ULTRACEMCO',
            'UNIONBANK',
            'UBL',
            'MCDOWELL-N',
            'VGUARD',
            'VAKRANGEE',
            'VEDL',
            'IDEA',
            'VOLTAS',
            'WIPRO',
            'YESBANK',
            'ZEEL',
        ]

        return (
            <div>
                <div>
                    <div className='grid'>
                        <div className='row bar'>
                            <div className='col-1'>
                                <select className="form-control tickerselectbox mt-5 ml-3"

                                    //onClick={this.onChangeSymbol}
                                    onChange={this.onChangeSymbol}
                                    name='symbol'
                                    data-live-search="true">
                                    {symbols.map(symbol => {
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

                            <div className='col-2 ml-5'>
                                {/* <button className='btn-dark m-5 p-3 databtn' onClick={this.sendData}>Get Data</button> */}
                            </div>
                        </div>
                    </div>

                    {this.state.tickers.map(ticker => {
                        return (
                            <span >
                                {/* <p key={ticker} className='ticker'>{ticker}</p> */}
                                <button className='btn btn-dark m-3 p-3 donutchart' onClick={() => this.handleDelete(ticker)}>{ticker} x</button>

                            </span>
                        )
                    })}

                </div>


            </div>
        )
    }
}
