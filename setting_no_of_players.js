var number_of_players = function() {
  var options_of_num_of_players = document.getElementById("number_of_player");
  var num_of_players = (
    options_of_num_of_players.options[options_of_num_of_players.selectedIndex].value);
  if (num_of_players === 'computer') {
    return "1"
  }
  return "2"
};


var change_player_score_text = function() {
  if (number_of_players() === "2") {
    $("#player_2_score").css('visibility','visible');
    $("#computer_score").css('visibility','hidden');
    return
  }
  $("#player_2_score").css('visibility','hidden');
  $("#computer_score").css('visibility','visible');
  with_computer = true;
};


$(document).on('change', '#number_of_player', function() {
  change_player_score_text()
})
