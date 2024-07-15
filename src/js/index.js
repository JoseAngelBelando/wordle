// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const ALL_WORDS = ['cosa', 'mariposa', 'bicicleta'];

const NUMBER_OF_TRIES = 5;

const gameBoardElement = document.getElementById('game-board');
const userWordFormElement = document.getElementById('user-word-form');

let secretWord;
let currentRow = 0;
// generamos una palabra secreta
const chooseSecretWord = () => {
  const randomNumber = Math.floor(Math.random() * ALL_WORDS.length);
  secretWord = ALL_WORDS[randomNumber];
  // console.log(secretWord);
};
// Esta función selecciona una palabra secreta al azar del array ALL_WORDS y la asigna a la variable secretWord.
const createGameBoard = () => {
  const fragment = document.createDocumentFragment();
  // bucle para generar columnas(se generan tastos div como intentos)
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-board__row');
    // hacemos otro bucle para generar tantos span(cuadrados para cada letra de la plabra) como letras tenga la palabra secreta.
    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }
    fragment.append(newRow);
  }

  gameBoardElement.append(fragment);
};
// Esta función crea el tablero del juego. Genera un número de filas igual a NUMBER_OF_TRIES y un número de columnas igual a la longitud de secretWord. Cada columna es un span que representará una letra de la palabra secreta.
const startGame = () => {
  chooseSecretWord();
  createGameBoard();
};
// Esta función inicia el juego llamando a chooseSecretWord para seleccionar la palabra secreta y a createGameBoard para crear el tablero del juego.
const printLetter = (letter, position, className) => {
  const letterBox = gameBoardElement.children[currentRow].children[position];
  if (!letterBox.classList.contains('letter--correct')) {
    letterBox.classList.add(className);
  }
  letterBox.textContent = letter;
};

// Esta función revisa la palabra ingresada por el usuario (word) y compara cada letra con la palabra secreta (secretWord). Primero, marca las letras correctas (letter--correct) y luego marca las letras presentes pero en posiciones incorrectas (letter--present). Las letras que no están en la palabra secreta se marcan como incorrectas (letter--incorrect). Finalmente, se incrementa el contador currentRow
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
// Este bloque de código añade un evento de escucha al formulario. Cuando el usuario envía el formulario, se previene la acción predeterminada, se obtiene la palabra ingresada por el usuario y se verifica que tenga la misma longitud que la palabra secreta. Si la longitud es correcta, se llama a checkRow para verificar la palabra y luego se restablece el formulario.
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
