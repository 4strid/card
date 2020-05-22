function Physics (stage) {
  const cardElems = stage.querySelectorAll('.card');
  this.cards = new Map();
  for (let i = 0; i < cardElems.length; i++) {
    this.cards.set(cardElems[i], new Card(cardElems[i]));
  }

  this.timers = new Map();
  this.clicking = null;
  this.dragging = null;

  this.clientX = null;
  this.clientY = null;

  this.velocityX = 0;
  this.velocityY = 0;

  stage.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('card')) {
      const card = this.cards.get(evt.target);

      this.clicking = card;

      this.timers.set(card, window.setTimeout(() => this.pickUpCard(card), 100));
    }
  });

  stage.addEventListener('mouseup', (evt) => {

    this.timers.forEach(function (timerID) {
      window.clearTimeout(timerID);
    });

    this.timers.clear();


    if (this.clicking !== null) {
      this.flipCard(this.clicking);
    }

    if (this.dragging !== null) {
      this.releaseCard(this.dragging);
    }

  });

  stage.addEventListener('mousemove', (evt) => {
    const deltaX = evt.clientX - this.clientX;
    const deltaY = evt.clientY - this.clientY;

    this.clientX = evt.clientX;
    this.clientY = evt.clientY;

    if (this.dragging !== null) {
      this.dragging.translate(deltaX, deltaY);
    }
  });
}

Physics.prototype.pickUpCard = function (card) {
  card.setColor('#c0ffee');
  this.timers.delete(card);
  this.clicking = null;
  this.dragging = card;
};

Physics.prototype.releaseCard = function (card) {
  card.flip();
  this.flingCard(card);
}

Physics.prototype.flingCard = function (card) {
  console.log('wahooooo');
  this.dragging = null;
};

Physics.prototype.flipCard = function (card) {
  card.flip();
  this.clicking = null;
};

function Card (elem) {
  const { top, left } = elem.getBoundingClientRect();
  this.x = left + window.scrollX;
  this.y = top + window.scrollY;

  elem.style.position = 'absolute';
  elem.style.left = 0;
  elem.style.top = 0;

  this.elem = elem;

  this.facing = Card.FACING_FRONT;

  this._tf();
}

Card.FACING_FRONT = Symbol('Front');
Card.FACING_BACK = Symbol('Back');

Card.prototype.translate = function (dX, dY) {
  this.x += dX;
  this.y += dY;
  this._tf();
};

Card.prototype.setColor = function (color) {
  this.elem.style.backgroundColor = color;
};

Card.prototype.flip = function () {
  if (this.facing === Card.FACING_FRONT) {
    this.setColor('yellow');
    this.facing = Card.FACING_BACK;
  } else if (this.facing === Card.FACING_BACK) {
    this.setColor('#facade');
    this.facing = Card.FACING_FRONT;
  }
}

Card.prototype._tf = function () {
  this.elem.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
};


const stage = document.querySelector('.stage');
const physics = new Physics(stage);

