$(document).ready(function() {
  console.log("Linked & Ready.")

  var $body    = $('body');
  var $frogger = $('.frogger');

  // start gameplay
  $('.start-button').on('click', function(){
    moveVehicles();
    moveFrogger();
  });

  // animate vehicles
  function moveVehicles() {
    moveTruck();
  };

  function moveTruck() {
    $('.truck').animate({
      left: "+=1200px",
    }, {
      // set vehicle speed
      duration: 5000,
      complete: function() {
        $(this).css('left', '-292.5px');
        moveTruck();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-2').delay(1500).animate({
      left: "+=1200px",
    }, {
      // set vehicle speed
      duration: 4500,
      complete: function() {
        $(this).css('left', '-292.5px');
        moveTruck();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-3').delay(3000).animate({
      left: "+=1200px",
    }, {
      // set vehicle speed
      duration: 4500,
      complete: function() {
        $(this).css('left', '-292.5px');
        moveTruck();
      },
      // check for frogger collision
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
      console.log('boom!');
    } else { console.log('safe', froggerTop, froggerBottom, froggerLeft, froggerRight)};
  };

  // move frogger
  function moveFrogger() {
    $body.off().keydown(function(e) {
      // move frogger + check frogger is within game board
      // prevent page scrolling with arrow keys
      if (e.keyCode == '38') {
        // up arrow
        if (parseInt($frogger.css('top')) > 5) {
          $frogger.animate({ top: "-=50px" });
        };
        e.preventDefault();

      } else if (e.keyCode == '40') {
        // down arrow
        if (parseInt($frogger.css('top')) < 455) {
          $frogger.animate({ top: "+=50px" });
        };
        e.preventDefault();

      } else if (e.keyCode == '39') {
        // right arrow
        if (parseInt($frogger.css('left')) < 750) {
          $frogger.animate({ left: "+=50px" });
        };
          // WIP: hopping animation - CREATE CLASSES FOR FROGGER DIRECTION & HOP ANIMATION!
          // } , {
          //  step: function(now, fx) {
          //     if (0.1 < fx.pos < 0.9) {
          //       $(this).css('background-image', 'url("assets/frogger-jumping-sprite.png")');
          //     } else if (fx.pos > 0.9) {
          //       $(this).css('background-image', 'none');
          //     }
          //   }
        e.preventDefault();

      } else if (e.keyCode == '37') {
        // left arrow
        if (parseInt($frogger.css('left')) > 0) {
          $frogger.animate({ left: "-=50px" });
        };
        e.preventDefault();
      };
    });
  };
});