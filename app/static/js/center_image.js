var center_image_size = 100;
var center_image_x = svgwidth * 0.5 * 0.5 - center_image_size / 2;
var center_image_y = svgheight * 0.5 * 0.5 - center_image_size / 2;

function set_center(center_obj, img_id) {
	var img = new Image();
	toString(img_id);
	url = "static/subset/" + img_id + ".jpg"
	img.src = url;
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

	center_obj.attr("href", url)
		.attr("x",  center_image_x)
		.attr("y", center_image_y)
		.attr("height", center_image_size)
		.attr("width", center_image_size)
		.attr("id", 'center');

	center_obj
        .style('opacity', 0)
        .transition()
	    .duration(1000)
        .style("opacity", 1);
};
