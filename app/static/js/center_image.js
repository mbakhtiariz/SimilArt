function set_center(center_obj, img_id) {
	var img = new Image();
	toString(img_id);
	url = "static/subset/"+img_id+".jpg"
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


	center_obj.attr("xlink:href", url)
		.attr("x",  svgwidth*0.5*0.5 - 50)
		.attr("y", svgwidth*0.25*0.5 - 50)
		.attr("height", 100)
		.attr("width", 100)
};
