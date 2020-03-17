// Search results
let search_results = [];
let result_idx = 0;

let search_img_size = 150;
let search_button_radius = 20;
let search_width = 250;
let search_img_margin = (search_width - search_img_size) / 2;
let button_margins = (search_img_margin - (2 * search_button_radius)) / 2;

// Add area for resulting images
let search_results_area = d3.select("#search_results")
    .append("svg")
        .attr("width", search_width) // Generally 210px wide
        .attr("height", search_img_size);

let search_results_details = d3.select("#search_results")
    .append("div")
        .attr("id", "search_details")
        .style("width", "210px")
        .style("height", "150px")
        .style("margin-left", "20px")
        .style("margin-right", "20px")
        .style("margin-top", "20px");

// Add rectangle that displays resulting images location
search_results_area.append("rect")
    .attr("class", "searchImage")
    .attr("x", search_img_margin)
    .attr("width", search_img_size)
    .attr("height", search_img_size)
    .attr("pointer-events", "visible")
    .style("fill", "none")
    .style("stroke-width", 2)
    .style("stroke", "grey")
    .style("opacity", 0.6);

// Add button for scrolling right
let search_right = search_results_area.append("g")
    .on("click", function() {
        if (search_results.length == 0) return // If no results, do nothing

        result_idx++;
        if (result_idx >= search_results.length) result_idx = 0;
        set_result_img(search_results[result_idx])
    });

