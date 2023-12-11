// store JSON data url in constant 'url'
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Grab JSON Object for testing purpose
// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data, console log it, and store in in a variable allData
let allData;

d3.json(url).then(function(data) {
    console.log(data);
    allData = data;
    initDashboard();
});

// Demographic Info panel, "div id=sample-metadata"
function getMetaData(sample){

    // grab metadata dict, example --> "0: {id: 940, ethnicity: 'Caucasian', gender: 'F', age: 24, location: 'Beaufort/NC', …} "
    let metadata = allData.metadata;

    // filter on sample "id" to sampleObj.id and store 1st array element in "result"
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // iterate through result array items, then assign content of result into panelContent
    let panelContent = d3.select("#sample-metadata");
    panelContent.html("");
    for (key in result){
        panelContent.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    }

} 

// Build charts function
function buildCharts(sample){

    // grab metadata dict, example --> "0: {id: 940, ethnicity: 'Caucasian', gender: 'F', age: 24, location: 'Beaufort/NC', …} "
    let samples = allData.samples;

    // build chart info here
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    let otuLabels = result.otu_labels;
    let otuIds = result.otu_ids;
    let sampleValues = result.sample_values;
    let wfreq = result.wfreq

    // Build bar graph -- <div id="bar" class="js-plotly-plot">
    yticks = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    let barLayout = {
    title: "<b>Top 10 Operational Taxonomic Units</b>",
    margin : {t:35, l: 150}
    };

    let barData = [
        {
            type : "bar",
            orientation : "h",
            text : otuLabels.slice(0,10).reverse(),
            x : sampleValues.slice(0,10).reverse(),
            y : yticks,
        }
    ];
    // Plot the bar graph here
    Plotly.newPlot("bar", barData, barLayout);

    // Build bubble chart -- <div id="bubble" class="js-plotly-plot">
    let bubbleData = [
        {
            text : otuLabels,
            mode : "markers",
            marker : {
                size : sampleValues,
                color : otuIds,
                colorscale : "Earth"
            },
            x : otuIds,
            y : sampleValues
        }
    ]

    let bubbleLayout = {
        title : "<b>Operational Taxonomic Units per Sample</b>",
        margin : {t:0},
        hovermode : "closest",
        xaxis : {title: "OTU IDs"},
        margin : {t:30}
    };
    // Plot the bubble graph here
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
}


function initDashboard(){

    // initialize drop down with a default sample value

    let selector = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let sampleNames = data.names;

        // loop through names and add to selector

        for (let i = 0; i < sampleNames.length; i++){

            selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
        };
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        getMetaData(firstSample);
        buildGaugeChart(firstSample);
    });
}

// get new sample data each time 
function testSubject(newSample) {

    buildCharts(newSample);
    getMetaData(newSample);
    buildGaugeChart(newSample);

}

// initialize dashboard
initDashboard();