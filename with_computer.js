var edges_set = [1, 3, 7, 9];

var call_click = function(box_id) {
	setTimeout(function(){
		$('#box_' + box_id).trigger("click");
	}, 300);
};

var get_random_edges_box_id = function() {
  var rndm = Math.floor(Math.random() * edges_set.length);
  return edges_set[rndm];
};


var first_attempt = function() {
	if ($('#box_5').children().length === 0) {
		call_click(5);
		return;
	}

	while (1) {
		var random_edges_box_id = get_random_edges_box_id();
		if ($('#box_' + random_edges_box_id).children().length === 0) {
			call_click(random_edges_box_id);
			break;
		}
	}
	return;
};


var enter_computer_response = function() {
	if (game_counter === 1) {
		first_attempt();
	}
};
