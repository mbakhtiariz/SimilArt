function change_similar_images(plot_dissimilar=false) {
    // if central image has been seen before use the precomputed locations for similar images otherwise calculate their positions:
    if (document.getElementById("similar_too").checked === true){
        start_time = parseInt(sliderRange.value()[0]);
        end_time = parseInt(sliderRange.value()[1]);
        category = document.getElementById("general_cats").value
    }
    else{
        start_time=-5000
        end_time=2020
        category="all"
    }

    // Remove all current images
    d3.selectAll("g#middle_image")
        .transition()
        .duration(removal_transition_speed)
        .style("opacity", 0)
        .remove();

    /*
    Here we find the "n" similar images to the central image, using KNN method.
    We also define the coordinates for each of those similar images.
    */
    // Wait until neighbouring images is found
    timer_loading = setTimeout(function () {
        middle.append("text").text('Loading...')
            .attr("class","middle")
            .attr("id","filter_loading")
            .style("fill","darkgrey")
            .style("stroke-width","0")
            .style('opacity', 0)
            .transition()
            .duration(appearance_transition_loading)
            .style('opacity', 1)
            .attr("x","10")
            .attr("y","22");
    }, time_till_loading_appearance);

    nearest_neighbors(middle_image, nr_similar_images, start_time, end_time, category).then(() => {
        similarity_plotter_id += 1; // Increase plotter ID for the similar_layout function
        const plot_id = similarity_plotter_id;
        // Remove all current images
        d3.selectAll("g#middle_image")
            .transition()
            .duration(removal_transition_speed)
            .style("opacity", 0)
            .remove();

        clearTimeout(timer_loading);
        d3.selectAll("#filter_loading")
        .transition()
        .duration(appearance_transition_loading)
        .style("opacity", 0)
        .remove();

        // --- selecting location of similar layer and plotting those images:
        try{
            const center_x = parseFloat(d3.select("image#center").attr("x"));
            const center_y = parseFloat(d3.select("image#center").attr("y"));
            const center_width = parseFloat(d3.select("image#center").attr("width"))+3.5;
            const center_height = parseFloat(d3.select("image#center").attr("height"))+3.5;
            const center_info = {"x": center_x, "y": center_y, "width": center_width, "height": center_height};
            const outer = {"x": 20, "y": 20, "width": middle_width-40, "height": middle_height-40};
            var similar_locs = [];
            similar_layout(middle, nearest_ids, center_info, outer, data, sim_scores_nearest, similar_locs, similar_image_size, plot_id);
            selected_locs_dict[middle_image.toString()] = similar_locs;
            selected_nearest_ids_dict[middle_image.toString()] = nearest_ids;

            //update dissimlar images then!
            if (plot_dissimilar)
            {
                d3.selectAll("g#outside_image")
                .style("opacity", 0)
                .remove();
                change_dissimilar_images();
            }
            else{
                plot_dissimilar_images(images_ids_subset, transition=false);
            }
        } catch (exception){
            handle_stacks();
            change_similar_images(plot_dissimilar=plot_dissimilar);
            return
        }
    });
}
