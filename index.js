var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userpattern = [];
var flagstart = false;
var notflag = true;
var level = -1;
var wrong = new Audio("sounds/wrong.mp3");

function nextsequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  level++;
  $("h1").text("level :" + level);

  return randomNumber;
}

$(".btn").click(function (event) {
  if (flagstart == true && userpattern.length < gamepattern.length) {
    var clickid = this.id;
    userpattern.push(clickid);
    playmusic(this.id);
    autopress(this.id);
    for (var j = 0; j < userpattern.length; j++) {
      if (userpattern[j] != gamepattern[j]) {
        gameover();
        setTimeout(gamereset, 1000);
      } else {
        if (userpattern.length == gamepattern.length) {
          userpattern = [];
          setTimeout(autoplay, 1000);
        }
      }
    }
  } else {
    gameover();
    setTimeout(gamereset, 1000);
  }
});
$(document).keypress(function (event) {
  if (event.key == "a" && flagstart == false) {
    var randomchoosencolor = buttoncolors[nextsequence()];
    gamepattern.push(randomchoosencolor);
    playmusic(randomchoosencolor);
    autopress(randomchoosencolor);
    flagstart = true;
  }
});

function autopress(id) {
  $("#" + id)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  $("#" + id).addClass("pressed");
  setTimeout(function () {
    $("#" + id).removeClass("pressed");
  }, 100);
}

function playmusic(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameover() {
  autopress(this.id);
  $("body").addClass("game-over");
  $("h1").text("GAME OVER");

  wrong.play();
  flagstart = false;
}

function gamereset() {
  level = -1;
  $("h1").text("Press A Key to Start");
  $("body").removeClass("game-over");
  gamepattern = [];
  userpattern = [];
}

function autoplay() {
  var randomchoosencolor = buttoncolors[nextsequence()];
  gamepattern.push(randomchoosencolor);
  playmusic(randomchoosencolor);
  autopress(randomchoosencolor);
}
