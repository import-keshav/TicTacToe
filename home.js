var player_1_score = 0;
var player_2_score = 0;
var tie_score = 0;
var computer_score = 0;
var with_computer = false;

var response_sequense = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
var game_counter = 0;

var increment_player_score = function(score) {
  var score_object = document.createElement("span");
  score = score.toString();
  score_object.innerHTML = score;
  $(score_object).css({
    "left": "350px",
    "top": "450px",
    "color": "white",
    "position": "absolute",
    "font-size": "30px"
  });
};


var possible_ways  = {
  '1': ['23', '47', '59'],
  '2': ['13', '58'],
  '3': ['69', '12', '57'],
  '4': ['17', '56'],
  '5': ['28', '46', '19', '37'],
  '6': ['39', '54'],
  '7': ['14', '53', '89'],
  '8': ['52', '79'],
  '9': ['63', '15', '87']
}


var restart = function() {
  $(".cross_and_circle").remove();
  game_counter = 0;
}


var is_win = function(box_id) {
  var to_check = $('#' + box_id)[0].innerText;
  var num_id = box_id.split("box_")[1];
  var num_of_ways = possible_ways[num_id];
  for (way in num_of_ways) {
      ids = num_of_ways[way].split('');
      try {
        if ($('#box_' + ids[0]).children()[0].innerText === to_check &&
          $('#box_' + ids[1]).children()[0].innerText === to_check) {
          return true;
        }
      }
      catch(err) {
      }
  }
};


var append_cross_or_circle = function(box_id) {
  if ($('#' + box_id).children().length === 0) {
    var cross_and_circle_object = document.createElement("span");
    cross_and_circle_object.innerHTML = response_sequense[game_counter];
    game_counter += 1;
    $(cross_and_circle_object).css({
      "font-size": "60px",
      "margin-left": "10px",
      "color": "white"
    });
  }
  $('#' + box_id).append(cross_and_circle_object);
  $(cross_and_circle_object).addClass('cross_and_circle');
};


var update_score = function(player) {
  if (player === "player_1") {
    alert("Player 1 wins");
    player_1_score += 1;
    $(".player_1_score_number").html(player_1_score);
    return;
  }
  else if (player === "player_2") {
    alert("Player 2 wins");
    player_2_score += 1;
    $(".player_2_score_number").html(player_2_score);
    return;
  }
  else if (player === "computer") {
    alert("Computer wins");
    computer_score += 1;
    $(".computer_score_number").html(computer_score);
    return;    
  }
  alert("Game is TIE");
  tie_score += 1;
  $(".tie_score_number").html(tie_score);
};


var enter_player_response = function(obj) {
  var box_id = $(obj).attr('id');
  append_cross_or_circle(box_id);

  if (is_win(box_id)) {
    var who_win = $('#' + box_id)[0].innerText;

    if(who_win === "X") {
      update_score("player_1");
      restart();
      return;
    }
    if (!with_computer) {
      update_score("player_2");
      restart();
      return;
    }
    update_score("computer");
    restart();
    return;
  }

  if(game_counter === 9) {
    update_score("tie")
    restart();
  }

  if (with_computer) {
    enter_computer_response();
  }
};


$(document).ready(function() {
  change_player_score_text();
   var num_of_players = number_of_players();

   if (num_of_players === "2") {
     with_computer = false;
     return;
   }
   with_computer = true;
   return;
});