let search_right_circle = search_right.append("circle")
    .attr("id", "search_results_right")
    .attr("class", "button")
    .attr("cx", search_width - button_margins - search_button_radius)
    .attr("cy", 0.5*search_img_size)
    .attr("r", search_button_radius)
    .style("opacity", 0)
    .style("fill", "grey")
    .on("mouseover", function(d){

        d3.select(this).style('opacity', 0.6)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Scroll right")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        d3.select(this).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

// Add right scroll icon
search_right.append("image")
    .attr("href", "static/icons/" + 'right.png')
    .attr("class", "button")
    .attr("height", button_size / 2)
    .attr("width", button_size / 2)
    .attr("x", search_width - button_margins - 1.5*search_button_radius)
    .attr("y", 0.5*search_img_size - 0.5*search_button_radius)
    .attr("clip-path", "url(#clip)")
    .on("mouseover", function(d){
        search_right_circle.style('opacity', 0.6)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Scroll right")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });



// Add button for scrolling left
let search_left = search_results_area.append("g")
.on("click", function() {
    if (search_results.length == 0) return // If no results, do nothing

    result_idx--;
    if (result_idx < 0) result_idx = search_results.length - 1;
    set_result_img(search_results[result_idx])
});

let search_circle_left = search_left.append("circle")
    .attr("id", "search_results_left")
    .attr("class", "button")
    .attr("cx", button_margins + search_button_radius)
    .attr("cy", 0.5*search_img_size)
    .attr("r", search_button_radius)
    .style("opacity", 0)
    .style("fill", "grey")
    .on("mouseover", function(d){
        d3.select(this).style('opacity', 0.6)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Scroll left")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        d3.select(this).style('opacity', 0)
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

// Add left scroll icon
search_left.append("image")
    .attr("href", "static/icons/" + 'left.png')
    .attr("class", "button")
    .attr("height", button_size / 2)
    .attr("width", button_size / 2)
    .attr("x", button_margins + 0.5*search_button_radius)
    .attr("y", 0.5*search_img_size - 0.5*search_button_radius)
    .attr("clip-path", "url(#clip)")
    .on("mouseover", function(d){
        search_circle_left.style('opacity', 0.6)
        timer_tooltip = setTimeout(function () {
            tooltip_buttons.html("Scroll left")
            return tooltip_buttons.style("visibility", "visible");
        }, time_till_tooltip_appearance);
    })
    .on("mousemove", function(){
        return tooltip_buttons.style("top", (event.pageY+10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d){
        clearTimeout(timer_tooltip);
        return tooltip_buttons.style("visibility", "hidden");
    });

// Call this function to change the autocomplete list
function change_search_cat() {
    let value = document.getElementById("search_cat").value;
    if (value == "Art name") {
        autocomplete(document.getElementById("search_key"), artnames_list_cased);
    } else {
        autocomplete(document.getElementById("search_key"), artists_list_cased);
    }
}

// This functions handles any search by click/enter. These listeners are set in autocomplete.js
function handle_search() {
    search_cat = document.getElementById("search_cat").value.toLowerCase();
    // Set the correct lookup dictionary depending on artname/artist name
    if(search_cat === "art name") {
        dictionary = artnames_to_ids;
    } else {
        dictionary = artists_to_ids;
    }

    let dict_search_key = stripHtml(document.getElementById("search_key").value).toLowerCase();
    let results = dictionary[dict_search_key];

    // If we have results
    if (results !== undefined && dict_search_key != ""){
        search_results = results; // Set the global variable
        result_idx = 0; // Reset the results index for looping
        set_result_img(search_results[0]) // Set the results image

    // If no results
    } else {
        search_results_area.selectAll(".searchImage").remove(); // Remove old image
        search_results_area.append("rect")
            .attr("class", "searchImage")
            .attr("x", search_img_margin)
            .attr("width", search_img_size)
            .attr("height", search_img_size)
            .attr("pointer-events", "visible")
            .style("fill", "none")
            .style("stroke-width", 2)
            .style("stroke", "grey")
            .style("opacity", 0.6);
        document.getElementById("search_results_header").innerHTML = "Search Results:";
        document.getElementById('search_details').innerHTML = "No results found.";
    }
}

function set_result_img(id) {
    // Display image in correct dimensions
    let result_img = new Image();

    result_img.onload = function () {
        let img_width = result_img.width;
        let img_height = result_img.height;
        var ratio = img_width / img_height;

        // If image width > height
        if (ratio > 1) {
            img_width = search_img_size;
            img_height = search_img_size / ratio;

        // If image height > width
        } else {
            img_width = search_img_size * ratio;
            img_height = search_img_size;
        }
        let image_x = (search_img_size * 0.5 - img_width / 2) + search_img_margin;
        let image_y = (search_img_size * 0.5 - img_height / 2);

        search_results_area.selectAll(".searchImage").remove(); // Remove old rect
        search_results_area.append("image") // Add new image
            .attr("class", "searchImage")
            .attr("href", imgs_path + id + ".jpg")
            .attr("height", img_height)
            .attr("width", img_width)
            .attr("x", image_x)
            .attr("y", image_y)
            .attr("pointer-events", "visible")
            .attr("clip-path", "url(#clip)");
        search_results_area.append("rect") // Add rect for click events
            .attr("class", "searchImage")
            .attr("height", img_height)
            .attr("width", img_width)
            .attr("x", image_x)
            .attr("y", image_y)
            .attr("filter", "url(#glow)")
            .attr("pointer-events", "visible")
            .style("fill", "none")

            .on('click', function() { // On click, set to center image
                var modalImg = document.getElementById("img01");
                modalImg.src = data[d3.select("image.searchImage").attr('href').replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')]['image_url'];

                closeNav();
                handle_stacks();

                // change middle_image variable and call function, both from test.html;
                middle_image = (imgs_path + id + ".jpg").replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
                d3.select('image#center').transition()
                    .duration(removal_transition_speed_middle_image)
                    .style('opacity', 0)
                    .remove();
                d3.select('rect#center').remove();
                // d3.select('rect#center').remove();
                d3.select('rect#border').remove();
                set_center(center, middle_image);
                change_similar_images();
            });
    }

    result_img.src = imgs_path + id + ".jpg";

    // Get the metadata
    let artwork_name = data[id]['artwork_name'];
    let artist_full_name = data[id]['artist_full_name'];
    let creation_year = data[id]['creation_year'];
    let num_results = (search_results.length).toString();
    let num_results_str = "Search Results [" + (result_idx+1).toString() + "/" + num_results + "]:";
    document.getElementById("search_results_header").innerHTML = num_results_str;
    document.getElementById('search_details').innerHTML = "<i>" + artwork_name + ".</i><br /><br /><b>" + artist_full_name + " (" + creation_year + ")</b>";
}
