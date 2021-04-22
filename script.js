const $quote = document.querySelector("#quote");
const $author = document.querySelector("#author");
const $newQuoteButton = document.querySelector("#new-quote");

let apiQuotes = [];

async function getQuotes() {
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
  $quote.textContent = q.text;
  if (q.author === null) {
    $author.textContent = "unknown";
  } else {
    $author.textContent = q.author;
  }
};

getQuotes();

$newQuoteButton.addEventListener("click", (e) => {
  setQuote(newQuote(apiQuotes));
});
