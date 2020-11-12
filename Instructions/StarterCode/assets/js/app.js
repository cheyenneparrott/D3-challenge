// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);




// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(healthcareData, err) {
    if (err) throw err;
  
    // parse data
    healthcareData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
  
    // Create x scale function
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthcareData, d => d.poverty), d3.max(healthcareData, d => d.poverty)])
      .range([0,width]);
    
      //create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(healthcareData, d => d.healthcare), d3.max(healthcareData, d => d.healthcare)])
      .range([height, 0]);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    chartGroup.append("g")
      .call(leftAxis);




// append initial circles
var circlesGroup = chartGroup.selectAll("circle")
.data(healthcareData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 15)
// .style("fill-color", "purple")
.attr("fill", "deepgreen")
.attr("opacity", ".5")
.classed("stateCircle", true);

// Appending text inside the circle
chartGroup.selectAll().data(healthcareData).enter().append("text")
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("font-size", "10px")
.style("fill", "black")
.text(d => d.abbr)
.classed("stateText", true);

// var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.poverty}<br>${d.healthcare}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

// });


// Creating x-axis labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("x", 0-(height / 2))
.attr("y", 0-margin.left)
.attr("dy", "1em")
.attr("class", "axisText")
.text("Poverty (%)");

// append y axis
chartGroup.append("text")
.attr("transform", `translate (${width / 2}, ${height + 40})`)
.classed("axis-text", true)
.text("Lacks Healthcare (%)");
})

.catch(function (err){
    console.log(err)

    
});


