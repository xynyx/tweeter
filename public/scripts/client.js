/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const renderTweets = tweets => {
    const tweetData = [];
    for (const post of tweets) {
      const $tweet = createTweetElement(post);
      tweetData.push($tweet);
    }
    $("#tweet-list")
      .append(tweetData.reverse())
      .join("");
  };

  // const  = thumbnailUrl => {
  //   const blacklistedValues = ["self", undefined, null, "unknown", "default", ""];
  
  //   if (blacklistedValues.includes(thumbnailUrl)) return false;
  
  //   return true;
  // };

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

  const $form = $(".new-tweet form");
  $form.submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $(this).serialize()
    })
      .then(function() {
        console.log(this.data);
      })
      .catch(err => {
        alert(err);
      });
  });

  (function loadTweets() {
    $.ajax({
      url: "/tweets/",
      type: "GET",
      dataType: "JSON"
    }).then(response => {
      renderTweets(response);
    });
  })();

});
