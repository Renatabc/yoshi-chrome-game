const yoshi = document.querySelector('.yoshi');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 300) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 50) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          yoshi.style.bottom = position + 'px';
        }
      }, 10);
    } else {
      position += 20;
      yoshi.style.bottom = position + 'px';
    }
  }, 10);
}

function createPlant() {
  const plant = document.createElement('div');
  let plantPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  plant.classList.add('plant');
  background.appendChild(plant);
  plant.style.left = plantPosition + 'px';

  let leftTimer = setInterval(() => {
    if (plantPosition < -55) {
      clearInterval(leftTimer);
      background.removeChild(plant);
    } else if (plantPosition > 0 && plantPosition < 55 && position < 55) {
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      plantPosition -= 10;
      plant.style.left = plantPosition + 'px';
    }
  }, 50);

  setTimeout(createPlant, randomTime);
}

createPlant();
document.addEventListener('keyup', handleKeyUp);