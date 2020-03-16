var info_overlay = d3.select("#overlay")
    .append("svg")
    .attr("preserveAspectRatio", "none")
    .attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
info_overlay.append("text")
    .attr("text-anchor", "middle")
    .attr("id", "overlaytext1")
    .attr("class", "overlaytext")
    .text("Your center artwork:")
    .style("font-weight", "bold")
    .style("opacity", 0);
info_overlay.append("text")
    .attr("text-anchor", "middle")
    .attr("id", "overlaytext1b")
    .attr("class", "overlaytext")
    .text("Click to expand")
    .style("opacity", 0);
info_overlay.append("rect")
    .attr("id", "highlight_center")
    .attr("class", "highlight")
    .style("stroke", "white")
    .style("opacity", 0);
info_overlay.append("rect")
    .attr("id", "highlight_middle")
    .attr("class", "highlight")
    .attr("width", middle_width)
    .attr("height", middle_height)
    .attr("x", middle_x)
    .attr("y", middle_y)
    .style("opacity", 0);
info_overlay.append("text")
    .attr("id", "overlaytext2")
    .attr("class", "overlaytext")
    .attr("x", middle_x+10)
    .attr("y", middle_y+25)
    .text("Artworks with visual similarity")
    .style("font-weight", "bold")
    .style("opacity", 0);
info_overlay.append("text")
    .attr("id", "overlaytext3")
    .attr("class", "overlaytext")
    .attr("x", 20)
    .attr("y", 70)
    .text("Exploration area")
    .style("font-weight", "bold")
    .style("opacity", 0);
info_overlay.append("text")
    .attr("id", "overlaytext3b")
    .attr("class", "overlaytext")
    .attr("x", 20)
    .attr("y", 90)
    .text("Click any artwork to make center artwork")
    .style("opacity", 0);
info_overlay.append("text")
    .attr("id", "overlaytext3c")
    .attr("class", "overlaytext")
    .attr("x", 20)
    .attr("y", 110)
    .text("Cluster artworks by dragging")
    .style("opacity", 0);


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