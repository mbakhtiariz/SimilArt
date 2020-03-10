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
		img_width = similar_image_size;
		img_height = similar_image_size / ratio;
	// If image height > width
	} else {
		img_width = similar_image_size * ratio;
		img_height = similar_image_size;
	};

	var im = center_obj.append("image")
		.attr("clip-path", "url(#clip)")
		.attr("href", url)
		.attr("x",  center_image_x)
		.attr("y", center_image_y)
		.attr("height", center_image_size)
		.attr("width", center_image_size)
		.attr("id", 'center');

	var modalImg = document.getElementById("img01");
	modalImg.src = data[url.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];

	// Change information of popup middle image
	meta_data_painting = data[middle_image];
    artwork_name = meta_data_painting['artwork_name'].replace(/^\w/, c => c.toUpperCase());
    artist_full_name = meta_data_painting['artist_full_name'].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    creation_year = meta_data_painting["creation_year"];
    document.getElementById('popup_information').innerHTML = artwork_name + ".<br /><br />" + artist_full_name + " (" + creation_year + ").";

	center_obj.append('rect')
		.attr("x",  center_image_x)
		.attr("y", center_image_y)
		.attr("height", center_image_size)
		.attr("width", center_image_size)
		.attr("filter", "url(#glow)")
		.on('click', function(){
			var modal = document.getElementById("myModal");			
			modal.style.display = "block";
			
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				modal.style.display = "none";
			} 
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			} 
		});

	center_obj
        .style('opacity', 0)
        .transition()
	    .duration(time_to_suspend_middle_image_after_click)
        .style("opacity", 1);
};
