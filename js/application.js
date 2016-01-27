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

  // move row one of trucks, intiate row two
  function moveTruck() {
    $('.truck').animate({
      left: "+=1000px",
    }, {
      // set vehicle speed
      duration: 4500,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '-192.5px');
        moveTruckTwo();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-2').delay(1500).animate({
      left: "+=1000px",
    }, {
      duration: 4500,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });

    $('.truck-3').delay(3000).animate({
      left: "+=1000px",
    }, {
      duration: 4500,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });
    console.log('truck1', $('.truck').css('left'));
    console.log('truck2', $('.truck-2').css('left'));
    console.log('truck3', $('.truck-3').css('left'));
  };

  // move row two of trucks, initiate row one
  function moveTruckTwo() {
    $('.truck-4').animate({
      left: "+=1000px",
    }, {
      // set vehicle speed
      duration: 4500,
      easing: "linear",
      // loop vehicles
      complete: function() {
        $(this).css('left', '-192.5px');
        moveTruck();
      },
      // check for frogger collision
      progress: collisionDetection
    });

    $('.truck-5').delay(1500).animate({
      left: "+=1000px",
    }, {
      duration: 4500,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });

    $('.truck-6').delay(3000).animate({
      left: "+=1000px",
    }, {
      duration: 4500,
      easing: "linear",
      complete: function() {
        $(this).css('left', '-192.5px');
      },
      progress: collisionDetection
    });
    console.log('truck1', $('.truck').css('left'));
    console.log('truck2', $('.truck-2').css('left'));
    console.log('truck3', $('.truck-3').css('left'));
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