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
    var allSamples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var samplenumber = allsamples.filter(sampleObject => parseInt(sampleObject.id) == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = samplenumber[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sample_value.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      orientation: "h"
    };
    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      plot_bgcolor:"lightblue",
      paper_bgcolor:"lightblue",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Deliverable 2 
 // 1. Create the trace for the bubble chart.
 var trace = {
  x: otu_id,
  y: sample_value,
  text: otu_label,
  mode: 'markers', 
  marker: {
    size: sample_value,
    colorscale: 'Earth',
    color: otu_id

  }
};
 var bubbleData = [
   
];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  xaxis:{title: "OTU ID"},
  title: "Bacteria Cultures per Sample",
  plot_bgcolor:"lightblue",
  paper_bgcolor:"lightblue",
  hovermode:'closest'  
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout);
});
}

//Deliverable 3
  
    // 4. Create the trace for the gauge chart.
    var trace = {
      domain: {x: [0, 1], y: [0, 1]},
      value: wfreq,
      title: { text: "Belly Button Washing Frequency"},
      type: "indicator",
      mode: "gauge+number"
    }
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      paper_bgcolor: "lightblue",
      width: 450, height: 320, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}