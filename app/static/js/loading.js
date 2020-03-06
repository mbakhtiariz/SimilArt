const path = "static/subset/";
var intervals = [];
var loaded_ids = [];


// Image loader worker loads images in background
var imageLoader = new Worker('static/js/image_preloader.js');

// // If imageloader is done it returns image id, add it to loaded_ids list
// imageLoader.onmessage = function(e) {
//   var id = e.data;
//   loaded_ids.push(id);
// }
//
// // Load n random images
// function preload_imgs(n, ids) {
// 	var num_ids = ids.length;
// 	for (var i=0; i<n; i++) {
// 		var id = ids[Math.floor(Math.random() * ids.length)];
// 		imageLoader.postMessage(id);
// 	}
// }
//
// // Preloads a small number of images and then starts the loading screen
// function loading_screen(container, ids) {
// 	console.log('Loading');
// 	preload_imgs(500, ids);
// 	var checkLoaded = setInterval(function () {
// 		if (loaded_ids.length >= 20) {
// 			clearInterval(checkLoaded);
// 			draw_loading_screen(container);
// 		}
// 	});
// }

// Adds the flipboxes to the screen
function loading_screen(container, ids) {
	loaded_ids = ids;
	let screen_width = document.body.clientWidth;
	let screen_height = document.body.clientHeight;

	var num_x = 8; // Number of imgs along x (width)
	var im_width = screen_width / num_x;
	// var num_y = Math.floor(screen_height/im_width);
	var num_y = 4;
	var im_height = screen_height / num_y;

	// Set a center title div
	container.append("div")
		.attr("id", "loading-text-box")
		.style("left", (2*im_width).toString() + "px")
		.style("top", (1*im_height).toString() + "px")
		.style("width", (4*im_width).toString() + "px")
		.style("height", (2*im_height).toString() + "px")
		.append("span")
			.attr("id", "loading-text-text")
			.style("line-height", (2*im_height).toString()+"px")
			.text("OmniArt Exploration");

	// Add flipboxes around the center
	for (var i=0; i<num_x; i++) {
		for (var j=0; j<num_y; j++) {
			if ((i < 2 || i > 5) || (j < 1 || j > 2)) {
				var x = i*im_width;
				var y = j*im_height;
				add_flipbox(x, y, im_width, im_height, container, ids);
			}
		}
	}
}

// Clears the intervals that keep calling the image flips
function clearIntervals() {
	for (var i=0; i<intervals.length; i++) {
		clearInterval(intervals[i]);
	}
}

// Function for adding the flipbox
function add_flipbox(x, y, width, height, container, ids) {
	var flipbox = container.append("div")
		.attr("class", "flip-box")
		.style("left", x.toString() + "px")
		.style("top", y.toString() + "px")
		.style("width", width + "px")
		.style("height", height + "px");

	var inner = flipbox.append("div")
		.attr("class", "flip-box-inner");

	var front = inner.append("div")
		.attr("class", "flip-box-front");

	var back = inner.append("div")
		.attr("class", "flip-box-back");

	var i = Math.floor(Math.random() * loaded_ids.length);
	// Set the initial images
	front.append("img")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("src", "static/subset/"+loaded_ids[i]+".jpg");
	i = Math.floor(Math.random() * loaded_ids.length);
	back.append("img")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("src", "static/subset/"+loaded_ids[i]+".jpg");

	const transition_time = 0.3; // transition time in secondsf
	const switch_time = 1000 * transition_time + 100;
	const callback_time = 800 + Math.random() * 100;
	const delay = Math.random() * 500; // Random delay max 0.5 sec

	// After timeout of random delay, start flipping
	setTimeout(function () {
		// At an interval of `callback_time`+randomness do a flip
		var interval = setInterval(function () {
			// Perform the flip
			flipbox.select(".flip-box-inner")
				.style("transition", "transform "+transition_time.toString()+"s")
					.style("-webkit-transition", "transform "+transition_time.toString()+"s")
				.style("transform", "rotateX(-180deg)")
					.style("-webkit-transform", "rotateX(-180deg)");

			// Once we're sure that the flip animation is done, switch images and un-flip
			setTimeout(function () {
				// Un-flip
				flipbox.select(".flip-box-inner")
					.style("transition", "transform 0s")
						.style("-webkit-transition", "transform 0s")
					.style("transform", "")
						.style("-webkit-transform", "");
				// Switch front to previous back image
				flipbox.select(".flip-box-front")
					.select("img")
					.attr("src", "static/subset/"+loaded_ids[i]+".jpg");
				// Add new back image
				i = Math.floor(Math.random() * loaded_ids.length);
				flipbox.select(".flip-box-back")
					.select("img")
					.attr("src", "static/subset/"+loaded_ids[i]+".jpg");

			}, switch_time);
		intervals.push(interval); // Push interval id to global list with intervals
		}, callback_time, flipbox);
	}, delay);
}
