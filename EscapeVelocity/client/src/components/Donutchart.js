import React from 'react';
import Plot from 'react-plotly.js';



class DonutChart extends React.Component {
    render() {

        const viridisColorscale = ['#0c5a53', '#00968e', '#106e7c', '#2a4858'];
        return (



            <Plot className="donutchart"

                data={[

                    {
                        values: this.props.values1,
                        labels: ['Up Months Percentage', 'Down Months Percentage'],
                        name: 'Consitency',
                        hoverinfo: 'label+percent+name',
                        hole: .4,
                        type: 'pie',
                        domain: { column: 0 },



                    },



                ]}

                layout={{
                    width: 400, height: 400, title: '',
                    colorway: viridisColorscale,
                    paper_bgcolor: '#EBEBEB ',
                    plot_bgcolor: '#EBEBEB',
                    insidetextfont_color: 'white',
                    outsidetextfont_color: 'white',
                    legend: { x: -.1, y: 1.2 },
                    font_family: ' "Helvetica Neue", Helvetica, Arial, sans-serif',
                    font_color: "white",
                    margin: {
                        l: 10,
                        r: 10,
                        b: 10,
                        t: 10,
                        pad: 2
                    },


                }}
            />


        );
    }
}

export default DonutChart