const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" }
];

let lastIndex = -1;
let count = 0;

const quoteText = document.getElementById("quoteText");
const author = document.getElementById("author");
const counter = document.getElementById("counter");

function getRandomIndex() {
  if (quotes.length === 1) return 0;
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastIndex);
  return index;
}

function showQuote() {
  const index = getRandomIndex();
  lastIndex = index;
  const quote = quotes[index];
  quoteText.textContent = quote.text;
  author.textContent = `— ${quote.author}`;
  count++;
  counter.textContent = `Quote ${count}`;
}

document.getElementById("newQuote").addEventListener("click", showQuote);
showQuote();
