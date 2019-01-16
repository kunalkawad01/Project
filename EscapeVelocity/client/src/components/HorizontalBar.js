import React from 'react';
import Plot from 'react-plotly.js';

class HorizontalBar extends React.Component {

    render() {
        const viridisColorscale = ['#0c5a53', '#00968e', '#106e7c', '#2a4858'];
        return (
            <Plot classname='barchart m-5'
                data={[
                    {
                        x: this.props.x1,
                        y: this.props.y,
                        type: 'bar',
                        orientation: 'h',
                        name: 'Call Open Interest'

                    },
                    {
                        x: this.props.x2,
                        y: this.props.y,
                        type: 'bar',
                        orientation: 'h',
                        name: 'Put Open Interest'

                    }

                ]}
                layout={{
                    width: 2000, height: 1000, title: this.props.title,
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

export default HorizontalBar