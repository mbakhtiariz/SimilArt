function info_on() {
    const center_x = parseFloat(d3.select("image#center").attr("x"))
    const center_y = parseFloat(d3.select("image#center").attr("y"))
    const center_width = parseFloat(d3.select("image#center").attr("width"))
    const center_height = parseFloat(d3.select("image#center").attr("height"))
    document.getElementById("overlay").style.display = "block";
    d3.select("#highlight_center")
        .attr("width", center_width)
        .attr("height", center_height)
        .attr("x", middle_x + center_x)
        .attr("y", middle_y + center_y)
        .transition()
        .style("opacity", 1);
    d3.select("#highlight_middle")
        .transition()
        .style("opacity", 1);
    d3.select("#overlaytext1")
        .attr("x", middle_x + center_x + 0.5*center_width)
        .attr("y", middle_y + center_y + 0.5*center_height)
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
    d3.select("#overlaytext1b")
        .attr("x", middle_x + center_x + 0.5*center_width)
        .attr("y", middle_y + center_y + 0.5*center_height + 30)
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
    d3.select("#overlaytext2")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
    d3.select("#overlaytext3")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
    d3.select("#overlaytext3b")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
    d3.select("#overlaytext3c")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);
}
function info_off() {
    document.getElementById("overlay").style.display = "none";
    d3.select("#overlaytext1")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext1b")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext2")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext3")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext3b")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext3c")
        .transition()
        .style("opacity", 0);
    d3.select("#highlight_middle")
        .transition()
        .style("opacity", 0);
    d3.select("#highlight_center")
        .transition()
        .style("opacity", 0);
}