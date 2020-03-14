// Connection needed for the nearest neighbor queries
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	console.log('Websocket connected!');
});

// distances and nearest neighbor ids are stored in variables below
var dists = []
var nearest_ids = []

// store cosine similarity
var cos_sims_nearest = []

// Functions needed for the nearest neighbor queries
function nearest_neighbors(id, n_neighbors, start_time, end_time, category) {
	console.log('Getting nearest neighbors...');
	
	var promise = new Promise(function(resolve, reject) {
		NEIGHBORS_LISTENER = new Listener(function () {
			// setTimeout(resolve, 10);
			resolve();
		});
	});
	socket.emit('nearest_neighbors', {id: id, n: n_neighbors, start_time: start_time, end_time: end_time, category: category});
	return promise
}

socket.on('nearest_neighbors_data', function(data) {
	dists = data.dists;
	nearest_ids = data.ids;
	cos_sims_nearest = data.cos_sims;
	logsss = data.log;
	console.log(";;;;;;;;;;;;;;;;;;;;", logsss)
	NEIGHBORS_LISTENER.callback();
	console.log("nearest ids:", nearest_ids,);
	// console.log("cos sim nearest:", cos_sims_nearest);
});

// store cosine similarity
var cos_sims_explore = []

function get_cosine_sim(id, ind) {
	console.log('Getting cosine similarity...');

	var promise = new Promise(function(resolve, reject) {
		SIM_SCORE_LISTENER = new Listener(function () {
			// setTimeout(resolve, 10);
			resolve();
		});
	});
	socket.emit('get_cosine_sim', {id: id, ind: ind});
	return promise
}

socket.on('get_cosine_sim_data', function(data) {
	cos_sims_explore = data.cos_sims;
	SIM_SCORE_LISTENER.callback();
	// console.log("cos sims explore area:", cos_sims_explore);
});

// If .callback() is called on a Listener() object, the callback code is executed
function Listener(callback) {
	this.onCallback = callback;
	this.callback = function() {
		this.onCallback();
	}
}
