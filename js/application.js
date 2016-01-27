$(document).ready(function() {

  var $body         = $('body');
  var $frogger      = $('.frogger');
  var playTime;
  var playerTime    = parseFloat($('.player-time').text());
  var time          = parseFloat($('.time').text());
  var turn          = 0;

  // start gameplay
  $('.start-button').one('click', function(){
    playTime = setInterval(counter, 1000);
    moveVehicles();
    moveFrogger();
  });

  // function playerTurn() {
  //   if (turn % 2 === 0) {

  //   }
  // }

  // start timer
  var counter = function() {
    time++;
    if (time < 10) {
      time = '0' + time;
    }
    $('.time').text("0:" + time);
  };

  // animate vehicles
  function moveVehicles() {
    moveTruck();
  };

  // TODO: use setInterval for each vehicle
  // move row one of trucks, intiate row two
  function moveTruck() {
    $('.truck').animate({
      left: "+=1000px",
    }, {
      // set vehicle speed
      duration: 12000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '-192.5px');
        moveTruckTwo();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-2').delay(4000).animate({
      left: "+=1000px",
    }, {
      duration: 12000,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });

    $('.truck-3').delay(8000).animate({
      left: "+=1000px",
    }, {
      duration: 12000,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });
  };

  // move row two of trucks, initiate row one
  function moveTruckTwo() {
    $('.truck-4').animate({
      left: "+=1000px",
    }, {
      // set vehicle speed
      duration: 12000,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '-192.5px');
        moveTruck();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-5').delay(4000).animate({
      left: "+=1000px",
    }, {
      duration: 12000,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });

    $('.truck-6').delay(8000).animate({
      left: "+=1000px",
    }, {
      duration: 12000,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });
  };

  // detect collision between frogger and vehicles
  var collisionDetection = function() {
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
      clearFroggerClass();
      $('.squash')[0].play();
      $frogger.toggleClass('frogger-dead');
      $frogger.stop();
      // stop animation
      $('.vehicle').stop(true);
      // stop counter
      clearInterval(playTime);
    // detect for winner!
    } else if (froggerTop <= 45) {
      froggerWins();
    }
  };

  function froggerWins() {
    // stop timer
    clearInterval(playTime);
    // calculate score
    if ((playerTime == 0) && (time > 0)) {
      $('.player-time').text('0:' + time);
    } else if ((playerTime > 0 ) && (time < playerTime)) {
      $('.player-time').text('0:' + time);
    };
  }

  // move frogger
  function moveFrogger() {
    $body.off().keydown(function(e) {
      // move frogger + check frogger is within game board
      // set frogger direction
      // prevent page scrolling with arrow keys
      if (e.keyCode == '38') {
        // up arrow
        if (parseInt($frogger.css('top')) > 5) {
          $frogger.animate({ top: "-=50px" });
        };
        $('.hop')[0].play();
        clearFroggerClass();
        $frogger.addClass('frogger-up');
        e.preventDefault();

      } else if (e.keyCode == '40') {
        // down arrow
        if (parseInt($frogger.css('top')) < 452) {
          $frogger.animate({ top: "+=50px" });
        };
        $('.hop')[0].play();
        clearFroggerClass();
        $frogger.addClass('frogger-down');
        e.preventDefault();

      } else if (e.keyCode == '39') {
        // right arrow
        if (parseInt($frogger.css('left')) < 750) {
          $frogger.animate({
            left: "+=50px"
          });
        };
        $('.hop')[0].play();
        clearFroggerClass();
        $frogger.addClass('frogger-right');
        e.preventDefault();

      } else if (e.keyCode == '37') {
        // left arrow
        if (parseInt($frogger.css('left')) > 0) {
          $frogger.animate({ left: "-=50px" });
        };
        $('.hop')[0].play();
        clearFroggerClass();
        $frogger.addClass('frogger-left');
        e.preventDefault();
      };
    });
  };

  function clearFroggerClass() {
    $frogger.removeClass('frogger-up frogger-right frogger-down frogger-left');
  };

});