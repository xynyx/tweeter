// Ensure DOM has loaded first (shortform for $(document).ready(function))
$(() => {
  $("#tweet-text").on("keyup keydown", function() {
    let remaining = $(this).siblings(".counter")[0];
    let textLength = $(this).val().length;
    remaining.value = 140 - textLength;

    if (remaining.value < 0) {
      $(remaining).addClass("invalid");
    } else {
      $(remaining).removeClass("invalid");
    }
  });

  (function hideComposeButton() {
    $("#compose").click(() => {
      const composeField = $("#compose-field");
      if (composeField.hasClass("invisible")) {
        composeField
          .removeClass("invisible")
          .show({ duration: 150, easing: "swing" });
        $("#tweet-text").focus();
      } else {
        composeField
          .hide({ duration: 50, easing: "linear" })
          .addClass("invisible");
      }
    });
  })();
});
