$(() => {
  //TODO - MAKE IIFE OR LEAVE?
  // Check if tweet length is greater than 140 chars; turn counter red by adding class
  $("#tweet-text").on("keyup keydown", function() {
    let remaining = $(this).siblings("#counter")[0];
    let textLength = $(this).val().length;
    remaining.value = 140 - textLength;

    if (remaining.value < 0) {
      $(remaining).addClass("invalid");
    } else {
      $(remaining).removeClass("invalid");
    }
  });

  // Modular function that shows compose tweet area
  const showCompose = () => {
    $("#compose-field")
      .removeClass("invisible")
      .show({ duration: 150, easing: "swing" });
    $("#tweet-text").focus();
  };

  // Button on navbar that closes/opens compose tweet area
  (function toggleComposeButton() {
    $("#compose").click(() => {
      const composeField = $("#compose-field");
      if (composeField.hasClass("invisible")) {
        showCompose();
      } else {
        composeField
          .hide({ duration: 50, easing: "linear" })
          .addClass("invisible");
      }
    });
  })();

  // Fixed button that brings user to top of page & opens compose tweet
    (function bringToComposeButton() {
      $("#to-compose").on("click", function() {
        $(window).scrollTop(0);
        showCompose();
      });

      $(window).scroll(function() {
        if ($(this).scrollTop() < 300) {
          $("#to-compose").hide();
        } else {
          $("#to-compose").show();
        }
      });
    })();
});
