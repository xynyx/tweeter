/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const $form = $(".new-tweet form");
  $form.submit(function(event) {
    event.preventDefault();
    if (checkTweetValidity()) {
      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $(this).serialize(),
        success: () => {
          // Clear form after submission
          $form[0].reset();
          loadTweets();
        }
      })
    }
      // .then(function() {
      //   checkTweetValidity(this.data);
      //   console.log(this.data); //text =23r23r2
      // })
      // TODO - NECESSARY?
      // .catch(() => {
      //   alert("Need something to tweet! Tell us how you're really feeling.");
      // });
  });

  const checkTweetValidity = () => {
    const textLength = $("#tweet-text").val().length;
    if (textLength > 140) {
      alert("Exceeded maximum character limit!");
      return false;
    } else if (textLength === 0) {
      alert("Need something to tweet! Tell us how you're really feeling.");
      return false;
    }
    return true;
  };

  const createTweetElement = tweet => {
    const { avatars, name, handle } = tweet.user;
    let $tweet = `
      <article class="tweet">
        <header>
          <img src=${avatars}>
          <span class="name">${name}</span>
          <span class="handle">${handle}</span>
        </header>
        <p>
          ${tweet.content.text}
        </p>
        <footer>
          ${tweet.created_at}
          <span id="tweet-icons">
            <span id="flag"> &#127988; </span>
            <span id="reshare"> &#128257; </span>
            <span id="like"> &#128153; </span>
          </span>
        </footer>
      </article>`;

    return $tweet;
  };

  const renderTweets = tweets => {
    const tweetData = [];
    for (const post of tweets) {
      const $tweet = createTweetElement(post);
      tweetData.push($tweet);
    }
    $("#tweet-list").html(tweetData.reverse().join(""))
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "JSON",
      success: response => {
        renderTweets(response)
      }
    });
  }

  loadTweets();
});
