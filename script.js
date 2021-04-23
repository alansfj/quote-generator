const $quoteText = document.getElementById("quote");
const $authorText = document.getElementById("author");
const $newQuoteBtn = document.getElementById("new-quote");
const $twitterBtn = document.getElementById("twitter");
const $loader = document.getElementById("loader");
const $quoteContainer = document.getElementById("quote-container");

let apiQuotes = [];
let oneExecution = false;

const showLoadingSpinner = () => {
  $loader.hidden = false;
  $quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  $loader.hidden = true;
  $quoteContainer.hidden = false;
  oneExecution = true;
};

async function getQuotes() {
  showLoadingSpinner();
  try {
    const apiUrl = "https://type.fit/api/quotes";
    let response = await fetch(apiUrl);
    apiQuotes = await response.json();
    setQuote(newQuote(apiQuotes));
  } catch (error) {
    console.log(error);
  }
}

const newQuote = (q) => {
  let randomNumber = Math.floor(Math.random() * apiQuotes.length);
  return q[randomNumber];
};

const setQuote = (q) => {
  if (q.text.length > 100) {
    $quoteText.classList.add("long-quote");
  } else {
    $quoteText.classList.remove("long-quote");
  }

  $quoteText.textContent = q.text;

  if (!q.author) {
    $authorText.textContent = "unknown";
  } else {
    $authorText.textContent = q.author;
  }
  if (!oneExecution) removeLoadingSpinner();
};

// Tweet Quote Function

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${$quoteText.textContent} -${$authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners

$newQuoteBtn.addEventListener("click", (e) => {
  setQuote(newQuote(apiQuotes));
});

$twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
