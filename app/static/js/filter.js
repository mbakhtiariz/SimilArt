// Set the positions of slider based on page ratio:
const filtering_section = document.getElementById("filtering_section");
filtering_section.style.position = 'absolute';
filtering_section.style.top = filter_sec_top;
filtering_section.style.paddingTop = '0';

const filtering_checkbox_section = document.getElementById("similar_too_div");
filtering_checkbox_section.style.position = 'absolute';
filtering_checkbox_section.style.top = '60px';
filtering_checkbox_section.style.left = filter_checkbox_padding_left;

const time_values_section = document.getElementById("time_filter_values");
time_values_section.innerHTML = "From <span>2500 BC</span> to <span>2017 AD</span>";
time_values_section.style.position = 'absolute';
time_values_section.style.top = '60px';
time_values_section.style.left = ((0.5 * svgwidth) - (0.5 * time_values_section.clientWidth)).toString() + "px";

const filtering_cat_section = document.getElementById("cat_div");
filtering_cat_section.style.position = 'absolute';
filtering_cat_section.style.top = '60px';
filtering_cat_section.style.left = filter_cat_padding_left;

// Range slider for time filter
var sliderRange = d3
    .sliderBottom()
    .min(-2500)
    .max(2017)
    .width(svgwidth * .95)
    .default([-2500, 2017])
    .step(1)
    .ticks(20)
    .handle('M -8, 0 a .025,.025 0 1,1 10,0 a 0.25,0.25 0 1,1 -10,0')
    // slider color:
    .fill('#56B8CF')
    .on('drag', function () {
        let start_time = parseInt(sliderRange.value()[0]);
        start_time = Math.abs(start_time) == start_time ? start_time.toString()+" AD" : Math.abs(start_time).toString()+" BC";
        let end_time = parseInt(sliderRange.value()[1]);
        end_time = Math.abs(end_time) == end_time ? end_time.toString()+" AD" : Math.abs(end_time).toString()+" BC";

        time_values_section.innerHTML = "From <span>" + start_time + "</span> to <span>" + end_time + "</span>";
        time_values_section.style.left = ((0.5 * svgwidth) - (0.5 * time_values_section.clientWidth)).toString() + "px";
    })
    .on('end', val => {
        if (document.getElementById("similar_too").checked === true)
        {
            d3.selectAll("g#middle_image")
            .style("opacity", 0)
            .remove();
            handle_stacks();
            change_similar_images();
        }
        else {
            d3.selectAll("g#outside_image")
                .style("opacity", 0)
                .remove();

            d3.select('p#value-range').text(val);
            change_dissimilar_images();
        }
    })

var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', svgwidth)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate('+timeslider_padding_left+',10)')
    .call(sliderRange);

function change_category(){
    if (document.getElementById("similar_too").checked){
        handle_stacks();
        change_similar_images();
    }
    else{
        change_dissimilar_images();
    }
}

function filter_similars(){
    if (document.getElementById("similar_too").checked){
        handle_stacks();
        change_similar_images();
    }
}