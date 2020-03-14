// Connection needed for the nearest neighbor queries
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	console.log('Websocket connected!');
});

// distances and nearest neighbor ids are stored in variables below
var dists = []
var nearest_ids = []

// store similarity scores for inside area
var sim_scores_nearest = []

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
	sim_scores_nearest = data.sim_scores;
	logsss = data.log;
	console.log(";;;;;;;;;;;;;;;;;;;;", logsss)
	NEIGHBORS_LISTENER.callback();
	console.log("nearest ids:", nearest_ids);
});

// store similarity scores for outside area
var sim_scores_explore = []

function get_sim_scores(id, ind) {
	console.log('Getting similarity scores...');

	var promise = new Promise(function(resolve, reject) {
		SIM_SCORE_LISTENER = new Listener(function () {
			// setTimeout(resolve, 10);
			resolve();
		});
	});
	socket.emit('get_sim_scores', {id: id, ind: ind});
	return promise
}

socket.on('get_sim_scores_data', function(data) {
	sim_scores_explore = data.sim_scores;
	SIM_SCORE_LISTENER.callback();
});

// If .callback() is called on a Listener() object, the callback code is executed
function Listener(callback) {
	this.onCallback = callback;
	this.callback = function() {
		this.onCallback();
	}
}
