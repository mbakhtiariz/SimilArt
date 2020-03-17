function appendImage(url, position, artwork_name, artist_full_name, similarity, creation_year, general_type, artwork_type, dominant_color) {
	var img = new Image();
	img.onload = function () {
		middleImageHelper(url, position, img, artwork_name, artist_full_name,
			similarity, creation_year, general_type, artwork_type, dominant_color);
	}
	img.src = url;
}

function middleImageHelper(url, position, img, artwork_name, artist_full_name,
		similarity, creation_year, general_type, artwork_type, dominant_color) {
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
			const modalImg = document.getElementById("img01");
			const old_src = modalImg.src;
			const old_innerHtml = document.getElementById('popup_information').innerHTML;
			modalImg.src = data[imageElem.attr('href').replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];


			if (d3.event.ctrlKey) {

				document.getElementById('popup_information').innerHTML = "<span style='color:darkgrey;'>" + artwork_name + ".<br /><br />" + artist_full_name + " (" + creation_year + ").</span><br><br><br /><span style='color:darkgrey; font-size:0.7em'>" + "<em>General Type:&nbsp" + general_type + "<br>" + "<em>Artwork Type:&nbsp " + artwork_type + "<br>" + "<em>Dominant Color:&nbsp" + '<svg width="15" height="15"><rect width="15" height="15" style="fill:' + dominant_color + '; stroke: silver; stroke-width: 1px;" /></svg>' + "&nbsp(" + dominant_color + ")</em></span>";


				var modal = document.getElementById("myModal");
				modalImg.src = data[imageElem.attr('href').replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];
				modalImg.onerror = function() {
					modalImg.src = url;
				}
				modal.style.display = "block";

				// Get the <span> element that closes the modal
				var span = document.getElementsByClassName("close")[0];
				// When the user clicks on <span> (x), close the modal
				span.onclick = function() {
					modal.style.display = "none";
					modalImg.src = old_src;
					document.getElementById('popup_information').innerHTML = old_innerHtml;
				}
				// When the user clicks anywhere outside of the modal, close it
				window.onclick = function(event) {
					if (event.target == modal) {
						modal.style.display = "none";
						modalImg.src = old_src;
						document.getElementById('popup_information').innerHTML = old_innerHtml;
					}
				}
			}
			else{

				handle_stacks();

				// change middle_image variable and call function, both from test.html;
				middle_image = img.src.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
				d3.select('image#center').transition()
					.duration(removal_transition_speed_middle_image)
					.style('opacity', 0)
					.remove();
				d3.select('rect#center').remove();
				d3.select('rect#border').remove();
				set_center(center, middle_image);
				// handle_stacks();
				change_similar_images();
				// change_dissimilar_images();
			}
        })
        .on("mouseover", function(){
        	timer_tooltip = setTimeout(function () {

        	// If artist name consists of too many parts (> 5), probably string is full of spaces -> remove spaces
		    length_artist_name = artist_full_name.split(' ').length;
		    if (length_artist_name > 5)
		    	artist_full_name = artist_full_name.replace(/\s/g,'');

        	tooltip.html(artwork_name.replace(/^\w/, c => c.toUpperCase()).replace(/\.$/, "").replace(/_/g, ' ') + ". <b>" +
        		artist_full_name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') +
				"</b> (" + creation_year + "). " + "<em>Similarity:</em>&nbsp" + similarity + "%");
        	return tooltip.style("visibility", "visible");
        	}, time_till_tooltip_appearance);
        })
		.on("mousemove", function(){
			return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
			clearTimeout(timer_tooltip);
			return tooltip.style("visibility", "hidden");});

	var rgb = colourGradientor(similarity / 100, stroke_color_images_high_similarity, stroke_color_images_low_similarity);
	var hexColor =  "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
	var rectOutline = middleGroup.append("rect")
		.attr("class", "image-outline")
		.attr("width", img_width)
		.attr("height", img_height)
		.style("stroke", hexColor);

    middleGroup
        .style('opacity', 0)
        .transition()
	    .duration(appearance_transition_speed)
        .style("opacity", 1);
}
