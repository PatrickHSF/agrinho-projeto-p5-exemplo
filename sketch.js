let player;
let fruit;
let obstacles = [];
let isGameOver = false;

function setup() {
  createCanvas(600, 400);

  // Criando o personagem
  player = new Player();

  // Criando a fruta
  fruit = new Fruit();

  // Criando alguns obstáculos iniciais
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle());
  }
}

function draw() {
  background(220);

  if (isGameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game Over!', width / 2, height / 2);
    return;
  }

  // Atualizar e desenhar o personagem
  player.update();
  player.display();

  // Atualizar e desenhar obstáculos
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    obstacles[i].display();
  }

  // Verificar se o personagem tocou em algum obstáculo
  for (let i = 0; i < obstacles.length; i++) {
    if (player.collidesWith(obstacles[i])) {
      isGameOver = true;
    }
  }

  // Desenhar a fruta
  fruit.display();

  // Verificar se o personagem coletou a fruta
  if (player.collidesWith(fruit)) {
    fruit = new Fruit();  // Criar uma nova fruta
    obstacles.push(new Obstacle()); // Criar um novo obstáculo
  }
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height - 60;
    this.size = 40;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  update() {
    // Movimentação com as setas
    if (keyIsDown(LEFT_ARROW)) {
      this.xSpeed = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.xSpeed = 5;
    } else {
      this.xSpeed = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.ySpeed = -5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.ySpeed = 5;
    } else {
      this.ySpeed = 0;
    }

    // Atualizar a posição
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Limitar a posição para o personagem não sair da tela
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    fill(0, 100, 255);
    rect(this.x, this.y, this.size, this.size);
  }

  collidesWith(other) {
    return !(this.x + this.size < other.x ||
             this.x > other.x + other.size ||
             this.y + this.size < other.y ||
             this.y > other.y + other.size);
  }
}

class Fruit {
  constructor() {
    this.x = random(width / 2, width - 30);
    this.y = random(height - 100);
    this.size = 30;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Obstacle {
  constructor() {
    this.x = random(width / 2, width - 30);
    this.y = random(height - 200);
    this.size = 40;
    this.speed = random(2, 5);
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = width;
      this.y = random(height - 200);
    }
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
  }
}
