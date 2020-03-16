// tooltip
var tooltip = d3.select("#container")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style('color', 'black')
    .style("visibility", "hidden");

// tooltip buttons
var tooltip_buttons = d3.select("#container")
    .append("div")
    .attr("id", "tooltip_buttons")
    .style("position", "absolute")
    .style("z-index", "10")
    .style('color', 'black')
    .style("visibility", "hidden");