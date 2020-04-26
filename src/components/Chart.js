import React from 'react';

import CanvasJSReact from '../lib/canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Chart(props) {
    const chartOptions = {
        theme: "light",
        title: {
            text: props.name
        },
        subtitles: [{
            text: "-"
        }],
        toolTip: {
            shared: true
        },
        data: [
            {
                type: "line",
                name: "Clicks",
                axisYIndex: 0,
                showInLegend: true,
                xValueFormatString: "DD MMM YYYY",
                yValueFormatString: "#,##0.##",
                dataPoints: props.clicksData
            },
            {
                type: "line",
                name: "Impressions",
                axisYIndex: 1,
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "DD MMM YYYY",
                yValueFormatString: "#,##0.##",
                dataPoints: props.impressionsData
            }
        ]
    };

    return (
        <div>
            <CanvasJSChart options={chartOptions}/>
        </div>
    );
}

export default Chart;