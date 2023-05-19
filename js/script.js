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
        displayGuess();
        wordInProgress(guessedLetters);
    }
};

const displayGuess = function () {
    guessedList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
};

const wordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const updateWordArray = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updateWordArray.push(letter.toUpperCase());
        } else {
            updateWordArray.push("●");
        }
    }
    progress.innerText = updateWordArray.join("");
    checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};