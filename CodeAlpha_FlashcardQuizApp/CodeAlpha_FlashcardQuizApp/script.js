const STORAGE_KEY = "codealpha_flashcards";

const defaultCards = [
  { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
  { question: "What does CSS control?", answer: "The presentation and styling of web pages." },
  { question: "What is JavaScript used for?", answer: "Adding logic and interactivity to web applications." }
];

let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultCards;
let currentIndex = 0;
let showingAnswer = false;
let editingIndex = null;

const cardText = document.getElementById("cardText");
const cardLabel = document.getElementById("cardLabel");
const position = document.getElementById("position");
const cardCount = document.getElementById("cardCount");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const modal = document.getElementById("modal");
const cardForm = document.getElementById("cardForm");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const modalTitle = document.getElementById("modalTitle");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function render() {
  if (!cards.length) {
    cardText.textContent = "No flashcards yet. Click “Add Card” to create one.";
    cardLabel.textContent = "Ready to learn";
    position.textContent = "0 / 0";
    cardCount.textContent = "0 cards";
    showAnswerBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    editBtn.disabled = true;
    deleteBtn.disabled = true;
    return;
  }

  currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));
  const card = cards[currentIndex];
  cardText.textContent = showingAnswer ? card.answer : card.question;
  cardLabel.textContent = showingAnswer ? "Answer" : "Question";
  showAnswerBtn.textContent = showingAnswer ? "Show Question" : "Show Answer";
  position.textContent = `${currentIndex + 1} / ${cards.length}`;
  cardCount.textContent = `${cards.length} card${cards.length === 1 ? "" : "s"}`;
  showAnswerBtn.disabled = false;
  prevBtn.disabled = cards.length <= 1;
  nextBtn.disabled = cards.length <= 1;
  editBtn.disabled = false;
  deleteBtn.disabled = false;
}

function openModal(index = null) {
  editingIndex = index;
  modalTitle.textContent = index === null ? "Add Flashcard" : "Edit Flashcard";
  question.value = index === null ? "" : cards[index].question;
  answer.value = index === null ? "" : cards[index].answer;
  modal.classList.remove("hidden");
  question.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  cardForm.reset();
  editingIndex = null;
}

document.getElementById("addBtn").addEventListener("click", () => openModal());
document.getElementById("closeModal").addEventListener("click", closeModal);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

cardForm.addEventListener("submit", e => {
  e.preventDefault();
  const newCard = { question: question.value.trim(), answer: answer.value.trim() };

  if (!newCard.question || !newCard.answer) return;

  if (editingIndex === null) {
    cards.push(newCard);
    currentIndex = cards.length - 1;
  } else {
    cards[editingIndex] = newCard;
  }

  showingAnswer = false;
  save();
  render();
  closeModal();
});

showAnswerBtn.addEventListener("click", () => {
  showingAnswer = !showingAnswer;
  render();
});

prevBtn.addEventListener("click", () => {
  if (!cards.length) return;
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  showingAnswer = false;
  render();
});

nextBtn.addEventListener("click", () => {
  if (!cards.length) return;
  currentIndex = (currentIndex + 1) % cards.length;
  showingAnswer = false;
  render();
});

editBtn.addEventListener("click", () => {
  if (cards.length) openModal(currentIndex);
});

deleteBtn.addEventListener("click", () => {
  if (!cards.length) return;
  if (!confirm("Delete this flashcard?")) return;
  cards.splice(currentIndex, 1);
  currentIndex = Math.max(0, currentIndex - 1);
  showingAnswer = false;
  save();
  render();
});

render();
