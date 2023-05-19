const guessedList = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector(".guess");
const inputField = document.querySelector(".letter");
const progress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const buttonPlayAgain = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const randomAPI = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await randomAPI.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    circlePlaceholder(word);
};

getWord();

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
        countGuesses(guess);
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

const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word doesn't have ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great, the word has ${guess}!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}<span>.`;
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
