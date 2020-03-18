/*
This code is written for the image placement in the similarity area.
Throughout the description below I will refer to "rectangles", but the
rectangle can of course be generalised to "image".


## ALGORITHM DESCRIPTION ##

General details:
	- Everytime an rectangle is added, keep track of each of the sides of the rectangle.
	- Once a new rectangle has been added, remove borders that touch each other
		(that is, the overlap between the bottom of one image and top of another
		image that connects to it is removed, leaving only the parts of the borders
		that stick out)
	- Everytime a rectangle gets added, if it is close enough to the outer border (i.e.
		border of the similarity area, with 50% probability put it right against this border).
	- Keep track of the most left/right/up/down any space has been filled

Now for the ordering of the placing:
	- Start with the "up" direction
	- For each "upper rectangle side":
		- Determine a possible new rectangle location, taking the the
		rectangle dimensions into account, with the new rectangle touching
		the current rectangle side (Ignore overlap with other rectangles),
		and adding some randomness
		- If a candidate location is such that the placement of the rectangle
		would cause overlap with any other rectangles that are already there: Remove it from the options
		- If the rectangle is outside of the similarity area, try to (with 50% probability)
		either remove the additive randomness, or clip it directly to the side of the similarity area.
	(a) For each candidate location:
		Determine the distance of the middle of the new rectangle to the absolute center
	- Place the new rectangle at the location with the smaller distance to the center
	- If we have not been this much up/down/left/right yet, switch from "up" to "right",
		"right" to "down", "down" to "left", or "left" to "up", i.e. a clockwise spiral pattern
	- Remove borders that touch each other

	(b) If there are no candidate locations, switch from "up" to "right",
		"right" to "down", "down" to "left", or "left" to "up", i.e. a clockwise spiral pattern,
		and try again for the current rectangle.

	- If after N full spiral cycles (up->right->down->left) without being able
	to place any rectangle, stop.
*/

function add_border(borders, side, x1, y1, x2, y2) {
	borders[side].push([[x1,y1], [x2,y2]]);
}

function check_overlap(rect1_x1, rect1_x2, rect2_x1, rect2_x2) {
	// There is overlap if for rect1 one of the corners is inbetween rect2's corners or
	// the other way around
	if ((rect1_x1 >= rect2_x1 && rect1_x1 <= rect2_x2) || (rect1_x2 >= rect2_x1 && rect1_x2 <= rect2_x2) ||
		(rect2_x1 >= rect1_x1 && rect2_x1 <= rect1_x2) || (rect2_x2 >= rect1_x1 && rect2_x2 <= rect1_x2)) {
		return true
	} else {
		return false
	}
}

