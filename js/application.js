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
      // move frogger
      // prevent page scrolling with arrow keys
      if (e.keyCode == '38') {
      // up arrow
      $frogger.animate({ top: "-=50px" });
      e.preventDefault();

      } else if (e.keyCode == '40') {
      // down arrow
      $frogger.animate({ top: "+=50px" });
      e.preventDefault();

      } else if (e.keyCode == '39') {
      // right arrow
      $frogger.animate({ left: "+=50px" });
      e.preventDefault();

      } else if (e.keyCode == '37') {
      // left arrow
      $frogger.animate({ left: "-=50px" });
      e.preventDefault();
      };

    console.log($frogger.css(["top", "right", "bottom", "left"]));
    });
  };

});