const stage = document.querySelector('.stage');
const physics = new Physics(stage)

function Physics (stage) {
  const cardElems = stage.querySelectorAll('.card');
  this.cards = [];
  for (let i = 0; i < cardElems.length; i++) {
    this.cards.push(new Card(cardElems[i]));
  }
  console.log(this.cards)
}

function Card (elem) {
  const { top, left } = elem.getBoundingClientRect()
  this.x = left + window.scrollX;
  this.y = top + window.scrollY;

  elem.style.position = 'absolute';
  elem.style.left = 0;
  elem.style.top = 0;
  elem.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
}
