// buttons
var button_svg = svg.append('svg')
    .attr('width', svgwidth / 4)
    .attr('height', 50)
    .attr("x", 0)
    .attr("y", 00)

var button_size = 40;

var menubutton = button_svg.append("g")
    .datum({position: [0, 0], height: 35, width: 55})
    .attr("transform", d => "translate(" + d.position + ")");

var menubutton_circle;
menubutton.append("circle")
    .attr("class", "button")
    .attr("id", "menu_button")
    .attr("cx", button_size / 2)
    .attr("cy", button_size / 2)
    .attr("r", button_size / 2)
    .style('opacity', 0)
        .on("mouseover", function(){
            menubutton_circle = this;

            d3.select(this).style('opacity', 0.3)
            timer_tooltip = setTimeout(function () {
                tooltip_buttons.html("Open menu")
                return tooltip_buttons.style("visibility", "visible");
            }, time_till_tooltip_appearance);
        })
        .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+20)+"px");})
        .on("mouseout", function(){
            d3.select(this).style('opacity', 0)
            clearTimeout(timer_tooltip);
            return tooltip_buttons.style("visibility", "hidden");
        });;

menubutton.append("image")
	.attr("href", "static/icons/" + 'menu.png')
    .attr("id", "menu_button_icon")
    .attr("class", "button")
	.attr("height", button_size / 2)
    .attr("width", button_size / 2)
    .attr("x", button_size / 4)
    .attr("y", button_size / 4)
	.attr("clip-path", "url(#clip)")
    .style('opacity', 1)
    .on("mouseover", function(){
        d3.select(menubutton_circle).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
                tooltip_buttons.html("Open menu")
                return tooltip_buttons.style("visibility", "visible");
            }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+20)+"px");})
    .on("mouseout", function(){
        d3.select(menubutton_circle).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

menubutton.on('click', function() {
    // open the encapsolated menu bar
    openNav()

});

var randomizebutton = button_svg.append("g")
    .datum({position: [0, 0], height: 35, width: 55})
    .attr("transform", d => "translate(" + d.position + ")");

var randomizebutton_circle;
randomizebutton.append("circle")
    .attr("class", "button")
    .attr("cx", button_size / 2 + button_size / 1.2)
    .attr("cy", button_size / 2)
    .attr("r", button_size / 2)
    .style('opacity', 0)
        .on("mouseover", function(){
            randomizebutton_circle = this;
            d3.select(this).style('opacity', 0.3)
            timer_tooltip = setTimeout(function () {
                tooltip_buttons.html("Randomize exploration area")
                return tooltip_buttons.style("visibility", "visible");
            }, time_till_tooltip_appearance);
        })
        .on("mousemove", function(){
            return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+20)+"px");})
        .on("mouseout", function(){
            d3.select(this).style('opacity', 0)
            clearTimeout(timer_tooltip);
            return tooltip_buttons.style("visibility", "hidden");
        });;

randomizebutton.append("image")
    .attr("class", "button")
	.attr("href", "static/icons/" + 'shuffle.png')
	.attr("height", button_size / 2.3)
    .attr("width", button_size / 2.3)
    .attr("x", button_size / 3.4 + button_size / 1.2)
    .attr("y", button_size / 3.4)
	.attr("clip-path", "url(#clip)")
    .style('opacity', 1)
    .on("mouseover", function(){
        d3.select(randomizebutton_circle).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
        tooltip_buttons.html("Randomize exploration area")
        return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+20)+"px");})
    .on("mouseout", function(){
        d3.select(randomizebutton_circle).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });;

randomizebutton.on('click', function() {
    // randomize all outside images
    change_dissimilar_images()
});

var undo_button_circle;
var undo_button = button_svg.append("g");
undo_button.append("circle")
    .attr("class", "button")
    .attr("cx", button_size / 2 + button_size / 1.2 + button_size / 1.2)
    .attr("cy", button_size / 2)
    .attr("r", button_size / 2)
    .style('opacity', 0)
    .on("mouseover", function(){
        undo_button_circle = this;
        d3.select(this).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Undo similarity area")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(){
        d3.select(this).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

undo_button.append("image")
    .attr("class", "button")
	.attr("href", "static/icons/" + 'undo.png')
	.attr("height", button_size / 2.3)
    .attr("width", button_size / 2.3)
    .attr("x", button_size / 3.4 + button_size / 1.2 + button_size / 1.2)
    .attr("y", button_size / 3.4)
	.attr("clip-path", "url(#clip)")
    .style('opacity', 1)
    .on("mouseover", function(){
        d3.select(undo_button_circle).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Undo similarity area")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(){
        d3.select(undo_button_circle).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

var redo_button_circle;
var redo_button = button_svg.append("g");
redo_button.append("circle")
    .attr("class", "button")
    .attr("cx", button_size / 1.2 + button_size / 2 + button_size / 1.2 + button_size / 1.2)
    .attr('cy', button_size / 2)
    .attr("r", button_size / 2)
    .style('opacity', 0)
    .on("mouseover", function(d){
        redo_button_circle = this;
        d3.select(this).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Redo similarity area")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        d3.select(this).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

redo_button.append("image")
    .attr("class", "button")
	.attr("href", "static/icons/" + 'redo.png')
	.attr("height", button_size / 2.3)
    .attr("width", button_size / 2.3)
    .attr("x", button_size / 1.2 + button_size / 3.4 + button_size / 1.2 + button_size / 1.2)
    .attr('y', button_size / 3.4)
	.attr("clip-path", "url(#clip)")
    .style('opacity', 1)
    .on("mouseover", function(){
        d3.select(redo_button_circle).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Redo similarity area")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(){
        d3.select(redo_button_circle).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

var info_overlay = d3.select("#overlay")
    .append("svg")
    .attr("preserveAspectRatio", "none")
    .attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
info_overlay.append("text")
    .attr("text-anchor", "middle")
    .attr("id", "overlaytext1")
    .attr("class", "overlaytext")
    .text("Your center painting:")
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
    .text("Paintings with visual similarity")
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
    .text("Click any painting to make center painting")
    .style("opacity", 0);
info_overlay.append("text")
    .attr("id", "overlaytext3c")
    .attr("class", "overlaytext")
    .attr("x", 20)
    .attr("y", 110)
    .text("Cluster images by dragging")
    .style("opacity", 0);

var info_button_circle;
var info_button = button_svg.append("g")
info_button.append("circle")
    .attr("class", "button")
    .attr("cx", button_size / 1.2 + button_size / 2 + button_size / 1.2 + button_size / 1.2 + button_size / 1.2)
    .attr('cy', button_size / 2)
    .attr("r", button_size / 2)
    .style('opacity', 0)
    .on("mouseover", function(d){
        info_button_circle = this;
        d3.select(this).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Help")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        d3.select(this).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

info_button.append("image")
    .attr("class", "button")
    .attr("href", "static/icons/" + 'help.png')
    .attr("height", button_size / 1.6)
    .attr("width", button_size / 1.6)
    .attr("x", button_size / 1.2 + button_size / 4.9 + button_size / 1.2 + button_size / 1.2 + button_size / 1.2)
    .attr('y', button_size / 4.9)
    .attr("clip-path", "url(#clip)")
    .style('opacity', 1)
    .on("mouseover", function(){
        d3.select(info_button_circle).style('opacity', 0.3)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Help")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(){
        d3.select(info_button_circle).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

undo_button.on('click', function() {
    undo();
});
redo_button.on('click', function() {
    redo()
});
info_button.on('click', function() {
    info_on()
});