
import React from 'react';
import Plot from 'react-plotly.js';



class Barchart extends React.Component {
    render() {

        const viridisColorscale = ['#0c5a53', '#00968e', '#106e7c', '#2a4858'];
        return (



            <Plot className="ml-auto mr-auto barchart"

                data={[

                    { type: 'bar', name: 'Profit/Loss', x: this.props.x, y: this.props.y },
                    { type: 'line', name: 'Cumulative Profit/Loss', x: this.props.cum_x, y: this.props.cum_y }
                ]}
                layout={{
                    width: 1000, height: 700, title: 'Monthly Profit/Loss',
                    colorway: viridisColorscale,
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

                    },
                    legend: { x: -.1, y: 1.2 }













                }}
            />


        );
    }
}

export default Barchart