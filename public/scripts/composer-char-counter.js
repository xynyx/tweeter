// Ensure DOM has loaded first (shortform for $(document).ready(function))
$(() => {
  $("#tweet-text").on("keyup keydown", function() {
    let remaining = $(this).siblings(".counter")[0];
    let textLength = this.value.length;

    remaining.innerHTML = 140 - textLength;
    if (remaining.innerHTML < 0) {
      $(remaining).addClass("invalid");
    } else {
      $(remaining).removeClass("invalid");
    }
  });
});
