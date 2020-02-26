function appendImage(url, position) {
	var img = new Image();
	img.onload = function () {
		middleImageHelper(url, position, img);
	}
	img.src = url;
}

function middleImageHelper(url, position, img) {
	img_width = img.width;
	img_height = img.height;
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

	var middleGroup = svg.append("g")
        .datum({position: position, height: img_height, width: img_width})
        .attr('id', 'middle_image')
		.attr("transform", d => "translate(" + d.position + ")");

	var imageElem = middleGroup.append("image")
		.attr("href", url)
		.attr("height", img_height)
		.attr("width", img_width)
		.attr("clip-path", "url(#clip)");

	var rectFill = middleGroup.append("rect")
		.attr("width", img_width)
		.attr("height", img_height)
		.attr("filter", "url(#glow)")
		.on('click', function() {
            d3.select('image#center')
                .transition()
                .duration(1000)
                .style('opacity', 0);
            setTimeout(function(){
                d3.select("image#center").attr('href', img.src);}, 1000);
            setTimeout(function(){d3.select("image#center")
            .transition()
            .duration(1000)
            .style('opacity', 1);}, 1000);
 
			// change middle_image variable and call function, both from test.html
			middle_image = img.src.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
			change_similar_images()
        });
        
    middleGroup
        .style('opacity', 0)
        .transition()
	    .duration(4500)
        .style("opacity", 1);
}
