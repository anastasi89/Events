export default class EventsManager {
  constructor(gameManager) {
    this.gameManager = gameManager;

    this.button = document.querySelector('.button');
    this.miss = document.querySelector('.miss');
    this.wins = document.querySelector('.wins');
    this.modal = document.querySelector('.modal');

    this.countWins = 0;
    this.countMiss = 0;

    this.countShow = this.gameManager.countShow;
    this.eventShow = null;

    this.containerWins = document.querySelector('.control_wins span');
    this.containerMiss = document.querySelector('.control_miss span');
  }

  init() {
    this.gameManager.startGame();
    this.clickItem();
    this.eventShowGoblin(this.gameManager.interval);
    this.button.addEventListener('click', this.onClickNewGame());
  }

  clickItem() {
    const field = document.getElementsByTagName('td');
    for (let i = 0; i < field.length; i += 1) {
      field[i].addEventListener('click', () => {
        if (field[i].classList.contains('goblin')) {
          this.countWins += 1;
          this.containerWins.textContent = this.countWins;
          field[i].className = 'board-item';
        } else {
          this.countMiss += 1;
          this.containerMiss.textContent = this.countMiss;
        }
        this.countsControl(this.gameManager.countShow, this.countMiss, this.countWins);
      });
    }
  }

  eventShowGoblin(interval) {
    this.eventShow = setInterval(() => {
      this.countsControl(this.gameManager.countShow, this.countMiss, this.countWins);
    }, interval);
  }

  showModal() {
    this.modal.classList.remove('hidden');
    this.button.classList.remove('hidden');
    this.gameManager.stopGenerateGoblin();
    clearInterval(this.eventShow);
  }

  closeModal() {
    this.modal.classList.add('hidden');
    this.button.classList.add('hidden');
    if (!this.miss.classList.contains('hidden')) {
      this.miss.classList.add('hidden');
    }
    if (!this.wins.classList.contains('hidden')) {
      this.wins.classList.add('hidden');
    }
  }

  onClickNewGame() {
    this.button.addEventListener('click', () => {
      this.resetCounts();
      this.closeModal();
      this.button.removeEventListener('click', this.onClickNewGame);
      this.gameManager.clearBoard();

      this.gameManager.stopGenerateGoblin();
      clearInterval(this.eventShow);
      this.init();
    });
  }

  countsControl(countShow, countMiss, countWins) {
    if ((countShow - countWins) >= 5 || countMiss >= 5) {
      this.showModal();
      this.miss.classList.remove('hidden');
    }
    if (countWins >= 10) {
      this.showModal();
      this.wins.classList.remove('hidden');
    }
  }

  resetCounts() {
    this.countMiss = 0;
    this.countWins = 0;
    this.gameManager.countShow = 0;
    this.containerWins.textContent = this.countWins;
    this.containerMiss.textContent = this.countMiss;
    this.gameManager.containerShow.textContent = this.gameManager.countShow;
  }
}
