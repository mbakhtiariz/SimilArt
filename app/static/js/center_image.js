var center_image_x;
var center_image_y;

function set_center(center_obj, img_id) {
	toString(img_id);
	var img = new Image();
	const url = "static/subset/" + img_id + ".jpg";

	// Return a promise that executes the main code. After set_center_main has() has finished the promise is resolved.
	var promise = new Promise(function(resolve, reject) {
		img.onload = function () {
			img_width = img.width;
			img_height = img.height;

			var ratio = img_width / img_height;
			// If image width > height
			if (ratio > 1) {
				img_width = center_image_size;
				img_height = center_image_size / ratio;
			// If image height > width
			} else {
				img_width = center_image_size * ratio;
				img_height = center_image_size;
			};
			set_center_main(center_obj, img_id, img_width, img_height);
			resolve();
		}
		img.src = url;
	});
	return promise
}

function set_center_main(center_obj, img_id, img_width, img_height) {
	var img = new Image();
	toString(img_id);
	const url = "static/subset/" + img_id + ".jpg";

	center_image_x = middle_width * 0.5 - img_width / 2;
	center_image_y = middle_height * 0.5 - img_height / 2;

	var im = center_obj.append("image")
		.attr("clip-path", "url(#clip)")
		.attr("href", url)
		.attr("x",  center_image_x)
		.attr("y", center_image_y)
		.attr("height", img_height)
		.attr("width", img_width)
		.attr("id", 'center');

	// Add image full resolution url
	var modalImg = document.getElementById("img01");
	modalImg.src = data[url.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];

	// Change image to alternate image if full resolution url does not exist
	modalImg.onerror = function() {
		modalImg.src = img.src;
	}

	// Change information of pop up middle image
	meta_data_painting = data[middle_image];
    var artwork_name = meta_data_painting['artwork_name'].replace(/^\w/, c => c.toUpperCase()).replace(/\.$/, "").replace(/_/g, ' ');
	var artist_full_name = meta_data_painting['artist_full_name'];


    // If artist name consists of too many parts (> 5), probably string is full of spaces -> remove spaces
    length_artist_name = artist_full_name.split(' ').length;
    if (length_artist_name > 5)
    	artist_full_name = artist_full_name.replace(/\s/g,'');
    artist_full_name = artist_full_name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
	var creation_year = meta_data_painting["creation_year"];
	var general_type = meta_data_painting['general_type'];
	var artwork_type = meta_data_painting['artwork_type'];
	var dominant_color = meta_data_painting['dominant_color'];
	document.getElementById('popup_information').innerHTML = artwork_name + ".<br /><br />" + artist_full_name + " (" + creation_year + "). <br><br>" + "<em>General Type:</em> &nbsp" + general_type + "<br>" + "<em>Artwork Type:</em> &nbsp " + artwork_type + "<br>" + "<em>Dominant Color:</em> &nbsp" + dominant_color;

	center_obj.append('rect')
		.attr("x",  center_image_x)
		.attr("y", center_image_y)
		.attr("height", img_height)
		.attr("width", img_width)
		.attr("filter", "url(#glow)")
		.attr("id", 'center')
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
		})
		.on("mouseover", function(){
        	timer_tooltip = setTimeout(function () {
        	tooltip.html(artwork_name + ". <b>" + artist_full_name + "</b> (" + creation_year + "). <br><br>" + "<em>General Type:</em> &nbsp <br>" + general_type + "<br>" + "<em>Artwork Type:</em> &nbsp <br>" + artwork_type + "<br>" + "<em>Dominant Color:</em> &nbsp <br>" + dominant_color );
        	return tooltip.style("visibility", "visible");
        	}, time_till_tooltip_appearance);
        })
		.on("mousemove", function(){
			return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
			clearTimeout(timer_tooltip);
			return tooltip.style("visibility", "hidden");});

	center_obj
        .style('opacity', 0)
        .transition()
	    .duration(time_to_suspend_middle_image_after_click)
        .style("opacity", 1);
};
