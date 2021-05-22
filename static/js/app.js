// Belly Button Biodiversity - Plotly.js

//##############################################################
// Render initial table load
//#############################################################
function init() {
   // json sample data extracted
    d3.json("static/data/samples.json").then(function (jsonData) {
      var data = jsonData;

      //extract sample number, from dropdown
      var dataNames = data.names; 
      // Reference for dropdown Select element
      var inputDropdown = d3.select("#selDataset");
  
      dataNames.forEach(function (name) {
        inputDropdown.append("option").text(name).property("value", name);
      });
  
      // 1st sample for initial render 
      var selected_id = "940";
      // call function to extract data with id 
      extractdata(selected_id);
    });
  }
  //###############################################################
  // Function for Data extraction from json
  //################################################################
  function extractdata(selected_id) {
    d3.json("static/data/samples.json").then(function (jsonData) {
      var data = jsonData;
      // filter data by id 
      var person_tested = data.samples.filter((val) => val.id == selected_id);   
      var person_selected_data = person_tested[0];
      // Get otu_ids for affecting selected person 
      var otu_ids = person_selected_data.otu_ids;

      // Create list to otu_ids, iterate and push values
      var otu_id_list = [];
      for (i = 0; i < otu_ids.length; i++) {
        otu_id_list.push(`OTU ${otu_ids[i]} `);
      }
  
      var sample_values = person_selected_data.sample_values;
      var otu_labels = person_selected_data.otu_labels;

      // data to fill data table per id
      var person_final_data = data.metadata.filter((val) => val.id == selected_id);
      person_final_data = person_final_data[0];

      // weekly belly wash is 7th data in order, 6th index beginning 0
      // needed for plotting gauge later
      var wfreq = Object.values(person_final_data)[6];
  
      // dictionary to add needed data for plotting
      var results = {
        idStr: otu_id_list,
        ids: otu_ids,
        values: sample_values,
        labels: otu_labels,
      };
      // calling all 4 functions to plot and fill data
      render_data_table(person_final_data);
      bar_chart(results);
      bubble_chart(results);
      // BONUS or OPTIONAL CHART
      gauge_chart(wfreq);

    });
  }
    //##########################################################
    // function to add table data in html with person sample data
    //####################################################
    function render_data_table(person_final_data) {
      var body = document.getElementsByClassName("panel-body")[0];
      var html_table = document.createElement("table");
      html_table.setAttribute("id", "table");
    
      var html_table_body = document.createElement("tbody");
    
      // with final data selected for a person loop for each and send to td and table row 
      Object.entries(person_final_data).forEach(function ([key, value]) {
        var row = document.createElement("tr");

      // variable to get final text line 
        var text_cell = document.createElement("td");
        // append texts for row data
        var key_text = document.createTextNode(`${key}:`);
        var value_text = document.createTextNode(`${value}`);
        // found in documentation interesting way of inserting 2 spaces between in text to make it inteligible
        //https://stackoverflow.com/questions/10951340/create-a-blank-html-space-on-the-fly-javascript
        var blank = document.createTextNode( '\u00A0\u00A0' ) 
        // append values to cell and a double space in between
        text_cell.append(key_text, blank, value_text);  
        row.append(text_cell);
        // send to html body table
        html_table_body.append(row);
      });
    
      html_table.append(html_table_body);
      body.append(html_table);
    }

  //####################################################
  // function to plot BAR
  //####################################################
  function bar_chart(results) {

    // Slice to display the top 10 OTUs found in that individual.
    var otu_ids = results.idStr.slice(0, 10);
    var sample_values = results.values.slice(0, 10);
    var otu_labels = results.labels.slice(0, 10);
  

    // list for colors separated 10 colors for maximum 10 OTUs
    var colors = ["red", "orange", "yellow","lightgreen","yellowgreen","green",
    "lightblue","turquoise","blue","navy"];
  
    var trace = {
      x: sample_values,
      y: otu_ids,
      marker: {
        color: colors,
        line: {
          width: 1,
        },
      },
      // horizontal bar type
      orientation: "h",
      type: "bar",
    };
  
    var plotdata = [trace];
  
    var layout = {
      hoverinfo: otu_labels,
      title: {
        text: "<b> Top 10 microbial species <br>by person's belly button</b>",
        font: {
          size: 18,
          xanchor: "left",
          yanchor: "top",
        },
      },
      autosize: false,
      width: 400,
      height: 470,
      margin: {
        l: 100,
        r: 0,
        b: 100,
        t: 70,
        pad: 4,
      },
      yaxis: {
        autorange: "reversed",
        automargin: true,
        font: {
           family: "Helvetica",
        },
        tickfont: {
          size: 14,
        },
      },
      xaxis: {
        title: {
          text: "<b>OTU = Microbial Species</b>",
          font: {
             family: "Helvetica",
            size: 16,
          },
        },
        tickfont: {
          size: 15,
        },
      },
    };
  // Plot horizontal bar chart
    Plotly.newPlot("bar", plotdata, layout);
  }
  
  //####################################################
  // function to plot BUBBLE CHART
  //####################################################
  function bubble_chart(results) {
    var otu_ids = results.ids;
    var sample_values = results.values;
    var otu_labels = results.labels;
  
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      text: otu_labels,
      marker: {
        // weight of markers according size 
        size: sample_values,
        // color fading according to bubble weights or ids
        color: otu_ids,
        // color: sample_values,
      },
    };
  
    var data = [trace1];
  
    var layout = {
      title: "<b>Bacteria Cultures per Sample</b>",
      xaxis: {
        title: {
          text: 'Operational Taxonomic Units - OTU IDs',
          font: { family: 'Helvetica',
            size: 25,
            color: 'navy'}
        },
      },
      yaxis: {
        title: {
          text: 'Sample # of results',
          font: {
            family: 'Helvetica',
            size: 25,
            color: 'navy'
          },
        },
      },
      font: {
        //
        family: "Helvetica",
        size: 18,
      },
      showlegend: false,
      height: 600,
      width: 1200,
    };
  // Plot bubble chart
    Plotly.newPlot("bubble", data, layout);
  }
  
  //####################################################
  // function to plot optional GAUGE BONUS
  //####################################################
 // pass as parameter to function number of weekly belly button washes
  function gauge_chart(wfreq) {
    var data = [
      {
        value: wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        font: {size: 18}, 
      
      },
        type: "indicator",
        // special type of gauge that includes frequency in center
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9], tickwidth: 3, tickcolor: "navy",
          // interval btw ticks
          dtick: 1,
          // initial tick
          tick0: 0,
          //max number of ticks
          nticks: 10,
        },
          steps: [
            // Color palette for gauge according to results
            { range: [0, 1], color: "#ffecb3" },
            { range: [1, 2], color: "#ffe082" },
            { range: [2, 3], color: "#ffd54f" },
            { range: [3, 4], color: "#ffca28" },
            { range: [4, 5], color: "#ffc107" },
            { range: [5, 6], color: "#ffb300" },
            { range: [6, 7], color: "#ffa000" },
            { range: [7, 8], color: "#ff8f00" },
            { range: [8, 9], color: "#ff6f00" },
          ],
          // inputs for crossing line marker threshold
          threshold: {
            line: { color: "purple", width: 8 },
            value: wfreq,
          },
        },
      },
    ];
  // gauge size
    var layout = { 
      width: 450, 
      height: 500,
      font: {size: 15},
      margin: {
        l: 100,
        r: 20,
        b: 0,
        t: 10,
        pad: 10,
      }, 
    };
    // Plot horizontal gauge chart
    Plotly.newPlot("gauge", data, layout);
  }

  // Call function to render initial table load
  init();

   // Call function in case of change value in dropdown 
  d3.selectAll("#selDataset").on("change", new_person_sample);
  
  // Function to get new data after change of subject after dropdown change
  function new_person_sample() {
    var selected_id = d3.select("#selDataset").node().value;
    // clean html table to refill
    d3.selectAll("#table").remove();
    // extract data with new selected person_id
    extractdata(selected_id);
  }