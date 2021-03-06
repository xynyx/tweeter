$(() => {
  // Modular function that shows compose tweet area
  const showCompose = () => {
    $("#compose-field")
      .removeClass("invisible")
      .show({ duration: 250, easing: "swing" });
    $("#tweet-text").focus();
  };

  // Check if tweet length is greater than 140 chars; turn counter red by adding class
  (function checkTweetLengthValidity() {
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
  })();

  // Button on navbar that closes/opens compose tweet area
  (function toggleComposeButton() {
    $("#compose").click(() => {
      const composeField = $("#compose-field");
      if (composeField.hasClass("invisible")) {
        showCompose();
      } else {
        composeField
          .hide({ duration: 150, easing: "linear" })
          .addClass("invisible");
      }
    });
  })();

  // Fixed button that brings user to top of page & opens compose tweet
  (function bringToComposeButton() {
    $("#to-compose").on("click", function() {
      $("html, body").animate({ scrollTop: 0 }, 600);
      showCompose();
    });
    // If window is far enough away from the compose area, show the button
    // If window is near the compose area, hide the button
    $(window).scroll(function() {
      if ($(this).scrollTop() < 150) {
        $("#to-compose").fadeOut(400);
      } else {
        $("#to-compose").fadeIn(400);
      }
    });
  })();
});