function remove_border_overlap(borders, center) {
	// If border distance for left/right or top/bottom is less than threshold, remove it
	const threshold = 80;

	// Top/bottom
	var top_borders = borders["top"];
	var bot_borders = borders["bottom"];

	for (var i=0; i<top_borders.length; i++) {
		for (var j=0; j<bot_borders.length; j++) {
			const x1_top = top_borders[i][0][0],
				y1_top = top_borders[i][0][1],
				x2_top = top_borders[i][1][0],
				y2_top = top_borders[i][1][1],
				x1_bot = bot_borders[j][0][0],
				y1_bot = bot_borders[j][0][1],
				x2_bot = bot_borders[j][1][0],
				y2_bot = bot_borders[j][1][1];

			if ((y1_top-y1_bot) == 0 && (y1_top-y1_bot) >= 0 && check_overlap(x1_bot, x2_bot, x1_top, x2_top)) {
				// If left corners equal
				if (x1_top == x1_bot) {
					borders["top"][i][0][0] = Math.min(x2_top, x2_bot);
					borders["bottom"][j][0][0] = Math.min(x2_top, x2_bot);

				// If bot most left
				} else if (x1_bot < x1_top) {
					borders["top"][i][0][0] = Math.min(x2_bot, x2_top);
					borders["bottom"][j][1][0] = x1_top;

					// If bot also most right, add most right section (splitting the border in two)
					if (x2_bot > x2_top) {
						borders["bottom"].push([[x2_top,y1_bot], [x2_bot,y1_bot]]);
					}

				// If top most left
				} else {
					borders["top"][i][1][0] = x1_bot;
					borders["bottom"][j][0][0] = Math.min(x2_top, x2_bot);

					// If top also most right, add most right section (splitting the border in two)
					if (x2_top > x2_bot) {
						borders["top"].push([[x2_bot,y1_top], [x2_top,y1_top]]);
					}
				}
			}
		}
	}

	// Left/right
	var left_borders = borders["left"];
	var right_borders = borders["right"];

	for (var i=0; i<left_borders.length; i++) {
		for (var j=0; j<right_borders.length; j++) {
			const x1_left = left_borders[i][0][0],
				y1_left = left_borders[i][0][1],
				x2_left = left_borders[i][1][0],
				y2_left = left_borders[i][1][1],
				x1_right = right_borders[j][0][0],
				y1_right = right_borders[j][0][1],
				x2_right = right_borders[j][1][0],
				y2_right = right_borders[j][1][1];

			if ((x1_left-x1_right) == 0 && (x1_left-x1_right) >= 0 && check_overlap(y1_right, y2_right, y1_left, y2_left)) {
				// If upper corners equal
				if (y1_left == y1_right) {
					borders["left"][i][0][1] = Math.min(y2_left, y2_right);
					borders["right"][j][0][1] = Math.min(y2_left, y2_right);

				// If right most up
				} else if (y1_right < y1_left) {
					borders["left"][i][0][1] = Math.min(y2_right, y2_left);
					borders["right"][j][1][1] = y1_left;

					// If right also most down, add lower section (splitting the border in two)
					if (y2_right > y2_left) {
						borders["right"].push([[y2_left,x1_right], [y2_right,x1_right]]);
					}

				// If left most up
				} else {
					borders["left"][i][1][1] = y1_right;
					borders["right"][j][0][1] = Math.min(y2_left, y2_right);

					// If left also most low, add lower section (splitting the border in two)
					if (y2_left > y2_right) {
						borders["left"].push([[x1_left, y2_right], [x1_left, y2_left]]);
					}
				}
			}
		}
	}
}

// Checks if a new location is valid (i.e. no overlap with other images)
function check_valid(borders, x, y, width, height, center) {
	const center_x = center["x"],
		center_y = center["y"],
		center_width = center["width"],
		center_height = center["height"];

	if ((x > center_x) && (x+width < center_x+center_width) &&
		(y > center_y) && (y+height < center_y+center_height)) {
			return false
		}

	const sides = Object.keys(borders);
	for (var i=0; i<sides.length; i++) {
		const side = sides[i];
		bords = borders[side];
		for (var j=0; j<bords.length; j++) {
			var border = bords[j];
			const x1 = border[0][0],
				y1 = border[0][1],
				x2 = border[1][0],
				y2 = border[1][1];
			if ((x1-x2) == 0 && (y1-y2) == 0) continue;
			if (((x1 > x) && (x1 < x+width) && (y1 > y) && (y1 < y+height)) || // Line starts inside the square
			((x2 > x) && (x2 < x+width) && (y2 > y) && (y2 < y+height)) ||	// Line ends inside the square
			((x1 <= x) && (x2 >= x+width) && (y1 > y) && (y1 < y+height)) || // Square intersects horizontal line
			((y1 <= y) && (y2 >= y+height) && (x1 > x) && (x1 < x+width)) || // Square intersects vertical line
			((side == "bottom") && (y1 == y+height) && check_overlap(x, x+width, x1, x2)) || // Bottom lines may not have overlap with new bottom border
			((side == "top") && (y1 == y) && check_overlap(x, x+width, x1, x2)) || // Top lines may not have overlap with new top border
			((side == "right") && (x1 == x+width) && check_overlap(y, y+height, y1, y2)) || // Right lines may not have overlap with new right border
			((side == "left") && (x1 == x) && check_overlap(y, y+height, y1, y2))) { // Left lines may not have overlap with new left border
				return false
			}
		}
	}
	return true
}

