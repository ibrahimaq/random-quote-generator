//assigning constants to query selectors
const button = document.querySelector("button");
const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector(".author");
const body = document.querySelector("body");
const tweetBtn = document.querySelector(".twitter-share-button");

//creating an Http request
let requestJSON = new XMLHttpRequest(); //making a new instance of the XMLHttopRequest

//eventListeners
window.addEventListener("onload", randomQuoteGenerator());
button.addEventListener("click", randomQuoteGenerator);
// tweetBtn.addEventListener("click", tweetQuote);

//fetching JSON and converting to object
function randomQuoteGenerator() {
  requestJSON.open("GET", "https://type.fit/api/quotes", true);
  requestJSON.onload = () => {
    let data = JSON.parse(requestJSON.responseText);

    renderHTML(data); //feeding JSON's data to render HTML
  };
  requestJSON.send(); //Sending request
}

function renderHTML(quotes) {
  // create a random number depending on the number of quotes
  let randomNumber = Math.floor(Math.random() * quotes.length);
  // use the random number to get a random quote including author

  let quoteObject = quotes[randomNumber];
  let text = quoteObject.text;
  let author = quoteObject.author;
  // some authors are noted as null in the JSON file
  if (author == null) {
    author = "Unknown";
  }

  quoteText.innerHTML = '"' + text + '"';

  quoteAuthor.innerHTML = `- ${author}`;

  randomColor();

  tweetQuote(text, author); //feeding quote into the tweetQuote function
}

// TWEET QUOTE //
function tweetQuote(text, author) {
  let encodedText = encodeURIComponent(text); // converting quote into readable URL
  let encodeAuthor = encodeURIComponent(" "+author); //converting author's name into readable URL
  encodedText = encodedText.replace(/'/g, "%27");

  console.log(encodedText);
  tweetBtn.setAttribute(
    "href",
    "https://twitter.com/intent/tweet?text=" + encodedText + encodeAuthor
  );
  console.log(tweetBtn.getAttribute("href"));
}

// background colours //
let colours = [
  "#EAE4E9",
  "#FFF1E6",
  "#FDE2E4",
  "#FAD2E1",
  "#E2ECE9",
  "#BEE1E6",
  "#F0EFEB",
  "#DFE7FD",
  "#CDDAFD",
  "#81b29a",
];
function randomColor() {
  let randomColor = colours[Math.floor(Math.random() * colours.length)];
  body.style.backgroundColor = randomColor;
}
