import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'
var Correlation = require('node-correlation');
const _ = require('lodash')

class Line extends React.Component {
    /*
 *  Source: http://stevegardner.net/2012/06/11/javascript-code-to-calculate-the-pearson-correlation-coefficient/
 */
    getPearsonCorrelation = (x, y) => {
        var shortestArrayLength = 0;

        if (x.length == y.length) {
            shortestArrayLength = x.length;
        } else if (x.length > y.length) {
            shortestArrayLength = y.length;
            console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
        } else {
            shortestArrayLength = x.length;
            console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
        }

        var xy = [];
        var x2 = [];
        var y2 = [];

        for (var i = 0; i < shortestArrayLength; i++) {
            xy.push(x[i] * y[i]);
            x2.push(x[i] * x[i]);
            y2.push(y[i] * y[i]);
        }

        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_x2 = 0;
        var sum_y2 = 0;

        for (var i = 0; i < shortestArrayLength; i++) {
            sum_x += x[i];
            sum_y += y[i];
            sum_xy += xy[i];
            sum_x2 += x2[i];
            sum_y2 += y2[i];
        }

        var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
        var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
        var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
        var step4 = Math.sqrt(step2 * step3);
        var answer = step1 / step4;

        return answer;
    }
    render() {


        let Equities = this.props.data

        const unique = [...new Set(Equities.map(item => item.SYMBOL))];

        let a = [...unique.map(y => Equities.filter(x => x.SYMBOL === y))]
        let datasend = a.map(x => x.CLOSE)
        let namesend = _.uniq(a.map(x => x.SYMBOL))

        //call R function: stats::sd(x=data)

        let uk = a.map(z => {
            let firstPrice = z.map(i => i.CLOSE)[0]
            return ({

                x: z.map(i => i.TIMESTAMP),
                y: z.map(i => i.CLOSE / firstPrice * 100),
                name: _.uniq(z.map(i => i.SYMBOL))[0],

            })
        })

        // axios.get('http://localhost:4603/sd', {
        //     params: { msg1: JSON.stringify(uk) },
        //     headers: {

        //         "Access-Control-Allow-Origin": "*",

        //     }
        // }).then(res => {
        //     console.log('Data from R', res.data)



        // }
        //     //correlation




        // )

        console.log((uk[0].y))
        console.log((uk[1].y))
        let t = [...uk[0].y]
        let ty = [...uk[1].y]
        console.log("Correlation:", this.getPearsonCorrelation(t, ty))
        let u = a.map(z => {
            let firstPrice = z.map(i => i.CLOSE)[0]
            return ({

                x: z.map(i => i.TIMESTAMP),
                y: z.map(i => i.CLOSE / firstPrice * 100),
                name: _.uniq(z.map(i => i.SYMBOL))[0],
                type: 'scatter',
                mode: 'line',
            })
        })

        var myarray = new Array(uk.length)
        for (var i = 0; i < uk.length; i++)
            myarray[i] = new Array(uk.length)


        for (var i = 0; i < uk.length; i++) {
            for (var j = 0; j < uk.length; j++) {
                myarray[i][j] = this.getPearsonCorrelation(uk[i].y, uk[j].y)
            }
        }

        console.log('Correlation Matrix')
        for (var i = 0; i < uk.length; i++) {
            for (var j = 0; j < uk.length; j++) {
                console.log(myarray[i][j])
            }
            console.log('\n')
        }




















        return (
            <Plot className='barchart ml-auto mr-auto'
                data={u}
                layout={{
                    width: 1000, height: 750,
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

        );
    }
}

export default Line