// This function looks where to place the new image
function find_place(borders, all_borders, direction, width, height, center, outer) {
	const center_x = center["x"],
		center_y = center["y"];
	const center_centerx = center_x + 0.5*width,
		center_centery = center_y + 0.5*height;

	const outer_x = outer["x"],
		outer_y = outer["y"],
		outer_width = outer["width"],
		outer_height = outer["height"];

	const maxRand = 10;
	const randClipThreshold = 10;
	const outerClipThreshold = 40;

	var side;
	if (direction == "up") {
		side = "top";
	} else if (direction == "down") {
		side = "bottom";
	} else {
		side = direction; // left=left, right=right
	}

	const bords = borders[side];
	var candidates = [];
	for (var i=0; i<bords.length; i++) {
		var candidate = bords[i];
		const x1 = candidate[0][0],
			y1 = candidate[0][1],
			x2 = candidate[1][0],
			y2 = candidate[1][1];
		if ((x1-x2) == 0 && (y1-y2) == 0) continue;
		if (direction == "up") {
			var rand = Math.random() * Math.max(x2-x1-randClipThreshold, 0);
			rand = Math.abs(rand) < randClipThreshold ? 0 : rand;

			var new_x = x2 - rand - width;
			var new_y = y1 - height;

			// If top outside container, not a candidate
			if (new_y < outer_y) continue;
			// Clip top to outer if close enough with 0.5 probability
			var r = Math.random();
			if (new_y < (outer_y+outerClipThreshold) && r > 0.5) new_y = outer_y;
			// If left side out of container, try to clip it or remove randomness (50/50), otherwise no candidate
			if (new_x < outer_x) {
				var r = Math.random();
				if (r > 0.5) {
					// Try to clip to outer
					new_x = outer_x;
				} else {
					new_x = x2 - width;
				}
				if (new_x < outer_x) continue;
			}
			if (check_valid(all_borders, new_x, new_y, width, height, center)) candidates.push([new_x, new_y]);

		} else if (direction == "down") {
			var rand = Math.random() * Math.max(x2-x1-randClipThreshold, 0);
			rand = Math.abs(rand) < randClipThreshold ? randClipThreshold : rand;

			var new_x = x2 - rand;
			var new_y = y1;

			// If bottom outside container, not a candidate
			if (new_y+height > outer_y+outer_height) continue;
			// Clip bottom to outer if close enough with 0.5 probability
			var r = Math.random();
			if (new_y+height > (outer_y+outer_height-outerClipThreshold) && r > 0.5) new_y = outer_y+outer_height-height;
			// If right side out of container, try to clip it or remove randomness (50/50), otherwise no candidate
			if (new_x+width > outer_x+outer_width) {
				var r = Math.random();
				if (r > 0.5) {
					// Try to clip to outer
					new_x = outer_x+outer_width-width;
				} else {
					new_x = x2;
				}
				if (new_x+width > outer_x+outer_width) continue;
			}
			if (check_valid(all_borders, new_x, new_y, width, height, center)) candidates.push([new_x, new_y]);

		} else if (direction == "right") {
			var rand = Math.random() * Math.max(y2-y1-randClipThreshold, 0);
			rand = Math.abs(rand) < randClipThreshold ? 0 : rand;

			var new_x = x2;
			var new_y = y1 - rand;

			// If right outside container, not a candidate
			if (new_x+width > outer_x+outer_width) continue;
			// Clip right to outer if close enough with 0.5 probability
			var r = Math.random();
			if (new_x+width > (outer_x+outer_width-outerClipThreshold) && r > 0.5) new_x = outer_x+outer_width-width;
			// If top out of container, try to clip it or remove randomness (50/50), otherwise no candidate
			if (new_y < outer_y) {
				var r = Math.random();
				if (r > 0.5) {
					// Try to clip to outer
					new_y = outer_y;
				} else {
					new_y = y1;
				}
				if (new_y < outer_y) continue;
			}
			if (check_valid(all_borders, new_x, new_y, width, height, center)) candidates.push([new_x, new_y]);

		} else if (direction == "left") {
			var rand = Math.random() * Math.max(y2-y1-randClipThreshold, 0);
			rand = Math.abs(rand) < randClipThreshold ? 0 : rand;

			var new_x = x1 - width;
			var new_y = y1 + rand;

			// If left outside container, not a candidate
			if (new_x < outer_x) continue;
			// Clip left to outer if close enough with 0.5 probability
			var r = Math.random();
			if (new_x < (outer_x+outerClipThreshold) && r > 0.5) new_x = outer_x;
			// If bottom out of container, try to clip it or no randomness (50/50), otherwise no candidate
			var r = Math.random();
			if (new_y+height > outer_y+outer_height) {
				if (r > 0.5) {
					// Try to clip to outer
					new_y = outer_y+outer_height-height;
				} else {
					// No randomness
					new_y = y1;
				}
				if (new_y+height > outer_y+outer_height) continue;
			}
			if (check_valid(all_borders, new_x, new_y, width, height, center)) candidates.push([new_x, new_y]);
		}
	}

	// Find the best location, closer to center is better
	var best_dist = 9999999;
	var best_candidate = [undefined, undefined]
	for (var i=0; i<candidates.length; i++) {
		const candidate_centerx = candidates[i][0] + 0.5*width;
		const candidate_centery = candidates[i][1] + 0.5*height;
		var dist_from_center = Math.sqrt((center_centerx-candidate_centerx)**2 + (center_centery-candidate_centery)**2);
		if (dist_from_center < best_dist) {
			best_dist = dist_from_center;
			best_candidate = candidates[i];
		}
	}
	return best_candidate
}

