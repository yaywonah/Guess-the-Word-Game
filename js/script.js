const guessedList = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const inputField = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";

const circlePlaceholder = function (word) {
     const placeholderWord = [];
     for (const letter of word) {
        console.log(letter);
        placeholderWord.push("●");
     }
     progress.innerText = placeholderWord.join("");
};

circlePlaceholder(word);

buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const input = inputField.value;
    console.log(input);
    inputField.value = "";
});