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
      if (e.keyCode == '40') {
        // up arrow
        e.preventDefault();
        $frogger.animate({
          top: "+50px",
        });
      } else if (e.keyCode == '38') {
        // down arrow
        e.preventDefault();
        $frogger.animate({
          bottom: "+50px",
        });
      } else if (e.keyCode == '37') {
        // right arrow
        e.preventDefault();
        $frogger.animate({
          right: "+50px",
        });

      } else if (e.keyCode == '39') {
        // left arrow
        e.preventDefault();
        $frogger.animate({
          left: "+50px",
        });
      };
    });
  };

});