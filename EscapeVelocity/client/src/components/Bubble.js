import React from 'react';
import Plot from 'react-plotly.js';

class Bubble extends React.Component {

    render() {
        const viridisColorscale = ['#0c5a53', '#00968e', '#106e7c', '#2a4858'];
        return (
            <Plot className='barchart m-5'
                data={[
                    {
                        x: this.props.x,
                        y: this.props.y,
                        type: 'scatter',
                        mode: 'markers',
                        marker: { color: 'red' },
                        marker: { size: 20 }
                    }

                ]}
                layout={{
                    width: 1500, height: 750, title: this.props.title,
                    paper_bgcolor: '#EBEBEB ',
                    plot_bgcolor: '#EBEBEB ',
                    colorway: viridisColorscale,
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

                }}
            />
        );
    }
}

export default Bubble