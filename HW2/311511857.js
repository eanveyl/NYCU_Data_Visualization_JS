
// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 30, left: 60},
        //width = 460 - margin.left - margin.right,
        //height = 400 - margin.top - margin.bottom;
        width = 760 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;


// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("http://vis.lab.djosix.com:2020/data/iris.csv").then( function(data) {

  // Color scale: give me a specie name, I return a color
  const color = d3.scaleOrdinal()
    .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica" ])
    .range(["#e6c10b", "#19c29a", "#bc19c2"])

  //Initialize default axis choice
  var chosen_x1_axis = "sepal width"
  var chosen_x2_axis = "sepal length"
  var chosen_x3_axis = "petal length"
  var chosen_x4_axis = "petal width"

  //Populate dropdown menus
  var all_axis = ["sepal width", "sepal length", "petal length", "petal width"]
  d3.select("#x1_select_button")
      .selectAll('myOptions')
          .data(all_axis)
      .enter()
          .append('option')
      .text(function (d) {return d;}) //text showed in the menu
      .attr("value", function (d) {return d;}) //corresponding value returned
  
  d3.select("#x2_select_button")
      .selectAll('myOptions')
          .data(all_axis)
      .enter()
          .append('option')
      .text(function (d) {return d;}) //text showed in the menu
      .attr("value", function (d) {return d;}) //corresponding value returned

  d3.select("#x3_select_button")
      .selectAll('myOptions')
          .data(all_axis)
      .enter()
          .append('option')
      .text(function (d) {return d;}) //text showed in the menu
      .attr("value", function (d) {return d;}) //corresponding value returned

  d3.select("#x4_select_button")
      .selectAll('myOptions')
          .data(all_axis)
      .enter()
          .append('option')
      .text(function (d) {return d;}) //text showed in the menu
      .attr("value", function (d) {return d;}) //corresponding value returned

  // Highlight the specie that is hovered
  const highlight = function(event, d){

    selected_specie = d.class

    // first every group turns grey
    d3.selectAll(".line")
      .transition().duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + selected_specie)
      .transition().duration(200)
      .style("stroke", color(selected_specie))
      .style("opacity", "1")
  }

  // Unhighlight
  const doNotHighlight = function(event, d){
    d3.selectAll(".line")
      .transition().duration(200).delay(1000)
      .style("stroke", function(d){ return( color(d.class))} )
      .style("opacity", "1")
  }

  

  
  
  function draw_graph() {
    // Here I set the list of dimension manually to control the order of axis:
    //dimensions = ["sepal width", "sepal length", "petal length", "petal width"]
    dimensions = [chosen_x1_axis, chosen_x2_axis, chosen_x3_axis, chosen_x4_axis]
    console.log(chosen_x1_axis)
    console.log(chosen_x2_axis)
    console.log(chosen_x3_axis)
    console.log(chosen_x4_axis)

    // For each dimension, I build a linear scale. I store all in a y object
    const y = {}
    for (i in dimensions) {
      //name = dimensions[i]
      y[dimensions[i]] = d3.scaleLinear()
        .domain( [0,8] ) // --> Same axis range for each group
        // --> different axis range for each group --> .domain( [d3.extent(data, function(d) { return +d[name]; })] )
        .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
      .range([0, width])
      .domain(dimensions);  

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { 
          //console.log([x(p), y[p](d[p])])
          return [x(p), y[p](d[p])]; 
        }));
    }

    // Draw the lines
    svg
      .selectAll("myPath")
      .data(data)
      .join("path")
        .attr("class", function (d) { return "line " + d.class } ) // 2 class for each line: 'line' and the group name
        .attr("d",  path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( color(d.class))} )
        .style("opacity", 0.5)
        .on("mouseover", highlight)
        .on("mouseleave", doNotHighlight )

      console.log("building the axis")
    // Draw the axis:
    svg.selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(dimensions).enter()
      .append("g")
      .attr("class", "axis")
      // I translate this element to its right position on the x axis
      .attr("transform", function(d) { return `translate(${x(d)})`})
      // And I build the axis with the call function
      .each(function(d) { 
        console.log(y[d])
        d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
      // Add axis title
      .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; })
        .style("fill", "black")

  }
  draw_graph()
  
  function update_graph(selected_x1, selected_x2, selected_x3, selected_x4) {
    chosen_x1_axis = selected_x1;
    chosen_x2_axis = selected_x2;
    chosen_x3_axis = selected_x3;
    chosen_x4_axis = selected_x4;
    console.log("Log: drawing a new graph")
    svg.selectAll("*").remove()
    draw_graph()
  }

  d3.select("#x1_select_button").on("change", function (event,d) {
    const selectedOption = d3.select(this).property("value")
    update_graph(selectedOption, chosen_x2_axis, chosen_x3_axis, chosen_x4_axis)
  })

  d3.select("#x2_select_button").on("change", function (event,d) {
    const selectedOption = d3.select(this).property("value")
    update_graph(chosen_x1_axis, selectedOption, chosen_x3_axis, chosen_x4_axis)
  })
  d3.select("#x3_select_button").on("change", function (event,d) {
    const selectedOption = d3.select(this).property("value")
    update_graph(chosen_x1_axis, chosen_x2_axis, selectedOption, chosen_x4_axis)
  })

  d3.select("#x4_select_button").on("change", function (event,d) {
    const selectedOption = d3.select(this).property("value")
    update_graph(chosen_x1_axis, chosen_x2_axis, chosen_x3_axis, selectedOption)
  })
})
