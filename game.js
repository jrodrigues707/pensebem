var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).on("keypress", function(){
  if (started == false){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }});


function nextSequence(){
  userClickedPattern = [];
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
};


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
      nextSequence();
      }, 1000);
    }
  } else
  {
    playSound('wrong');
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
};

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatedPress(userChosenColour)
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};


function animatedPress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
