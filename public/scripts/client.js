$(() => {
  // Collect and post submit data if valid
  const $form = $("main form");
  $form.submit(function(event) {
    event.preventDefault();
    if (checkTweetValidity()) {
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: $(this).serialize(),
        success: () => {
          // Clear form after submission
          $form[0].reset();
          // Dynamically refresh page after submission
          loadTweets();
        }
      });
    }
  });

  // Escape user input to prevent CSS (Cross-Site Scripting)
  const escape = function(str) {
    // REFACTOR?
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Check if tweet is valid
  const checkTweetValidity = () => {
    const textLength = $("#tweet-text").val().length;
    $("#noChars, #maxChars")
      .removeClass("invalid")
      .slideUp(300);
    if (textLength > 140) {
      $("#maxChars")
        .addClass("invalid")
        .slideDown(500);
      return false;
    } else if (textLength === 0) {
      $("#noChars")
        .addClass("invalid")
        .slideDown(500);
      return false;
    }
    return true;
  };


  // Dynamically create HTML
  const createTweetElement = tweet => {
    const { avatars, name, handle } = tweet.user;
    const text = tweet.content.text;
    const fullDate = new Date(tweet.created_at);
    const date = fullDate.toLocaleDateString("en-US")
    let $tweet = `
      <article class="tweet">
        <header>
          <img src=${avatars}>
          <span class="name">${name}</span>
          <span class="handle">${handle}</span>
        </header>
        <p>
          ${escape(text)}
        </p>
        <footer>
          ${date}
          <span id="tweet-icons">
            <span id="flag"> &#127988; </span>
            <span id="reshare"> &#128257; </span>
            <span id="like"> &#128153; </span>
          </span>
        </footer>
      </article>`;

    return $tweet;
  };

  // Render dynamically created HTML, and reverse so that order is descending by time created
  const renderTweets = tweets => {
    const tweetData = [];
    for (const post of tweets) {
      const $tweet = createTweetElement(post);
      tweetData.push($tweet);
    }
    $("#tweet-list").html(tweetData.reverse().join(""));
  };

  // Load rendered tweets on page
  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "JSON",
      success: response => {
        renderTweets(response);
      }
    });
  };
  loadTweets();
});
