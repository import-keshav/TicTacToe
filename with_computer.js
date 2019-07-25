var edges_set = [1, 3, 7, 9];

var call_click = function(box_id) {
  last_computer_response_box_id = 'box_' + box_id;
	setTimeout(function(){
		$('#box_' + box_id).trigger("click");
	}, 300);
};

var get_random_edges_box_id = function(edges_set) {
  var rndm = Math.floor(Math.random() * edges_set.length);
  return edges_set[rndm];
};


var can_win = function(box_id, player) {
  var num_id = box_id.split("box_")[1];
  var num_of_ways = possible_ways[num_id];
  for (way in num_of_ways) {
    ids = num_of_ways[way].split('');
    if ($('#box_' + ids[0])[0].childElementCount === 1 &&
    		$('#box_' + ids[1])[0].childElementCount === 0) {
      if ($('#box_' + ids[0]).children()[0].innerText === "X" && player === "player") {
        return {
        	'is_win': true,
        	'ids': ids[1]
        }
      }
      if ($('#box_' + ids[0]).children()[0].innerText === "O" && player === "computer") {
        return {
          'is_win': true,
          'ids': ids[1]
        }
      }
    }
    if ($('#box_' + ids[0])[0].childElementCount === 0 &&
    		$('#box_' + ids[1])[0].childElementCount === 1) {
      if ($('#box_' + ids[1]).children()[0].innerText === "X" && player === "player" ) {
        return {
        	'is_win': true,
        	'ids': ids[0]
        }
      }
      if ($('#box_' + ids[1]).children()[0].innerText === "O" && player === "computer") {
        return {
          'is_win': true,
          'ids': ids[0]
        }
      }
    }
  };
  return {
    'is_win': false,
    'ids': []
  }
};


var find_empty_relevent_box_id = function(ids) {
	if ($('#box_' + ids[0]).children()[0].innerText === "X") {
		return ids[1]
	}
	return ids[0];
}


var first_attempt = function() {
	if ($('#box_5').children().length === 0) {
		call_click(5);
		return;
	}

	while (1) {
		var random_edges_box_id = get_random_edges_box_id(edges_set);
		if ($('#box_' + random_edges_box_id).children().length === 0) {
			call_click(random_edges_box_id);
			break;
		}
	}
	return;
};


var response_to_random_empty_box = function() {
  var edges_set = ['1', '3', '7', '9'];
  var non_edges_set = ['2', '4', '6', '7']
  var empty_box_ids = [];

  for (j=0; j<edges_set.length; j++) {
    if($("#box_" + edges_set[j])[0].childElementCount === 0) {
      empty_box_ids.push(edges_set[j]);
    }
  }
  if (empty_box_ids.length > 0) {
    var random_num = Math.floor(Math.random() * empty_box_ids.length);
    var random_box_id = empty_box_ids[random_num];
    call_click(random_box_id);
    return;
  }

  for (i=1; i<non_edges_set.length; i++) {
    if($("#box_" + i)[0].childElementCount === 0) {
      empty_box_ids.push(i);
    }
  }
  var random_num = Math.floor(Math.random() * empty_box_ids.length);
  var random_box_id = empty_box_ids[random_num];
  call_click(random_box_id);
}

var enter_computer_response = function(player_response_box_id) {	
	if (game_counter === 1) {
		first_attempt();
		return;
	}
  var can_computer_win = can_win(last_computer_response_box_id, "computer");
  if (can_computer_win['is_win']) {
    call_click(can_computer_win.ids)
    return
  }
	var can_player_win = can_win(player_response_box_id, "player");
	if (can_player_win['is_win']) {
		call_click(can_player_win.ids);
    return;
	}

  response_to_random_empty_box();
};
