function change_dissimilar_images() {
    start_time = parseInt(sliderRange.value()[0]);
    end_time = parseInt(sliderRange.value()[1]);
    category = document.getElementById("general_cats").value

    nearest_ids_str = nearest_ids.map(x => x.toString());
    images_ids = available_ids.filter(filter_func);
    filtered_ids = images_ids.filter(x => !nearest_ids_str.includes(x));

    function filter_func(my_id) {
        return data[my_id]["creation_year"] >= start_time && data[my_id]["creation_year"] <= end_time
        && (category.toLowerCase() === "all" || data[my_id]["general_type"] === category);
    };

    sorted_images_ids = filtered_ids.sort(() => Math.random() - 0.5); // shuffles the list
    images_ids_subset = sorted_images_ids.slice(0, nr_dissimilar_images);
    grid_dissimilar = grid_dissimilar.sort(() => Math.random() - 0.5);
    grid_dissimilar = grid_dissimilar.sort(() => Math.random() - 0.5); // Shuffle a second time
    dissimilar_locs = grid_dissimilar.slice(0, nr_dissimilar_images);

    plot_dissimilar_images(images_ids_subset);
}

function plot_dissimilar_images(images_ids_subset, transition=true) {

    images_ids_subset_int = images_ids_subset.map(Number)

    // Remove all current images
    d3.selectAll("g#outside_image")
        .transition()
        .duration(removal_transition_speed)
        .style("opacity", 0)
        .remove();

    // Wait until similarity found
    get_sim_scores(middle_image, images_ids_subset_int).then(() => {
        // --- selecting location of dis-similar layer and plotting those images:
        for (i = 0; i < images_ids_subset.length; i++) {
            meta_data_painting = data[images_ids_subset[i]]
            artwork_name = meta_data_painting['artwork_name']
            artist_full_name = meta_data_painting['artist_full_name']
            creation_year = meta_data_painting["creation_year"]
            general_type = meta_data_painting['general_type'];
            artwork_type = meta_data_painting['artwork_type'];
            dominant_color = meta_data_painting['dominant_color'];

            // Convert to percentage
            sim_score = Math.round(sim_scores_explore[i] * 100)
            id_image = images_ids_subset[i].toString()
            if (transition) {
            setTimeout(appendDraggableImage, i * 50, imgs_path + id_image + ".jpg", dissimilar_locs[i], i,artwork_name, artist_full_name, sim_score,
                creation_year, general_type, artwork_type, dominant_color, transition);
            } else {
                appendDraggableImage(imgs_path + id_image + ".jpg", dissimilar_locs[i], i,artwork_name, artist_full_name, sim_score,
                creation_year, general_type, artwork_type, dominant_color, transition);
            }
        };
    });

}

// create grid for possible locations of images
var grid_dissimilar = [];
function calculate_dissimilar_grid() {
    let num_locs = 0; // Keep track of how many locations *should* be in `grid_dissimilar`
    for (var i = 0; i < svgwidth - dissimilar_image_size; i += dissimilar_image_size+3.5) {
        for (var j = 0; j < svgheight - dissimilar_image_size; j += dissimilar_image_size+3.5) {

            // skip middle section and randomize button
            if ((i + dissimilar_image_size > (middle_x - 5) && i < (middle_x + middle_width + 5)) &&
                    (j + dissimilar_image_size > (middle_y - 5) && j < (middle_y + middle_height + 5)) ||
                    (i < button_size * 4 + 0.5 && j < button_size * 4 + 0.5))

                continue;

            grid_dissimilar.push([i, j]);
            num_locs++;
        }
    }
}