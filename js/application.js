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
    $body.keydown(function(e) {
      // prevent page scrolling with arrow keys
      // move frogger
        if (e.keyCode == '38') {
        // up arrow
        console.log('up');
        e.preventDefault();
        $frogger.animate({
          top: "-=50px",
        });

        } else if (e.keyCode == '40') {
        // down arrow
        console.log('down');
        e.preventDefault();
        $frogger.animate({
          top: "+=50px",
        });

        } else if (e.keyCode == '39') {
        // right arrow
        console.log('right');
        e.preventDefault();
        $frogger.animate({
          left: "+=50px",
        });

        } else if (e.keyCode == '37') {
        // left arrow
        console.log('left');
        e.preventDefault();
        $frogger.animate({
          left: "-=50px",
        });
      };
      console.log($frogger.css(["top", "right", "bottom", "left"]));
    });
  };

});