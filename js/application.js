$(document).ready(function() {

  var $body       = $('body');
  var $frogger    = $('.frogger');
  var $modal      = $('.modal');
  var $game       = $('.game');
  var $playerOne  = $('.player-one-time');
  var $playerTwo  = $('.player-two-time');

  var playerOneScore  = parseFloat($('.player-one-time').text());
  var playerTwoScore  = parseFloat($('.player-two-time').text());
  var time        = parseFloat($('.time').text());
  var turn        = 6;

  var moveCarOne;
  var moveCarTwo;
  var moveCarThree;
  var moveDozer;
  var moveDozerTwo;
  var moveTruck;
  var playTime;

  var froggerAnimation = false;

  function init() {
    bindStartGame();
  };

  init();

  // start gameplay
  function bindStartGame() {
    // click start
    $('.start-button').one('click', function(){
      $('.start-sound')[0].play();
      playTime = setInterval(counter, 1000);
      moveVehicles();
      moveFrogger();
      resetGame();
    });
  }

  // start timer
  function counter() {
    time++;
    if (time < 10) {
      time = '0' + time;
    }
    $('.time').text(time);
  };

  // animate vehicles
  function moveVehicles() {
    // generateCarOne();
    // moveCarOne = setInterval(generateCarOne, 2000);
    // generateCarTwo();
    // moveCarTwo = setInterval(generateCarTwo, 1750);
    // generateCarThree();
    // moveCarThree = setInterval(generateCarThree, 2000);
    // generateDozer();
    // moveDozer = setInterval(generateDozer, 2500);
    // generateDozerTwo();
    // moveDozerTwo = setInterval(generateDozerTwo, 2500);
    // generateTruck();
    // moveTruck = setInterval(generateTruck, 4500);
  };


  function generateCarOne() {
    var $newCar = $('<img class="vehicle car" src="assets/car.png">');

    $game.append($newCar);

    $newCar.delay(750).animate({
      left: "+=855px",
    }, {
      // set vehicle speed
      duration: 8000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '800px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  function generateCarTwo() {
    var $newCar = $('<img class="vehicle car-2" src="assets/car2.png">');

    $game.append($newCar);

    $newCar.animate({
      left: "-=850px",
    }, {
      // set vehicle speed
      duration: 8000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '0px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  function generateCarThree() {
    var $newCar = $('<img class="vehicle car-3" src="assets/car.png">');

    $game.append($newCar);

    $newCar.animate({
      left: "+=850px",
    }, {
      // set vehicle speed
      duration: 8000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '800px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  function generateDozer() {
    var $newDozer = $('<img class="vehicle dozer" src="assets/dozer.png">');

    $game.append($newDozer);

    $newDozer.delay(750).animate({
      left: "-=850px",
    }, {
      // set vehicle speed
      duration: 9000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '0px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  function generateDozerTwo() {
    var $newDozer = $('<img class="vehicle dozer-2" src="assets/dozer.png">');

    $game.append($newDozer);

    $newDozer.animate({
      left: "-=850px",
    }, {
      // set vehicle speed
      duration: 9000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '0px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  function generateTruck() {
    var $newTruck = $('<img class="vehicle truck" src="assets/truck.png">');

    $game.append($newTruck);

    $newTruck.animate({
      left: "+=1000px",
    }, {
      // set vehicle speed
      duration: 12000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '-192.5px').remove();
      },
      // check for frogger collision
      progress: collisionDetection
    });
  };

  // detect collision between frogger and vehicles
  function collisionDetection() {
    // frogger location
    var froggerTop    = parseInt($frogger.css('top'));
    var froggerBottom = parseInt($frogger.css('height')) + froggerTop;
    var froggerLeft   = parseInt($frogger.css('left'));
    var froggerRight  = parseInt($frogger.css('width')) + froggerLeft;
    // vehicle location
    var vehicleLeft   = parseInt($(this).css('left'));
    var vehicleRight  = parseInt($(this).css('width')) + vehicleLeft;
    var vehicleTop    = parseInt($(this).css('top'));
    var vehicleBottom = parseInt($(this).css('height')) + vehicleTop;

    // detect for collision
    if  ((vehicleLeft < froggerRight) && (vehicleRight > froggerLeft)
      && (vehicleTop < froggerBottom) && (vehicleBottom > froggerTop)) {
        lastHop('frogger-dead', '.squash', false, false);
        gameOver();
    };
  };

  // move frogger
  function moveFrogger() {
    $body.off().on("keydown", function(e) {
      e.preventDefault();

      // hop upward
      if (e.keyCode == '38' && !froggerAnimation) {
        if (parseInt($frogger.css('top')) > 5) {
          $frogger.animate({
            top: "-=50px"
          }, {
            duration: 'fast',
            start: function() {
              startHop('jumping-up');
            },
            complete: function() {
              var froggerTop = parseInt($frogger.css('top'));
              if (froggerTop <= 45) {
                gameOver();
              } else {
                completeHop('frogger-up');
              };
            }
          });
        };

      // hop downward
      } else if (e.keyCode == '40' && !froggerAnimation) {
        if (parseInt($frogger.css('top')) < 449) {
          $frogger.animate({
            top: "+=50px"
          }, {
            duration: 'fast',
            start: function() {
              startHop('jumping-down');
            },
            complete: function() {
              completeHop('frogger-down');
            }
          });
        };

      // hop right
      } else if (e.keyCode == '39' && !froggerAnimation) {
        if (parseInt($frogger.css('left')) < 750) {
          $frogger.animate({
            left: "+=50px"
          }, {
            duration: 'fast',
            start: function() {
              startHop('jumping-right');
            },
            complete: function() {
              completeHop('frogger-right');
            }
          });
        };

      // hop left
      } else if (e.keyCode == '37' && !froggerAnimation) {
        if (parseInt($frogger.css('left')) > 0) {
          $frogger.animate({
            left: "-=50px"
          }, {
            duration: 'fast',
            start: function() {
              startHop('jumping-left');
            },
            complete: function() {
              completeHop('frogger-left');
            }
          });
        };
      };
    });
  };

  // hop animation
  function startHop(direction) {
    froggerAnimation = true;
    $('.hop')[0].play();
    clearFroggerClass();
    $frogger.addClass(direction);
  }

  // end hop animation
  function completeHop(direction) {
    froggerAnimation = false;
    $('.hop')[0].pause();
    $('.hop')[0].currentTime = 0;
    clearFroggerClass();
    $frogger.addClass(direction);
  }

  // win + die animation
  function lastHop (toggleClass, sound, clearQueue, jumpToEnd) {
    clearFroggerClass();
    $frogger.addClass(toggleClass);
    $(sound)[0].play();
    $frogger.stop(clearQueue, jumpToEnd);
    $body.off('keydown');
  }

  function clearFroggerClass() {
    $frogger.removeClass('frogger-up frogger-right frogger-down frogger-left jumping-up jumping-right jumping-down jumping-left frogger-dead frogger-wins');
  };

  function getScore(playerScore, player) {
    if ($frogger.hasClass('frogger-wins')) {
      if (playerScore === 0) {
        player.text(time);
      } else if (time <= playerScore) {
        player.text(time);
      }
    };
  };

  function gameOver() {
    // stop animation + generating vehicles
    $('.vehicle').stop(true);
    clearInterval(moveCarOne);
    clearInterval(moveCarTwo);
    clearInterval(moveCarThree);
    clearInterval(moveDozer);
    clearInterval(moveDozerTwo);
    clearInterval(moveTruck);
    clearInterval(playTime);

    // show game over modal
    $modal.css('display', 'block');
    // if frogger dies
    if ($frogger.hasClass('frogger-dead')) {
      $('.modal-content').append("<p class='status'>Frogger is dead!</p>");

    // if frogger wins
    } else {
      lastHop('frogger-wins', '.win-sound', false, true);
      $('.modal-content').append("<p class='status'>Frogger is alive!</p>");
    };

    // calculate score
    if (turn % 6 == 0) {
      getScore(playerOneScore, $playerOne);
    } else {
      getScore(playerTwoScore, $playerTwo);
    }

    // declare winner

  };

  function resetGame() {
    // click play again
    $('.reset').off().on('click', function() {
      // remove vehicles
      $('.vehicle').remove();
      // reset frogger
      clearFroggerClass();
      $frogger.removeAttr('style');
      $frogger.addClass('frogger-up');
      froggerAnimation = false;
      // reset counter
      $('.time').text('00');
      time = parseFloat($('.time').text());
      // remove + reset modal
      $modal.css('display', 'none');
      $('.status').remove();
      // change player turn
      turn--;
      // reset gameplay
      init();
    });
  };
});