import Engine from './engine';

const engine = new Engine();
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

document.querySelector('body').addEventListener('answered', (evt) => {
  if (evt.detail.heals) engine.healPlayer(evt.detail.correct);
  else engine.dealDamage(evt.detail.correct);
}, false);

(function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  engine.draw(context);
}());
