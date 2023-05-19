const guessedList = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const inputField = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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

    message.innerText = "";

    const guess = inputField.value;

    const submit = validateInput(guess);
    if (submit) {
        makeGuess(guess);
    }

    inputField.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = `Please enter a letter.`;
    } else if (input.length > 1) {
        message.innerText = `Please enter a single letter.`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `Please enter a letter from A to Z`;
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes((guess))) {
        message.innerText = 'You have already guessed that letter. Try again!';
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}