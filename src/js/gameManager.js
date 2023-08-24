export default class GameManager {
  constructor() {
    this.amountLines = 4;
    this.amountСolumns = 4;

    this.indexGoblin = null;

    this.interval = 1000;
    this.timetId = null;

    this.board = document.querySelector('.board');
    this.elements = [];

    this.countShow = 0;
    this.containerShow = document.querySelector('.control_show span');
  }

  startGame() {
    this.createItemBoard(this.board);
    this.generateGoblin();
    this.intervalGenerateGoblin(this.interval);
  }

  createItemBoard(board) {
    for (let i = 0; i < this.amountLines; i += 1) {
      const tr = document.createElement('tr');
      board.appendChild(tr);
      for (let j = 0; j < this.amountСolumns; j += 1) {
        const item = document.createElement('td');
        tr.appendChild(item);
        item.classList.add('board-item');
      }
    }
    return board;
  }

  clearBoard() {
    while (this.board.lastElementChild) {
      this.board.removeChild(this.board.lastElementChild);
    }
  }

  clearAll() {
    this.elements = document.getElementsByTagName('td');
    for (let i = 0; i < this.elements.length; i += 1) {
      this.elements[i].className = 'board-item';
    }
  }

  generateGoblin() {
    this.elements = document.getElementsByTagName('td');
    const indNew = Math.floor(Math.random() * this.elements.length);

    if (indNew === this.indexGoblin) {
      this.generateGoblin();
    } else {
      this.indexGoblin = indNew;
      this.elements[indNew].classList.add('goblin');
    }
  }

  intervalGenerateGoblin(interval) {
    this.timetId = setInterval(() => {
      this.clearAll();
      this.generateGoblin();
      this.countShow += 1;
      this.containerShow.textContent = this.countShow;
    }, interval);
  }

  stopGenerateGoblin() {
    clearInterval(this.timetId);
    this.clearAll();
  }
}
