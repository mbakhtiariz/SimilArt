function redo() {
    if (redo_stack.length === 0){
        return;
    }
    undo_stack.push(middle_image);

    // remove current image from redo stack:
    middle_image = redo_stack.pop();

    undo_locs.push(similar_locs);
    similar_locs = redo_locs.pop();
    undo_ids.push(nearest_ids);
    nearest_ids = redo_ids.pop();
    d3.select('image#center').remove();
    d3.select('rect#center').remove();
    d3.select('rect#border').remove();
    set_center(center, middle_image);
    d3.selectAll("g#middle_image")
        .transition()
        .duration(removal_transition_speed)
        .style("opacity", 0)
        .remove();

    // Start i from 1 to filter-out central image:
    for (var i=0; i < similar_locs.length; i++) {
        meta_data_painting = data[nearest_ids[i+1]]
        artwork_name = meta_data_painting['artwork_name']
        artist_full_name = meta_data_painting['artist_full_name']
        creation_year = meta_data_painting['creation_year']

        general_type = meta_data_painting['general_type']
        artwork_type = meta_data_painting['artwork_type']
        dominant_color = meta_data_painting['dominant_color']

        // Convert to percentage
        sim_score = Math.round(sim_scores_nearest[i+1] * 100)
        appendImage(imgs_path + nearest_ids[i+1].toString() + ".jpg",
            similar_locs[i], artwork_name, artist_full_name,
            sim_score, creation_year, general_type, artwork_type, dominant_color);
    }
    // change_dissimilar_images();
    plot_dissimilar_images(images_ids_subset, transition=false);
}

function undo() {

    // to stop undo if it is empty.
    if (undo_stack.length === 0){
        return;
    };

    redo_stack.push(middle_image);
    middle_image = undo_stack.pop();
    redo_locs.push(similar_locs);
    similar_locs = undo_locs.pop();
    redo_ids.push(nearest_ids);
    nearest_ids = undo_ids.pop();
    d3.select('image#center').remove();
    d3.select('rect#center').remove();
    d3.select('rect#border').remove();
    set_center(center, middle_image);
    d3.selectAll("g#middle_image")
        .transition()
        .duration(removal_transition_speed)
        .style("opacity", 0)
        .remove();

    for (var i=0; i < similar_locs.length; i++) {
        meta_data_painting = data[nearest_ids[i+1]]
        artwork_name = meta_data_painting['artwork_name']
        artist_full_name = meta_data_painting['artist_full_name']
        creation_year = meta_data_painting['creation_year']

        general_type = meta_data_painting['general_type']
        artwork_type = meta_data_painting['artwork_type']
        dominant_color = meta_data_painting['dominant_color']
        // Convert to percentage
        sim_score = Math.round(sim_scores_nearest[i+1] * 100)
        appendImage(imgs_path + nearest_ids[i+1].toString() + ".jpg",
            similar_locs[i], artwork_name, artist_full_name,
            sim_score, creation_year, general_type, artwork_type, dominant_color);
    }
    // change_dissimilar_images();
    plot_dissimilar_images(images_ids_subset, transition=false);

}

function handle_stacks(){
    /*
    After clicking on a image central image changes. Here we add the current image before updating the central image.
    So we will be able to retrieve this state after pushing the update button.
     */
    undo_stack.push(middle_image);
    undo_locs.push(similar_locs);
    undo_ids.push(nearest_ids);
}