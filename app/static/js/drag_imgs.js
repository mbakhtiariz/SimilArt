function appendDraggableImage(url, position) {
	var img = new Image();
	img.src = url;
	img_width = img.width;
	img_height = img.height;

	// var x = position[0], y = position[1];
	var ratio = img_width / img_height;
	// If image width > height
	if (ratio > 1) {
		img_width = image.size;
		img_height = image.size / ratio;
	// If image height > width
	} else {
		img_width = image.size * ratio;
		img_height = image.size;
	};

	var imageGroup = svg.append("g")
		.datum({position: position, height: img_height, width: img_width})
		.attr("transform", d => "translate(" + d.position + ")");

	var rectFill = imageGroup.append("rect")
		.attr("class", "rect-fill")
		.attr("width", img_width)
		.attr("height", img_height)
		.attr("filter", "url(#glow)")
		.on('click', function(url) {
			console.log(img.src)
			d3.select('image#center').attr('href', img.src);
		});

	var imageElem = imageGroup.append("image")
		.attr("href", url)
		.attr("height", img_height)
		.attr("width", img_width)
		.attr("clip-path", "url(#clip)");

	var rectOutline = imageGroup.append("rect")
		.attr("class", "rect-outline")
		.attr("width", img_width)
		.attr("height", img_height);

	imageGroup.call(
	d3.drag()
	.on("drag", dragged)
	.on("end", dragended));
}

function dragged(d) {
	var height = d.height;
	var width = d.width;
	var newX = d3.event.x - width * 0.5,
		newY = d3.event.y - height * 0.5;

	xborder = d3.event.x
	if (xborder + width*0.5  > 960 ){
		newX = 960 - width
	} else if (xborder - width*0.5  < 0){
		newX = 0
	}

	yborder = d3.event.y
	if (yborder + height*0.5  > 500) {
		newY = 500 - height
	} else if (yborder - height*0.5  < 0){
		newY = 0
	}
	console.log(xborder)
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
}

function dragended(d) {
  d3.select(this).lower();
}
