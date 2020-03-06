function appendImage(url, position, artwork_name, artist_full_name, similarity) {
	var img = new Image();
	img.onload = function () {
		middleImageHelper(url, position, img, artwork_name, artist_full_name,
			similarity);
	}
	img.src = url;
}

function middleImageHelper(url, position, img, artwork_name, artist_full_name,
		similarity) {
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
                .duration(removal_transition_speed)
                .style('opacity', 0);
            setTimeout(function(){
                d3.select("image#center").attr('href', img.src);}, time_to_suspend_middle_image_after_click);
            setTimeout(function(){d3.select("image#center")
            .transition()
            .duration(appearance_transition_speed)
            .style('opacity', 1);}, removal_transition_speed_middle_image);
			handle_stacks();
			// change middle_image variable and call function, both from test.html
			middle_image = img.src.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
			change_similar_images()
        })
        .on("mouseover", function(){
        	tooltip.html("<em>Artwork name:</em> &nbsp" + artwork_name + "<br/>" +
				"<em>Artist full name:</em> &nbsp" + artist_full_name + "<br/>" +
				"<em>Similarity:</em> &nbsp" + similarity)
        	return tooltip.style("visibility", "visible");})
		.on("mousemove", function(){
			return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
			return tooltip.style("visibility", "hidden");});
        
    middleGroup
        .style('opacity', 0)
        .transition()
	    .duration(appearance_transition_speed)
        .style("opacity", 1);
}
