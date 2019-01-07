require('./healthBar.css');

export default class {
  constructor(x) {
    this.element = document.createElement('div');
    this.element.classList.add('bar');
    this.element.style.left = x;

    this.health = document.createElement('div');
    this.health.classList.add('health');
    this.health.style.width = '100%';
    this.element.appendChild(this.health);
  }

  attach() {
    document.querySelector('body').appendChild(this.element);
  }

  update(width) {
    if (width < 0) this.health.style.width = '0%';
    else this.health.style.width = `${Math.floor(width)}%`;
  }
}
