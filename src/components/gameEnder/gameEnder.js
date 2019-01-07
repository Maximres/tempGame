require('../popUpGeneral.css');

export default class {
  constructor(message, sign) {
    this.element = document.createElement('div');
    this.element.classList.add('popUp');

    const h2 = document.createElement('h2');
    h2.innerText = message;
    this.element.appendChild(h2);

    const button = document.createElement('button');
    button.innerText = sign;
    this.element.appendChild(button);
  }

  attach() {
    document.querySelector('body').appendChild(this.element);
  }
}
