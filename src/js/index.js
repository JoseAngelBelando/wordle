// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const words = [
    'alaba',
    'bollo',
    'canal',
    'dados',
    'estar',
    'farol',
    'gatos',
    'index',
    'jaula',
    'labio',
    'moral',
    'nacer',
    'oasis',
    'piano',
    'queja',
    'rampa',
    'salta',
    'trama',
    'uvula',
    'valla',
    'yermo',
    'zorro'
  ];
  const maxAttempts = 6;
  const gameBoard = document.getElementById('game-board');
  const userWordForm = document.getElementById('user-word-form');
  const popUp = document.getElementById('pop-up');
  let attempts = 0;
  let targetWord = words[Math.floor(Math.random() * words.length)];

  const createBoard = () => {
    gameBoard.innerHTML = ''; // limpiar
    for (let i = 0; i < maxAttempts; i++) {
      const row = document.createElement('div');
      row.classList.add('game-board__row');
      for (let j = 0; j < targetWord.length; j++) {
        const letter = document.createElement('span');
        letter.classList.add('letter');
        row.appendChild(letter);
      }
      gameBoard.appendChild(row);
    }
  };

  const updateBoard = word => {
    const row = gameBoard.children[attempts];
    const targetArray = targetWord.split('');
    const wordArray = word.split('');

    for (let i = 0; i < wordArray.length; i++) {
      const letter = row.children[i];
      letter.textContent = wordArray[i];
      if (wordArray[i] === targetArray[i]) {
        letter.classList.add('letter--correct');
        targetArray[i] = null;
      }
    }
    for (let i = 0; i < wordArray.length; i++) {
      const letter = row.children[i];
      if (letter.classList.contains('letter--correct')) continue;
      if (targetArray.includes(wordArray[i])) {
        letter.classList.add('letter--present');
        targetArray[targetArray.indexOf(wordArray[i])] = null;
      } else {
        letter.classList.add('letter--incorrect');
      }
    }
    attempts++;
  };

  const showPopUp = message => {
    popUp.textContent = message;
    popUp.classList.add('pop-up--show');
    setTimeout(() => popUp.classList.remove('pop-up--show'), 2000);
  };

  const checkGameOver = word => {
    if (word === targetWord) {
      showPopUp('Congratulations! You guessed the word!');
      return true;
    } else if (attempts === maxAttempts) {
      showPopUp(`Game over! The word was ${targetWord}`);
      return true;
    }
    return false;
  };

  userWordForm.addEventListener('submit', event => {
    event.preventDefault();
    const word = event.target.word.value.toLowerCase();
    if (word.length !== 5) {
      showPopUp('The word must be 5 letters long');
      return;
    }
    updateBoard(word);
    if (checkGameOver(word)) {
      userWordForm.removeEventListener('submit', arguments.callee); // Disable further inputs
    }
    event.target.reset();
  });

  createBoard();
});
