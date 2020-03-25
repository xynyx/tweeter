/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // Test code
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense, donc je suis"
      },
      created_at: 1461113959088
    }
  ];

  const createTweetElement = function(tweet) {
    // let $tweet = $("<article>").addClass("tweet");
    let $tweet = `
      <article class="tweet">
        <header>
          <img src=${tweet.user.avatars}><span class="name">${tweet.user.name}</span><span class="handle">${tweet.user.handle}</span>
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

  const renderTweets = function(tweets) {
    for (const post of tweets) {
      const $tweet = createTweetElement(post);
      $("#tweet-list").append($tweet);
    }
  };

  renderTweets(data);
});
