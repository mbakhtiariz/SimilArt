function appendDraggableImage(url, position, artwork_name, artist_full_name,
		similarity, creation_year, transition=true) {
	var img = new Image();
	img.onload = function () {
		appendImageHelper(url, position, img, artwork_name, artist_full_name,
			similarity, creation_year, transition);
	}
	img.src = url;
}

function appendImageHelper(url, position, img, artwork_name, artist_full_name,
		similarity, creation_year, transition=true) {
	img_width = img.width;
	img_height = img.height;
	var ratio = img_width / img_height;
	// If image width > height
	if (ratio > 1) {
		img_width = dissimilar_image_size;
		img_height = dissimilar_image_size / ratio;
	// If image height > width
	} else {
		img_width = dissimilar_image_size * ratio;
		img_height = dissimilar_image_size;
	};

	var imageGroup = svg.append("g")
		.datum({position: position, height: img_height, width: img_width})
		.attr('id', 'outside_image')
		.attr("transform", d => "translate(" + d.position + ")");

	var imageElem = imageGroup.append("image")
		.attr("href", url)
		.attr("height", img_height)
		.attr("width", img_width)
		.attr("clip-path", "url(#clip)");

	var rectFill = imageGroup.append("rect")
		.attr("width", img_width)
		.attr("height", img_height)
		.attr("filter", "url(#glow)")
		.on('click', function() {
			var modalImg = document.getElementById("img01");
			modalImg.src = data[imageElem.attr('href').replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];

            // change middle_image variable and call function, both from test.html;
			middle_image = img.src.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
            d3.select('image#center').transition()
				.duration(removal_transition_speed_middle_image)
				.style('opacity', 0)
				.remove();
        	set_center(center, middle_image);
			handle_stacks();
			change_similar_images();
		})
		.on("mouseover", function(d){
			timer_tooltip = setTimeout(function () {
        	tooltip.html(artwork_name + ".<br/><br/>" + 
        		artist_full_name + " (" + creation_year + ").<br/><br/>" +
				"<em>Similarity:</em> &nbsp" + similarity + "%");
			return tooltip.style("visibility", "visible");
			}, time_till_tooltip_appearance);
		})
		.on("mousemove", function(d){
			var tX = event.pageX
			var tY = event.pageY
			var bBox = svg.node().getBBox();
			var theight = parseFloat(tooltip.style("height"))
			var twidth = parseFloat(tooltip.style("width"))
            tooltip.style("top", function() {
            	if (tY+10+theight > bBox.height) {
            		return bBox.height-theight+"px";
            	} else if (tY-10 < 0) {
            		return tY;
            	} else {
            		return tY-10+"px"
            	}
            })
            tooltip.style("left", function(){
            	if (tX+20+twidth > bBox.width) {
            		return bBox.width-twidth+"px";
            	} else {
            		return tX+20+"px"
            	}
            }) 
        })
		.on("mouseout", function(d){
			clearTimeout(timer_tooltip);
			return tooltip.style("visibility", "hidden");});

	var rectOutline = imageGroup.append("rect")
		.attr("class", "image-outline")
		.attr("width", img_width)
		.attr("height", img_height);
	
	imageGroup.call(
		d3.drag()
		.on("drag", dragged)
	);
	
	if (transition) {
	imageGroup
        .style('opacity', 0)
        .transition()
	    .duration(appearance_transition_speed)
        .style("opacity", 1);
    };
}

function dragged(d) {
	d3.select(this).raise();
	var height = d.height;
	var width = d.width;
	var newX = d3.event.x - width * 0.5,
		newY = d3.event.y - height * 0.5;

	xborder = d3.event.x
	if (xborder + width*0.5  > svgwidth ){
		newX = svgwidth - width
	} else if (xborder - width*0.5  < 0){
		newX = 0
	}

	yborder = d3.event.y
	if (yborder + height*0.5  > svgheight) {
		newY = svgheight - height
	} else if (yborder - height*0.5  < 0){
		newY = 0
	}
	// console.log(xborder)
	// Middle area
	middle_w = +middle.attr("width")
	middle_x = +middle.attr("x")
	middle_y = +middle.attr("y")
	middle_h = +middle.attr("height")

	// Left border
	if ((xborder + width*0.5  > middle_x) && (xborder - width*0.5  < (middle_x-5))) {
		if ((yborder - height*0.5 < (365)) && (yborder + height*0.5 > middle_y)) {
			newX = middle_x - width
		}
	}
	// Right border
	else if ((xborder - width*0.5 < (middle_w+middle_x)) && (xborder + width*0.5  > middle_x+middle_w+5)) {
		if ((yborder - height*0.5 < (middle_y+middle_h)) && (yborder + height*0.5 > middle_y)) {
			newX = middle_x+middle_w
		}
	}
	// Top border
	else if ((yborder + height*0.5  > middle_y) && (yborder - height*0.5 < (svgheight/2))) {
		if ((xborder + width*0.5 > middle.attr("x") && (xborder - width*0.5 < middle_x+middle_w))) {
			newY = middle_y - height
		}
	}
	// Bottom border
	else if ((yborder - height*0.5  < (middle_y+middle_h)) && (yborder + height*0.5 > (svgheight/2)))  {
		if ((xborder + width*0.5 > middle_x) && (xborder - width*0.5 < (middle_x+middle_w))) {
			newY = (middle_y+middle_h)
		}
	}

	d3.select(this)
		.attr("transform", "translate(" + (d.position = [newX, newY]) + ")");

	d3.select("#tooltip")
		.style("visibility", "hidden");
}