// This function adds a rectangle at at location (x,y)
function add_rect(borders, all_borders, container, x, y, width, height, center, data, id, sim_score) {
	const meta_data_painting = data[id];
	const artwork_name = meta_data_painting['artwork_name'],
		artist_full_name = meta_data_painting['artist_full_name'],
		creation_year = meta_data_painting['creation_year'];
		general_type = meta_data_painting['general_type'];
		artwork_type = meta_data_painting['artwork_type'];
		dominant_color = meta_data_painting['dominant_color'];
	const cosine_sim = (Math.round(sim_score * 100) / 100).toFixed(2);
	sim_score = Math.round(cosine_sim * 100);
	appendImage("static/subset/"+id+".jpg", [x, y], artwork_name, artist_full_name, sim_score, creation_year, general_type, artwork_type, dominant_color);
	add_border(all_borders, "top", x, y, x+width, y);
	add_border(all_borders, "bottom", x, y+height, x+width, y+height);
	add_border(all_borders, "left", x, y, x, y+height);
	add_border(all_borders, "right", x+width, y, x+width, y+height);
	add_border(borders, "top", x, y, x+width, y);
	add_border(borders, "bottom", x, y+height, x+width, y+height);
	add_border(borders, "left", x, y, x, y+height);
	add_border(borders, "right", x+width, y, x+width, y+height);
	remove_border_overlap(borders, center);
}

// This function is for debugging by drawing border lines.
function draw_borders(container, borders, lines) {
	lines.forEach((line) => {
		line.remove();
	});

	lines = []
	const colors = ["red", "green", "blue", "yellow"];
	const sides = ["left", "top", "right", "bottom"]
	for (var i=0; i<4; i++) {
		const col = colors[i];
		const side = sides[i];
		var ls = borders[side];
		for (var j=0; j<ls.length; j++) {
			var line = ls[j];
			var l = container.append("line")
				.attr("x1", line[0][0])
				.attr("y1", line[0][1])
				.attr("x2", line[1][0])
				.attr("y2", line[1][1])
				.style("stroke", col)
				.style("stroke-width", 4);
			lines.push(l);
		}
	}
	return lines;
}


// This function pre-loads an image. "imgs" is a imgLoader object (see load_images)
function load_img(imgs, path, id) {
	var img = new Image();
	img.onload = function () {
		imgs.add(id, img.width, img.height);
	};
	img.src = path + id + ".jpg";
}

// This function pre-loads a list of images and returns a Promise object, which
// on resolve will return a dictionary with img_id: {width, height}
function load_images(path, ids) {
	function imgLoader(callback, n) {
        this.value = {};
        this.callback = callback;
		this.n = n; // Do callback when this.value has n entries
		this.counter = 0;
        // value getter
        this.get = function() {
            return this.value;
        }
        // value setter
        this.add = function(id, width, height) {
			this.value[id] = {"width": width, "height": height};
			this.counter++;
            if (this.counter == this.n) {
				callback(this.value)
            }
        }
    }

	var promise = new Promise(function(resolve, reject) {
		var imgs = new imgLoader(function () {
			resolve(imgs.get());
		}, ids.length);

		for (var i=0; i<ids.length; i++) {
			var id = ids[i];
			load_img(imgs, path, id);
		}
	});
	return promise
}

