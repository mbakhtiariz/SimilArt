var info_overlay = d3.select("#overlay")
    .append("svg")
    .attr("preserveAspectRatio", "none")
    .attr("viewBox", "0 0 " + svgwidth + " " + svgheight + 100)
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
    .text("CTRL+Click to expand")
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
info_overlay.append("rect")
    .attr("id", "highlight_filter")
    .attr("class", "highlight")
    .attr("width", svgwidth)
    .attr("height", 140)
    .attr("x", 0)
    .attr("y", svgheight-40)
    // .style("border-bottom", "none")
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
    .attr("id", "overlaytext2b")
    .attr("class", "overlaytext")
    .attr("x", middle_x+10)
    .attr("y", middle_y+45)
    .text("Color indicates similarity to center artwork")
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
info_overlay.append("text")
    .attr("text-anchor", "middle")
    .attr("id", "overlaytext4")
    .attr("class", "overlaytext")
    .attr("x", middle_x+middle_width*0.5)
    .attr("y", svgheight-15)
    .text("Filter your artworks here")
    .style("font-weight", "bold")
    .style("opacity", 0)
info_overlay.append("rect")
    .attr("class", "highlight")
    .attr("id","similarity_color")
    .attr("width", middle_width)
    .attr("height", middle_height/30)
    .attr("x", middle_x)
    .attr("y", middle_y + middle_height + 5)
    .style("fill","url(#linear-gradient)")
info_overlay.append("text")
    .attr("id", "overlaytext5")
    .attr("class", "overlaytext")
    .attr("x", middle_x - 60)
    .attr("y", middle_y + middle_height +  middle_height/10 + 5)
    .text("Lowest similarity")
    .style("opacity", 0)
info_overlay.append("text")
    .attr("id", "overlaytext6")
    .attr("class", "overlaytext")
    .attr("x", middle_x + middle_width -60)
    .attr("y", middle_y + middle_height +  middle_height/10 + 5)
    .text("Highest similarity")
    .style("opacity", 0);


//Append a defs (for definition) element to your SVG
var defs = svg.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");
linearGradient
.attr("x1", "0%")
.attr("y1", "100%")
.attr("x2", "100%")
.attr("y2", "100%");
 

var rgb_0 = colourGradientor(0, stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_1 = colourGradientor(0.125, stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_2 = colourGradientor(0.25,stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_3 = colourGradientor(0.5,stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_4 = colourGradientor(0.75,stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_5 = colourGradientor(0.825, stroke_color_images_high_similarity, stroke_color_images_low_similarity);
var rgb_6 = colourGradientor(1,stroke_color_images_high_similarity, stroke_color_images_low_similarity);

var hexColor_0 =  "#" + ((1 << 24) + (rgb_0[0] << 16) + (rgb_0[1] << 8) + rgb_0[2]).toString(16).slice(1);
var hexColor_1 =  "#" + ((1 << 24) + (rgb_1[0] << 16) + (rgb_1[1] << 8) + rgb_1[2]).toString(16).slice(1);
var hexColor_2 =  "#" + ((1 << 24) + (rgb_2[0] << 16) + (rgb_2[1] << 8) + rgb_2[2]).toString(16).slice(1);
var hexColor_3 =  "#" + ((1 << 24) + (rgb_3[0] << 16) + (rgb_3[1] << 8) + rgb_3[2]).toString(16).slice(1);
var hexColor_4 =  "#" + ((1 << 24) + (rgb_4[0] << 16) + (rgb_4[1] << 8) + rgb_4[2]).toString(16).slice(1);
var hexColor_5 =  "#" + ((1 << 24) + (rgb_5[0] << 16) + (rgb_5[1] << 8) + rgb_5[2]).toString(16).slice(1);
var hexColor_6 =  "#" + ((1 << 24) + (rgb_6[0] << 16) + (rgb_6[1] << 8) + rgb_6[2]).toString(16).slice(1);

//Set the color for the start (0%)
linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", hexColor_0); 

linearGradient.append("stop")
    .attr("offset", "12%")
    .attr("stop-color",hexColor_1);

linearGradient.append("stop")
    .attr("offset", "25%")
    .attr("stop-color",hexColor_2);

linearGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color",hexColor_3);

//Set the color for the end (100%)
linearGradient.append("stop")
    .attr("offset", "75%")
    .attr("stop-color",hexColor_4);

linearGradient.append("stop")
    .attr("offset", "82%")
    .attr("stop-color",hexColor_5);

//Set the color for the end (100%)
linearGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color",hexColor_6);


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
    d3.select("#highlight_filter")
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
    d3.select("#overlaytext2b")
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
    d3.select("#overlaytext4")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1)
    d3.select("#overlaytext5")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1)
    d3.select("#overlaytext6")
        .transition()
        .duration(overlay_transition_speed)
        .style("opacity", 1);;
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
    d3.select("#overlaytext2b")
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
    d3.select("#overlaytext4")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext5")
        .transition()
        .style("opacity", 0);
    d3.select("#overlaytext6")
        .transition()
        .style("opacity", 0);
    d3.select("#highlight_middle")
        .transition()
        .style("opacity", 0);
    d3.select("#highlight_center")
        .transition()
        .style("opacity", 0);
    d3.select("#highlight_filter")
        .transition()
        .style("opacity", 0);
}