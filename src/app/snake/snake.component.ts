import { Component, OnInit, HostListener } from '@angular/core';
import { isUndefined } from 'util';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit {

  width = 30;
  height = 30;
  cellSize = 15;
  score = 0;
  headPosition = [Math.floor(this.width / 2) - 1, Math.floor(this.height / 2) - 1];
  headDirection = 1; // right: 1; down : 2; left : 3; up : 4
  snakeWeight = 2;
  speed = 1;
  start = false;
  gameOver = false;
  Alayout = [];
  cells: GraphItem[];
  cherry: GraphItem;
  A1 = [];
  steps = 0;
  cherryDelay = 0;
  snakeColor = '#00cc44';

  constructor() {}

  ngOnInit(): void {
    this.initGame();
    setInterval(() => {
      if (this.start) {
        this.moveStep();
      }
    }, 300);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.changeDirection(1);
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.changeDirection(2);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.changeDirection(3);
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.changeDirection(4);
    }
  }

  startGame() {
    this.initGame();
    this.start = true;
    console.log('start game');
    this.gameOver = false;
  }

  stopGame() {
    this.start = false;
    console.log('stop game');
    this.gameOver = true;
  }

  initGame() {

    this.headPosition = [Math.floor(this.width / 2) - 1, Math.floor(this.height / 2) - 1];
    this.headDirection = 1;
    this.snakeWeight = 2;
    this.speed = 1;

    this.Alayout = this.fill(this.width, this.height, 0);
    this.A1 = this.fill(this.width, this.height, 1);
    // console.log(this.A1);
    this.Alayout[Math.floor(this.width / 2) - 1][Math.floor(this.height / 2) - 1] = this.snakeWeight;
    // console.log(this.Alayout);
    this.score = 0;
  }

  changeDirection(dir) {
    this.headDirection = dir;
    console.log('Direction ' + dir);
  }

  moveStep() {
    this.steps += 1;
    // console.log(this.steps);
    // reduce matrix weight
    // console.log(this.Alayout);
    this.Alayout = this.sub(this.Alayout, this.A1);
    // move head
    this.Alayout = this.moveHead(this.Alayout);
    this.cells = this.generateCells(this.Alayout);
    // manage cherry
    this.cherryDelay++;
    // check collision
    this.checkCollision();
    console.log(this.cherryDelay);
    // create cherry
    if (this.cherryDelay > 5 && this.cherry === undefined) {
      this.createCherry();
    }
  }

  fill(width, height, value) {
    const A = new Array(width);
    for (let i = 0; i < width; i++) {
      const B = new Array(height);
      for (let j = 0; j < height; j++) {
        B[j] = value;
      }
      A[i] = B;
    }
    return A;
  }

  sub(A, B) {
    console.log('sub A, B');
    const C = new Array(A.length);
    for (let i = 0; i < A.length; i++) {
      const D = new Array(A[0].length);
      console.log('x : ' + A.length + ', y : ' + A[0].length);
      for (let j = 0; j < A[0].length; j++) {
        D[j] = A[i][j] - B[i][j];
      }
      C[i] = D;
    }
    return C;
  }

  moveHead(A) {
    let x = this.headPosition[0];
    let y = this.headPosition[1];
    // console.log(A);
    if (this.headDirection === 1) { // move right
      x += 1;
      if ( x > this.width - 1 ) {x = 0; }
    } else if (this.headDirection === 2) { // move down
      y += 1;
      if ( y > this.height - 1 ) {y = 0; }
    } else if (this.headDirection === 3) { // move left
      x -= 1;
      if ( x < 0 ) {x = this.width - 1; }
    } else if (this.headDirection === 4) { // move up
      y -= 1;
      if ( y < 0 ) {y = this.height - 1 ; }
    }

    if (this.Alayout[x][y] > 0) {
      this.stopGame();
    } else {
      this.headPosition = [x, y];
      A[x][y] = this.snakeWeight;
    }

    return A;
  }

  generateCells(A) {
    const B = [];
    console.log('X:' + A.length + ', Y:' + A[0].length);
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[0].length; j++) {
        if (A[i][j] > 0) {
          const item: GraphItem = {
            x : i * this.cellSize,
            y : j * this.cellSize,
            color : this.snakeColor
          };
          B.push(item);
        }
      }
    }
    return B;
  }

  createCherry() {
    const x1 = Math.floor(Math.random() * this.width) * this.cellSize;
    const y1 = Math.floor(Math.random() * this.height) * this.cellSize;

    this.cherry = {
      x : x1,
      y : y1,
      color : 'rgb(255,0,0)'
    };
  }

  checkCollision() {
    if (this.cherry !== undefined) {
      const cherryX = this.cherry.x / this.cellSize;
      const cherryY = this.cherry.y / this.cellSize;
      const headX = this.headPosition[0];
      const headY = this.headPosition[1];
      console.log('cherry x ' + cherryX + ', y ' + cherryY);
      console.log('head x ' + headX + ', y ' + headY);
      if (cherryX === headX && cherryY === headY) {
        console.log('collision');
        this.cherryDelay = 0;
        this.score += 10;
        this.snakeWeight += 1;
        this.cherry = undefined;
      }
    }
  }

}

interface GraphItem {
  x: number;
  y: number;
  color: string;
}
