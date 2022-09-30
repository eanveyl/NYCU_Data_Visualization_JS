
// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data, originally at "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv").then( function(data) {

    // Add X axis
    const x = d3.scaleLinear()
        .domain([4, 8])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 9])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Color scale
    const color_strong_shade = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range(["#e6c10b", "#19c29a", "#bc19c2"])
    
    const color_light_shade = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range(["#eddc8a", "#82c2b3", "#c082c2"])

    var highlight = function(d){
        console.log("Log: user selected species: " + d3.select(this).attr("id"))

        d3.selectAll(".dot")
            .transition()
            .duration(50)
            .style("fill", function (d) {return color_light_shade(d.Species)})
            .attr("r", 4)

        d3.selectAll("#"+d3.select(this).attr('id'))
            .transition()
            .duration(50)
            .attr("r", 6)
            .style("fill", function (d) {return color_strong_shade(d.Species)})

    }

    var remove_highlight = function(){
        d3.selectAll(".dot")
            .transition()
            .duration(50)
            .style("fill", function (d) {return color_light_shade(d.Species)})
            .attr("r", 4)

    }


    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", function (d) {return "dot"}) //TODO: change to match local csv file and not remote file
            .attr("id", function (d) {return d.Species})
            .attr("cx", function (d) { return x(d.Sepal_Length); } ) //TODO: change to match local csv file and not remote file
            .attr("cy", function (d) { return y(d.Sepal_Width); } ) //TODO: change to match local csv file and not remote file
            .attr("r", 4)
            .style("fill", function (d) {return color_light_shade(d.Species)}) //TODO: change to match local csv file and not remote file
        .on("mouseover", highlight)
        .on("mouseleave", remove_highlight)

    d3.selectAll('.dot').each(function() {
        console.log("Log: created instance of circle for species: " + d3.select(this).attr('id')); // Logs the id attribute.
    });

    function choose_x_axis(choiceX) {
        
    }

})