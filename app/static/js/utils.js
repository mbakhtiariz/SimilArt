// Interpolate between two [r, g, b] colors with percentage p between 0 and 1
//https://stackoverflow.com/questions/14482226/how-can-i-get-the-color-halfway-between-two-colors
function colourGradientor(p, rgb_beginning, rgb_end){
    var w = p * 2 - 1;
    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;
    var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
                parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
                parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];

    return rgb;
};

// Function for sanitizing strings from the data that contain HTML characters
function stripHtml(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function get_meta(listener) {
    fetch("static/subset_meta.json").then(response => {
        if (response.ok) {
            console.log("Loading json from disk");
            return response.json();
        } else {
            console.log("JSON file missing");
            console.log("Sending request to create json");
            socket.emit('create_meta_json');
        }
    })
    .then(json => {
        if (json) {
            data = json;
            available_ids = Object.keys(data);
            console.log("Data loaded");
            artnames_to_ids = {};
            artists_to_ids = {};
            artnames_list_cased = new Set();
            artists_list_cased = new Set();
            for(const key in data){
                let art_name =  stripHtml(data[key]['artwork_name']);
                let artist_name =  stripHtml(data[key]['artist_full_name']);
                // For dictionary keys, strip HTML characters and do lowercasing
                let art_name_lower = art_name.toLowerCase();
                let artist_name_lower = artist_name.toLowerCase();

                // Mapping from lowercased names to artwork id for search
                if (artnames_to_ids[art_name_lower] == undefined) {
                    artnames_to_ids[art_name_lower] = [key];
                } else {
                    artnames_to_ids[art_name_lower].push(key);
                }
                if (artists_to_ids[artist_name_lower] == undefined) {
                    artists_to_ids[artist_name_lower] = [key];
                } else {
                    artists_to_ids[artist_name_lower].push(key);
                }
                // List of upper/lowercased names (as in dataset) for autocompletion
                artnames_list_cased.add(art_name);
                artists_list_cased.add(artist_name);
            }
            artnames_list_cased = Array.from(artnames_list_cased); //from set to list
            artists_list_cased = Array.from(artists_list_cased); //from set to list
            // Sort the autocompletion lists
            artnames_list_cased.sort();
            artists_list_cased.sort();
            // Finally set the listener to true
            listener.set(true);
        }
    });
}

// This can be used to execute code once a flag become true
function TrueListener(callback, init_val=false) {
    this.value = init_val;
    this.onTrue = callback;

    // Check if starting with true
    if (init_val == true) {
        this.onTrue();
    }

    // value getter
    this.get = function() {
        return this.value;
    }
    
    // value setter
    this.set = function(v) {
        if (v == true) {
            this.value = true;
            this.onTrue();
        }
    }
}