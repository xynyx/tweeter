/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test code
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};

$(() => {
  const createTweetElement = function(tweet) {
    // Takes in tweet object (initial-tweets.json) & (/tweets)
    // Return tweet <article>
    let $tweet = $("<article>").addClass("tweet");

    

    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
});