// Main function for calculating new image positions and adding them
// locations is empty list
function similar_layout_main(container, img_ids, imgs, center, outer, data, sim_scores, locations, imgSize, plot_id) {
	// Check if we still allow this function to plot, similarity_plotter_id is global for the only plotter that should plot
	if (plot_id != similarity_plotter_id) return
	// Center image position
	const center_x = center["x"],
		center_y = center["y"],
		center_width = center["width"],
		center_height = center["height"];

	// Similarity area position
	const outer_x = outer["x"],
		outer_y = outer["y"],
		outer_width = outer["width"],
		outer_height = outer["height"];

	// Keep track of image borders
	var borders = {"left": [], "top": [], "right": [], "bottom": []};
	add_border(borders, "left", center_x, center_y, center_x, center_y+center_height);
	add_border(borders, "top", center_x, center_y, center_x+center_width, center_y);
	add_border(borders, "right", center_x+center_width, center_y, center_x+center_width, center_y+center_height);
	add_border(borders, "bottom", center_x, center_y+center_height, center_x+center_width, center_y+center_height);
	// Add outer borders just as an extra failsafe
	add_border(borders, "left", outer_x, outer_y, outer_x, outer_y+outer_height);
	add_border(borders, "top", outer_x, outer_y, outer_x+outer_width, outer_y);
	add_border(borders, "right", outer_x+outer_width, outer_y, outer_x+outer_width, outer_y+outer_height);
	add_border(borders, "bottom", outer_x, outer_y+outer_height, outer_x+outer_width, outer_y+outer_height);
	var all_borders = JSON.parse(JSON.stringify(borders)); // Make a copy of the borders, no borders are changed in this one

	// Stop after `maxFailCyles` full cycles without being able to place image
	const maxFailCycles = 2;
	const directions = ["up", "right", "down", "left"];

	// Keep track of the furhest up/right/down/left that we have occupied space thus far.
	var furthest = {
		"up": center_y,
		"right": center_x+center_width,
		"down": center_y+center_height,
		"left": center_x
	}

	// For debugging, we can draw colored lines for the borders
	// var lines = [];
	// lines = draw_borders(container, borders, lines);
	var dirIdx = 0; // Direction index, corresponding with the `directions` list

	var failCounter = 0;
	for (var i=1; i<img_ids.length; i++) {
		// Check if we still allow this function to plot, similarity_plotter_id is global for the only plotter that should plot
		if (plot_id != similarity_plotter_id) return
		// Get the image
		let img_id = img_ids[i];
		let sim_score = sim_scores[i];
		let img_width = imgs[img_id]["width"];
		let img_height = imgs[img_id]["height"];
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

		let direction = directions[dirIdx];

		var x, y;
		[x, y] = find_place(borders, all_borders, direction, img_width, img_height, center, outer);
		if (x == undefined) {
			dirIdx = (dirIdx + 1) % 4;
			failCounter++;
			if (failCounter >= (maxFailCycles*4)) {
				break;
			}
			i--; // We want to try this index again
			continue;
		} else {
			locations.push([x,y]);
			add_rect(borders, all_borders, container, x, y, img_width, img_height, center, data, img_id, sim_score);
		}

		if (direction == "up" && y <= furthest["up"]) {
			furthest["up"] = y;
			dirIdx = (dirIdx + 1) % 4;
		} else if (direction == "down" && y+img_height >= furthest["down"]) {
			furthest["down"] = y+img_height;
			dirIdx = (dirIdx + 1) % 4;
		} else if (direction == "left" && x <= furthest["left"]) {
			furthest["left"] = x;
			dirIdx = (dirIdx + 1) % 4;
		} else if (direction == "right" && x+img_width >= furthest["right"]) {
			furthest["right"] = y+img_width;
			dirIdx = (dirIdx + 1) % 4;
		}
		// lines = draw_borders(container, borders, lines);
		failCounter = 0; // If we are here we succeeded in placing, so reset the fail counter
	}
	similar_locs = locations
}

// This function first loads the images, then calls the main function
// In practise, only this one should be called to use the image loading
// locations is empty list
function similar_layout(container, img_ids, center, outer, data, sim_scores, locations, img_size, plot_id) {
	load_images("static/subset/", img_ids).then(imgs => {
		similar_layout_main(container, img_ids, imgs, center, outer, data, sim_scores, locations, img_size, plot_id);
	});
}
