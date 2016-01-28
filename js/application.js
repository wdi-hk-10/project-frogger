$(document).ready(function() {

  var $body       = $('body');
  var $frogger    = $('.frogger');
  var $modal      = $('.modal');
  var $game       = $('.game');

  var playerTime  = parseFloat($('.player-time').text());
  var time        = parseFloat($('.time').text());
  var turn        = 0;

  var moveCar;
  var moveTrucks;
  var playTime;

  var froggerAnimation = false;

  function init() {
    bindStartGame();
  };

  init();

  // start gameplay
  function bindStartGame() {
    $('.start-button').one('click', function(){
      // moveCar  = setInterval(car, 1000);
      $('.start-sound')[0].play();
      playTime = setInterval(counter, 1000);
      moveVehicles();
      moveFrogger();
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
    generateTrucks()
    moveTrucks = setInterval(generateTrucks, 4000);
  };

  function generateTrucks() {
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
  }

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
      // kill frogger
      stopFrogger('frogger-dead', '.squash', true, false)
      // stop animation
      $('.vehicle').stop(true); // feat
      // stop counter
      clearInterval(playTime);
      // display modal
      resetGame();

    // detect for winner
    }
  };

  // move frogger
  function moveFrogger() {
    $body.off().keydown(function(e) {
      // move frogger + check frogger is within game board
      // set frogger direction
      // prevent page scrolling with arrow keys

      // hop upward
      if (e.keyCode == '38' && !froggerAnimation) {
        if (parseInt($frogger.css('top')) > 5) {
          $frogger.animate({
            top: "-=50px"
          }, {
            duration: 'fast',
            start: function() {
              froggerAnimating = true;
              $('.hop')[0].play();
              clearFroggerClass();
              $frogger.addClass('jumping-up');
            },
            progress: function () {
              var froggerTop = parseInt($frogger.css('top'));
              if (froggerTop <= 45) {
                froggerWins();
              };
            },
            complete: function() {
              froggerAnimating = false;
              $('.hop')[0].pause();
              $('.hop')[0].currentTime = 0;
              clearFroggerClass();
              $frogger.addClass('frogger-up');
            }
          });
        };
        e.preventDefault();

      // hop downward
      } else if (e.keyCode == '40' && !froggerAnimation) {
        if (parseInt($frogger.css('top')) < 452) {
          $frogger.animate({
            top: "+=50px"
          }, {
            duration: 'fast',
            start: function() {
              froggerAnimating = true;
              $('.hop')[0].play();
              clearFroggerClass();
              $frogger.addClass('jumping-down');
            },
            complete: function() {
              froggerAnimating = false;
              $('.hop')[0].pause();
              $('.hop')[0].currentTime = 0;
              clearFroggerClass();
              $frogger.addClass('frogger-down');
            }
          });
        };
        e.preventDefault();

      // hop right
      } else if (e.keyCode == '39' && !froggerAnimation) {
        if (parseInt($frogger.css('left')) < 750) {
          $frogger.animate({
            left: "+=50px"
          }, {
            duration: 'fast',
            start: function() {
              froggerAnimating = true;
              $('.hop')[0].play();
              clearFroggerClass();
              $frogger.addClass('jumping-right');
            },
            complete: function() {
              froggerAnimating = false;
              $('.hop')[0].pause();
              $('.hop')[0].currentTime = 0;
              clearFroggerClass();
              $frogger.addClass('frogger-right');
            }
          });
        };
        e.preventDefault();

      // hop left
      } else if (e.keyCode == '37' && !froggerAnimation) {
        if (parseInt($frogger.css('left')) > 0) {
          $frogger.animate({
            left: "-=50px"
          }, {
            duration: 'fast',
            start: function() {
              froggerAnimating = true;
              $('.hop')[0].play();
              clearFroggerClass();
              $frogger.addClass('jumping-left');
            },
            complete: function() {
              froggerAnimating = false;
              $('.hop')[0].pause();
              $('.hop')[0].currentTime = 0;
              clearFroggerClass();
              $frogger.addClass('frogger-left');
            }
          });
        };
        $frogger.addClass('frogger-left');
        e.preventDefault();
      };
    });
  };

  function stopFrogger (toggleClass, sound, clearQueue, jumpToEnd) {
    clearFroggerClass();
    $frogger.addClass(toggleClass);
    $(sound)[0].play();
    $frogger.stop(clearQueue, jumpToEnd);
    $body.off('keydown');
  }

  function froggerWins() {
    // show wins sprite + stop frogger animation
    stopFrogger('frogger-wins', '.win-sound', false, true)
    // stop timer
    clearInterval(playTime);

    // calculate score
    if ((playerTime == 0) && (time > 0)) {
      $('.player-time').text(time);
    } else if ((playerTime > 0 ) && (time < playerTime)) {
      $('.player-time').text(time);
    };
    // display modal
    resetGame();
  }

  function clearFroggerClass() {
    $frogger.removeClass('frogger-up frogger-right frogger-down frogger-left jumping-up jumping-right jumping-down jumping-left');
  };

  function resetGame() {
    $modal.css('display', 'block');
    if ($frogger.hasClass('frogger-dead')) {
      $('.modal-content').append("<p>Frogger is dead!</p>");
    } else {
      $('.modal-content').append("<p>Frogger is alive!</p>")
    }
  }
});