d3.json("samples.json").then(function(data){
  console.log(data);
});

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = resultArray[0];
    console.log(firstSample);


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_id = firstSample.otu_ids;
    var otu_labels = firstSample.otu_labels;
    var sample_values = firstSample.sample_values;

    console.log(otu_id);
    console.log(otu_labels);
    console.log(sample_values);

    // Create variables for gauge chart
    var metadata = data.metadata
    var resultMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(resultMetadata);
    var firstMetadata = resultMetadata[0];
    console.log(firstMetadata);
    // variable for wfreq
    var wfreq = parseFloat(firstMetadata.wfreq);
    console.log(typeof wfreq);


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    firstSampleDictionary = [];
    for (let i=0; i<sample_values.length; i++) {
      firstSampleDictionary.push({
        id: `OTU ${firstSample.otu_ids[i]}`,
        value: firstSample.sample_values[i],
        label: firstSample.otu_labels[i]
      });
    };
    console.log(firstSampleDictionary);

    firstSampleDictionary.sort( (a, b)=>b.value - a.value);
    var final_values = firstSampleDictionary.slice(0, 10).reverse()
    console.log(final_values)

    // 8. Create the trace for the bar chart. 
     var barTrace = {
       y: final_values.map(row=> row.id),
       x: final_values.map(row=> row.value),
       text: final_values.map(row=> row.label),
       type: 'bar',
       orientation: 'h'
     };
     var barData = [barTrace]
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
     };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    //1. Create the trace for the bubble chart.
     var bubbleTrace = {
      x: otu_id,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_id,
        size: sample_values
      }
    };
    var bubbleData = [bubbleTrace]

  // 2. Create the layout for the bubble chart
    var bubbleLayout = {
    xaxis: {title:"OTU ID"},
    yaxis: {title: 'Sample Values'},
    title: {text: "Bacteria Cultures per Sample"}
    };
  
  // 3. Use Plotly to plot the data with the layout  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });


  // Create a variable that filters the metadata array for an object
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata
    var resultMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(resultMetadata);
    var firstMetadata = resultMetadata[0];
    console.log(firstMetadata);
    // variable for wfreq
    var wfreq = parseFloat(firstMetadata.wfreq);
    console.log(typeof wfreq);
  

    var gaugeData = [
      {
        domain: {x: [0, 10], y: [0,1]},
        value: wfreq,
        title: { text: "Belly Button Washing Frequency"},
        subtitle: { text: "Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red"},
            { range: [2, 4], color: "orange"},
            { range: [4, 6], color: "yellow"},
            { range: [6, 8], color: "greenyellow"},
            { range: [8, 10], color: "green"}
          ],
          bar: {color: "black"}

        }
      }
    ];

    var gaugeLayout = {width: 600, height: 500, margin: {t: 0, b: 0} };

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });

}