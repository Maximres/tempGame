require('../../popUpGeneral.css');

function randInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

const tasks = [
  { question: '58 + 15', answer: '73' },
  { question: '3 - 5', answer: '-2' },
  { question: '3 * 8', answer: '24' },
  { question: '13 * 11', answer: '141' },
  { question: '14 / 2', answer: '7' },
  { question: '145 ? (130 + 5 * 3)', answer: '=' },
  { question: '1789 / 1789', answer: '1' },
  { question: '0 ^ 1', answer: '0' },
];

export default function (heals) {
  const task = tasks[randInt(0, tasks.length - 1)];
  const element = document.createElement('div');
  element.classList.add('popUp');

  const h2 = document.createElement('h2');
  h2.innerText = task.question.concat(' ?');
  element.appendChild(h2);


  const flex = document.createElement('div');
  flex.classList.add('flex');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Ответ...');
  input.focus();
  flex.appendChild(input);

  const submit = document.createElement('button');
  submit.classList.add('answer');
  submit.innerHTML = 'ОК';
  flex.appendChild(submit);
  submit.addEventListener('click', (evt) => {
    evt.stopPropagation();

    const answer = document.querySelector('input[type="text"]').value;
    let flag = false;
    if (answer.trim() === task.answer) {
      flag = true;
    }
    const event = new CustomEvent('answered', { detail: { correct: flag, heals, bubbles: true } });
    document.querySelector('body').dispatchEvent(event);

    document.querySelector('.pick').removeAttribute('disabled');
    element.style.height = 0;
    setTimeout(() => document.querySelector('body').removeChild(element), 100);
  }, false);

  element.appendChild(flex);
  document.querySelector('body').appendChild(element);
}
