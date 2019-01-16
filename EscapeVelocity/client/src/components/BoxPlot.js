import React from 'react';
import Plot from 'react-plotly.js';



class BoxPlot extends React.Component {
    render() {

        const viridisColorscale = ['#0c5a53', '#00968e', '#106e7c', '#2a4858'];
        return (



            <Plot className="ml-auto mr-auto boxplot"

                data={[

                    {
                        y: this.props.y1,
                        boxpoints: 'all',
                        jitter: 0.5,
                        pointpos: 0,
                        type: 'box',
                        name: 'Monthly Profits',
                        boxmean: 'sd'
                    },

                    {
                        y: this.props.y2,
                        boxpoints: 'all',
                        jitter: 0.5,
                        pointpos: 0,
                        type: 'box',
                        name: 'Cumulative Profits',
                        boxmean: 'sd'
                    },






                ]}
                layout={{
                    width: 400, height: 400, title: '',
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
                    legend: { x: -.1, y: 1.2 },
                    margin: {
                        l: 5,
                        r: 5,
                        b: 5,
                        t: 5,
                        pad: 3
                    },



















                }}
            />


        );
    }
}

export default BoxPlot