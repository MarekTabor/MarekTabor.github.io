class Game {
  constructor() {

    this.fields = document.querySelectorAll('.field');
    this.fields.forEach(field => {
      field.addEventListener('click', this.handleFieldClick.bind(this))
    })
  }

  handleFieldClick(event) {

    const index = event.target.id;
    if (!this.board[index]) {
      this.setFieldValue(index, this.actual);
      this.changePlayer();
      this.renderBoard();

      if (this.checkWin()) {
        alert("Wygrał gracz grający: " + this.winner);
        this.initGame();
      } else if (this.checkFullBoard()) {
        alert("Remis !");
        this.initGame();
      }
    } else {
      alert("W tej komórce już jest znak, wybierz inną ;)");
    }

  }

  changePlayer() {
    this.actual = this.actual === 'O' ? 'X' : 'O';
  }

  setFieldValue(index, value) {
    this.board[index] = value;
  }
  checkFullBoard() {
    return this.board.indexOf('') === -1;
  }
  initGame() {

    this.actual = this.randomPlayer();
    this.winner = null;
    this.board = new Array(9).fill('');

    this.renderBoard();
  }

  randomPlayer() {

    return Math.floor(Math.random() * 10) % 2 ? 'X' : 'O';
  }

  checkWin() {
    const board = this.board;

    //Poziom
    for (let i = 0; i < 3; i++) {
      if (this.check3equals(board[i * 3], board[i * 3 + 1], board[i * 3 + 2])) {
        this.winner = board[i * 3];
        return true;
      }
    }
    //Pionowo
    for (let i = 0; i < 3; i++) {
      if (this.check3equals(board[i], board[i + 3], board[i + 6])) {
        this.winner = board[i];
        return true;
      }
    }
    //Skosy
    if (this.check3equals(board[0], board[4], board[8])) {
      this.winner = board[0];
      return true;
    }

    if (this.check3equals(board[2], board[4], board[6])) {
      this.winner = board[2];
      return true;
    }
  }

  check3equals(a, b, c) {
    return !!a && a === b && b === c && a === c;
  }
  renderBoard() {

    this.fields.forEach((field, index) => {
      field.innerText = this.board[index];
    })
  }
}

window.addEventListener('load', () => {
  const game = new Game();

  game.initGame();
})