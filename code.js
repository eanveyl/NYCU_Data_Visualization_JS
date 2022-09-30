
// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
        //width = 460 - margin.left - margin.right,
        //height = 400 - margin.top - margin.bottom;
        width = 760 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data, originally at "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
//Try 2 working at "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
d3.csv("http://vis.lab.djosix.com:2020/data/iris.csv").then( function(data) {

    // Declare X axis (but not add it to the graph yet!)
    const x = d3.scaleLinear()
        .domain([0, 8])
        .range([ 0, width]);
    

    // Declare X axis (but not add it to the graph yet!)
    const y = d3.scaleLinear()
        .domain([0, 9])
        .range([ height, 0]);
    
    //Populate dropdown menus
    var all_axis = ["sepal width", "sepal length", "petal length", "petal width"]
    d3.select("#x_select_button")
        .selectAll('myOptions')
            .data(all_axis)
        .enter()
            .append('option')
        .text(function (d) {return d;}) //text showed in the menu
        .attr("value", function (d) {return d;}) //corresponding value returned
    d3.select("#y_select_button")
        .selectAll("myOptions")
            .data(all_axis)
        .enter()
            .append("option")
        .text(function (d) {return d;}) //text showed in the menu
        .attr("value", function (d) {return d;}) //corresponding value returned)

    // Color scale
    const color_strong_shade = d3.scaleOrdinal()
        .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
        .range(["#e6c10b", "#19c29a", "#bc19c2"])
    
    const color_light_shade = d3.scaleOrdinal()
        .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
        .range(["#eddc8a", "#82c2b3", "#c082c2"])

    //Function called for highlighting the selected (onhover) species
    var highlight = function(d){
        console.log("Log: user selected species: " + d3.select(this).attr("id"))
        
        try {
        d3.selectAll(".dot")
            .transition()
            .duration(50)
            .style("fill", function (d) {return color_light_shade(d.class)})
            .attr("r", 3)

            d3.selectAll("#"+d3.select(this).attr('id'))
            .transition()
            .duration(50)
            .attr("r", 4)
            .style("fill", function (d) {return color_strong_shade(d.class)})
        }
        catch(err) {
            console.log("Log: a point was highlighted and caused an error")
        }
        

    }

    var remove_highlight = function(){
        d3.selectAll(".dot")
            .transition()
            .duration(50)
            .style("fill", function (d) {return color_light_shade(d.class)})
            .attr("r", 3)

    }

    //Initialize default axis choice
    var chosen_x_axis = "sepal width"; //TODO change to match local csv file and not remote file
    var chosen_y_axis = "sepal width";  //TODO change to match local csv file and not remote file

    // Add the graph
    function draw_graph() {
        //Add axis
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        //Add axis
        svg.append("g")
            .call(d3.axisLeft(y));

        //Add axis labels
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", 0.5*width)
            .attr("y", height + 26)
            .text(chosen_x_axis);

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("y", -32)
            .attr("x", -0.5*height)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(chosen_y_axis);

        //Draw dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("class", function (d) {return "dot"}) //TODO: change to match local csv file and not remote file
                .attr("id", function (d) {return d.class})
                .attr("cx", function (d) { return x(d[chosen_x_axis]); } ) //TODO: change to match local csv file and not remote file
                .attr("cy", function (d) { return y(d[chosen_y_axis]); } ) //TODO: change to match local csv file and not remote file
                .attr("r", 4)
                .style("fill", function (d) {return color_light_shade(d.class)}) //TODO: change to match local csv file and not remote file
            .on("mouseover", highlight)
            .on("mouseleave", remove_highlight)

        //Add legend
        var keys = ["Iris-setosa", "Iris-versicolor", "Iris-virginica"]
        svg.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
                .attr("cx", 590)
                .attr("cy", function(d,i){return 38 + i*25})
                .attr("r", 6)
                .style("fill", function(d){return color_light_shade(d)})
        
        svg.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
                .attr("x", 600)//function(d,i){return 30 + i*60})
                .attr("y", function(d,i){return 40 + i*25})
                .style("fill", function(d){return color_light_shade(d)})
                .text(function(d) {return d})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")



        d3.selectAll('.dot').each(function() {
            console.log("Log: created instance of circle for species: " + d3.select(this).attr('id')); // Logs the id attribute.
        });
        console.log("Log: graph drawn!")
    }
    draw_graph()

    function update_graph(selected_x, selected_y) {
        chosen_x_axis = selected_x;
        chosen_y_axis = selected_y;
        console.log("Log: drawing a new graph")
        svg.selectAll("*").remove()
        draw_graph()
    }

    d3.select("#x_select_button").on("change", function (event,d) {
        const selectedOption = d3.select(this).property("value")
        update_graph(selectedOption, chosen_y_axis)
    })

    d3.select("#y_select_button").on("change", function (event,d) {
        const selectedOption = d3.select(this).property("value")
        update_graph(chosen_x_axis, selectedOption)
    })





})