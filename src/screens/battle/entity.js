export default class {
  constructor(imgArray, x, y, difficultyCoeff = 1) {
    this.phase = Array.from(imgArray);

    this.x = x;
    this.y = y;

    this.health = 100 * difficultyCoeff;
    this.attack = 20 * difficultyCoeff;
    this.currentPhase = 0;
    this.frameNumber = 0;
    this.isAttacking = false;
  }

  update() {
    this.frameNumber += 1;
    if (this.isAttacking && this.currentPhase < 7 && this.frameNumber === 5) {
      this.frameNumber = 0;
      this.currentPhase += 1;
    }
    if (this.currentPhase === 7) {
      this.isAttacking = false;
      this.currentPhase = 0;
    }
  }

  draw(context) {
    const canvas = document.querySelector('canvas');
    context.drawImage(this.phase[this.currentPhase], this.x, this.y,
      canvas.width / 4, canvas.height / 4);
    if (this.isAttacking) this.update();
  }

  heal() {
    if (this.health < 100) this.health += 10;
    if (this.health > 100) this.health = 100;
  }

  takeDamage(amount) {
    this.health -= amount;
  }

  triggerAttack() {
    this.isAttacking = true;
  }
}
