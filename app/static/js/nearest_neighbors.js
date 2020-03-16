// Connection needed for the nearest neighbor queries
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	// console.log('Websocket connected!');
});

// distances and nearest neighbor ids are stored in variables below
var dists = []
var nearest_ids = []

// store cosine similarity 
var cos_sims_nearest = []

// Functions needed for the nearest neighbor queries
function nearest_neighbors(id, n_neighbors) {
	// console.log('Getting nearest neighbors...');
	socket.emit('nearest_neighbors', {id: id, n: n_neighbors});
}

socket.on('nearest_neighbors_data', function(data) {
	dists = data.dists;
	nearest_ids = data.ids;
	cos_sims_nearest = data.cos_sims;
	// console.log("nearest ids:", nearest_ids);
	// console.log("cos sim nearest:", cos_sims_nearest);
});

// store cosine similarity 
var cos_sims_explore = []

function get_cosine_sim(id, ind) {
	// console.log('Getting cosine similarity...');
	socket.emit('get_cosine_sim', {id: id, ind: ind});
}

socket.on('get_cosine_sim_data', function(data) {
	cos_sims_explore = data.cos_sims;
	// console.log("cos sims explore area:", cos_sims_explore);
});
