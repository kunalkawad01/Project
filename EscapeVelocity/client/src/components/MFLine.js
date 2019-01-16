import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'
var Correlation = require('node-correlation');
const _ = require('lodash')

class MFLine extends React.Component {






    render() {
        let y = this.props.y
        let x = this.props.x
        let date2 = new Date(x[x.length - 1])
        let date1 = new Date(x[0])
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let n = 1
        if (diffDays > 365) {
            n = diffDays / 365
        }



        let NAVn = y[y.length - 1]
        let NAV0 = y[0]

        let CAGR = (Math.pow((NAVn / NAV0), (1 / n)) - 1) * 100
        CAGR = Math.round(CAGR * 100) / 100



        return (
            <span>
                <Plot className='barchart m-5'
                    data={[{
                        x: this.props.x,
                        y: this.props.y.map(y => y / this.props.y0 * 100)
                    }]}
                    layout={{
                        width: 500, height: 500,
                        title: this.props.title,

                        colorscale: 'Viridis',
                        paper_bgcolor: '#EBEBEB ',
                        plot_bgcolor: '#EBEBEB ',
                        minorgridcolor: '#ffffff',
                        gridcolor: '#ffffff',
                        font_family: ' "Helvetica Neue", Helvetica, Arial, sans-serif',
                        xaxis: {
                            showgrid: true,
                            gridcolor: '#ffffff',
                            gridwidth: 2

                        },
                        yaxis: {
                            showgrid: true,
                            gridcolor: '#ffffff',
                            gridwidth: 2

                        }




                    }}
                />

                CAGR:{CAGR}
            </span>


        );
    }
}

export default MFLine