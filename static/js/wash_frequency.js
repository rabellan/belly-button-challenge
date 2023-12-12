// Bonus work
// wash_frequency.js loaded from index.html
// Build gauge chart -- <div id="gauge" class="js-plotly-plot">
function buildGaugeChart(sample) {

    // Retrieve all metadata
    let metadata = allData.metadata;

    // Filter based on the value of the sample
    // Log the array of metadata objects after the have been filtered
    let value = metadata.filter(result => result.id == sample);
    console.log(value)

    // Get the first index from the array
    let valueData = value[0];

    // Find Wash Frequency by grabbing the 7th element of the array
    let washFrequency = Object.values(valueData)[6];

    // Set up the trace for the gauge chart
    let trace2 = {
        value: washFrequency,
        title: {
            text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
            font: {color: "black", size: 18}
        },
        type: "indicator",
        mode: "gauge+number",
        domain: {x: [0,1], y: [0,1]},
        gauge: {
            axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
            bar: {color: "green"},
            steps: [
                {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                {range: [7, 8], color: "rgba(110, 154, 22, .5)"},
                {range: [6, 7], color: "rgba(142, 178, 35, .5)"},
                {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                {range: [4, 5], color: "rgba(184, 205, 68, .5)"},
                {range: [3, 4], color: "rgba(202, 209, 95, .5)"},
                {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                {range: [0, 1], color: "rgba(255, 255, 255, 0)"}
            ]
        } 
    };

    // Set up the Layout
    let layout = {
        width: 400, 
        height: 400,
        margin: {t: 0, b:0}
    };

    // Call Plotly to plot the gauge chart
    Plotly.newPlot("gauge", [trace2], layout)

    };