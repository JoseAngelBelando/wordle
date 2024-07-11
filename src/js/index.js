// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const ALL_WORDS = ['cosa'];

const NUMBER_OF_TRIES = 5;

const gameBoardElement = document.getElementById('game-board');
const userWordFormElement = document.getElementById('user-word-form');

let secretWord;
let currentRow = 0;

const chooseSecretWord = () => {
  const randomNumber = Math.floor(Math.random() * ALL_WORDS.length);
  secretWord = ALL_WORDS[randomNumber];
  // console.log(secretWord);
};

const createGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-board__row');
    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }
    fragment.append(newRow);
  }

  gameBoardElement.append(fragment);
};

const startGame = () => {
  chooseSecretWord();
  createGameBoard();
};

const printLetter = (letter, position, className) => {
  const letterBox = gameBoardElement.children[currentRow].children[position];
  if (!letterBox.classList.contains('letter--correct')) {
    letterBox.classList.add(className);
  }
  letterBox.textContent = letter;
};

const checkRow = word => {
  let className;
  let wordToCheck = secretWord;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (letter === secretWord[i]) {
      className = 'letter--correct';
      wordToCheck = wordToCheck.replace(letter, '-');
      console.log(wordToCheck);
      printLetter(letter, i, className);
    }
  }

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (wordToCheck.includes(letter)) {
      className = 'letter--present';
      wordToCheck = wordToCheck.replace(letter, '-');
    } else {
      className = 'letter--incorrect';
    }
    printLetter(letter, i, className);
  }

  currentRow++;
};

startGame();

userWordFormElement.addEventListener('submit', event => {
  event.preventDefault();
  const userWord = event.target.word.value;
  if (secretWord.length !== userWord.length) {
    console.log(`La palabra tiene que tener ${secretWord.length} letras.`);
    return;
  }

  checkRow(userWord);
  event.target.reset();
});
