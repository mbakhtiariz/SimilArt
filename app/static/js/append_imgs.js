function appendImage(url, position, artwork_name, artist_full_name, similarity, creation_year) {
	var img = new Image();
	img.onload = function () {
		middleImageHelper(url, position, img, artwork_name, artist_full_name,
			similarity, creation_year);
	}
	img.src = url;
}

function middleImageHelper(url, position, img, artwork_name, artist_full_name,
		similarity, creation_year) {
	img_width = img.width;
	img_height = img.height;
	var ratio = img_width / img_height;
	// If image width > height
	if (ratio > 1) {
		img_width = similar_image_size;
		img_height = similar_image_size / ratio;
	// If image height > width
	} else {
		img_width = similar_image_size * ratio;
		img_height = similar_image_size;
	};

	var middleGroup = middle.append("g")
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
        .on("mouseover", function(){
        	timer_tooltip = setTimeout(function () {
        	tooltip.html(artwork_name + ".<br/><br/>" +
        		artist_full_name + " (" + creation_year + ").<br/><br/>" +
				"<em>Similarity:</em> &nbsp" + similarity + "%");
        	return tooltip.style("visibility", "visible");
        	}, time_till_tooltip_appearance);
        })
		.on("mousemove", function(){
			return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
			clearTimeout(timer_tooltip);
			return tooltip.style("visibility", "hidden");});

    middleGroup
        .style('opacity', 0)
        .transition()
	    .duration(appearance_transition_speed)
        .style("opacity", 1);
}
