import MathDialog from '../tasks/math/math';

require('./popUp.css');
require('../popUpGeneral.css');

function randInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

export default class {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('popUp');
    /* Inner Content */
    const h2 = document.createElement('h2');
    h2.innerText = 'Выбери задание';

    const wrapper = document.createElement('div');
    wrapper.classList.add('flex');

    const tasks = ['Математика']; /* , 'Перевод', 'Перестановка' */
    for (let i = 0; i < 6; i += 1) {
      const button = document.createElement('button');
      button.innerText = tasks[randInt(0, tasks.length - 1)];
      if (i % 2 === 0) {
        button.classList.add('heal');
      } else {
        button.classList.add('damage');
      }
      wrapper.append(button);
    }
    this.element.appendChild(h2);
    this.element.appendChild(wrapper);

    this.element.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('heal')
          && !evt.target.classList.contains('damage')) return;

      const value = evt.target.innerText;
      const heals = evt.target.classList.contains('heal');
      if (value === 'Математика') {
        MathDialog(heals);
      }
      this.detach();
    }, false);
  }

  attach() {
    document.querySelector('body').appendChild(this.element);
  }

  detach() {
    document.querySelector('body').removeChild(this.element);
  }
}
