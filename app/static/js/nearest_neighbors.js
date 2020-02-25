// Connection needed for the nearest neighbor queries
var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
	console.log('Websocket connected!');
});

// distances and nearest neighbor ids are stored in variables below
var dists = []
var nearest_ids = []

// Functions needed for the nearest neighbor queries
function nearest_neighbors(id, n_neighbors) {
	console.log('Getting nearest neighbors...');
	socket.emit('nearest_neighbors', {id: id, n: n_neighbors});
}

socket.on('nearest_neighbors_data', function(data) {
	dists = data.dists;
	nearest_ids = data.ids;
	console.log(nearest_ids);
});
