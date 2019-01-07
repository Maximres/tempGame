import Entity from './entity';
import PopUp from '../../components/popup/popUp';
import HealthBar from '../../components/healthBar/healthBar';
import GameEnder from '../../components/gameEnder/gameEnder';

function randInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

export default class {
  constructor() {
    this.backgroundSrc = `./img/background/background_${randInt(1, 6)}.png`;
    document.querySelector('#layer img').src = this.backgroundSrc;

    this.difficulty = 1;
    /* Enemy and Player Objects */
    const dimensions = {
      maxWidth: 1024,
      maxHeight: 640,
      width: 1024,
      height: 640,
      largestProp() {
        return this.height > this.width ? 'height' : 'width';
      },
      readDimentions(img) {
        this.width = img.width;
        this.height = img.height;
        return this;
      },
      scalingFactor(original, computed) {
        return computed / original;
      },
      scaleToFit() {
        const xFactor = this.scalingFactor(this.width, this.maxWidth);
        const yFactor = this.scalingFactor(this.height, this.maxHeight);
        const factor = Math.min(xFactor, yFactor);

        this.width *= factor;
        this.height *= factor;
      },
    };
    const playerPhases = [];
    const enemyPhases = [];
    const enemyType = randInt(1, 2);
    for (let i = 0; i < 7; i += 1) {
      const img1 = new Image();
      img1.src = `./img/entities/player/attack_${i}.png`;
      playerPhases.push(img1);
      img1.onload = () => {
        dimensions.readDimentions(img1).scaleToFit();
        const canvas = document.querySelector('canvas');
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
      };

      const img2 = new Image();
      img2.src = `./img/entities/enemy/${enemyType}/attack_${i}.png`;
      enemyPhases.push(img2);
    }
    this.player = new Entity(playerPhases, 80, 440);
    this.enemy = new Entity(enemyPhases, 400, 440, this.difficulty);
    /* Button 'Pick' */
    const button = document.createElement('button');
    button.classList.add('pick');
    button.innerText = 'Выбери заклинание';
    button.addEventListener('click', (evt) => {
      evt.target.setAttribute('disabled', true);
      new PopUp().attach();
    }, false);
    document.querySelector('body').appendChild(button);

    this.playerBar = new HealthBar('20%');
    this.playerBar.attach();
    this.enemyBar = new HealthBar('60%');
    this.enemyBar.attach();
  }

  draw(context) {
    this.player.draw(context);
    this.enemy.draw(context);
  }

  healPlayer(isCorrect) {
    if (isCorrect) {
      this.player.heal();
      this.playerBar.update(this.player.health);
      this.checkHealth();
    } else this.dealDamage(isCorrect);
  }

  dealDamage(isCorrect) {
    if (isCorrect) {
      this.player.triggerAttack();
      this.enemy.takeDamage(this.player.attack);
      this.enemyBar.update(this.enemy.health);
    } else {
      this.enemy.triggerAttack();
      this.player.takeDamage(this.enemy.attack);
      this.playerBar.update(this.player.health);
    }
    this.checkHealth();
  }

  checkHealth() {
    if (this.player.health <= 0) {
      new GameEnder('You lost', 'Отомстить').attach();
    }
    if (this.enemy.health <= 0) {
      new GameEnder('You won', 'К след. врагу').attach();
    }
  }
}
