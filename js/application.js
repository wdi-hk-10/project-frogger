$(document).ready(function() {
  console.log("Linked & Ready.")

  var $body = $('body');
  var $frogger = $('.frogger');

  // start gameplay
  $('.start-button').on('click', function(){
    moveFrogger();
  });

  // move frogger
  function moveFrogger() {
    $body.off().keydown(function(e) {
      // check frogger is within game board
      setBoundaries();
      // move frogger
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

    console.log($frogger.css(["top", "right", "bottom", "left"]));
    });
  };

  function setBoundaries(){

  }

});