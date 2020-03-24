// Ensure DOM has loaded first (shortform for $(document).ready(function))
$(() => {
  $("#tweet-text").on("keyup", function(e) {
    // console.log(e.currentTarget.textLength);
    console.log(this.value.length);
    // console.log(this);
  })
})
