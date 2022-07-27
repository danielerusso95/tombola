import {
  Component, EventEmitter, Input,
  OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import { Tile } from '../tabellone/tabellone.component';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css'],
})
export class SchedaComponent implements OnInit, OnChanges {
  private grid: Tile[] = [];
  private scheda: Tile[] = [];

  @Input() numEstratto!: number;
  @Input() isReset!: boolean;
  @Input() numeroGiocatore!: number;
  @Input() nomeGiocatore!: string;
  @Output() isWinner: EventEmitter<{ isAllTrue: boolean; num: number }> =
    new EventEmitter<{ isAllTrue: boolean; num: number }>();
  @Output() isResetCompleted: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
    this.riempiScheda();
    //this.generaGrid();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['numEstratto']) {
      if (changes['numEstratto'].previousValue) {
        this.scheda.forEach((e) => {
          if (changes['numEstratto'].currentValue == e.numero) {
            e.isLit = true;
            this.checkWinner();
          }
        });
      }
    }
    if (changes['isReset']) {
      if (!changes['isReset'].firstChange && changes['isReset'].currentValue) {
        this.resetGioco();
      }
    }
  }

  get schedina() {
    return this.scheda;
  }

  checkWinner() {
    let isAllTrue = this.scheda.every((e) => e.isLit);
    if (isAllTrue) {
      this.isWinner.emit({ isAllTrue: isAllTrue, num: this.numeroGiocatore });
    }
  }
  resetGioco() {
    this.scheda = [];
    this.isResetCompleted.emit(this.numeroGiocatore);
    this.riempiScheda();
  }

  riempiScheda() {
    let arrNumScheda: number[] = [];
    let max: number = 89;
    for (let i = 1; i < 91; i++) {
      arrNumScheda.push(i);
    }

    for (let i = 0; i < 15; i++) {
      let numScheda = Math.floor(Math.random() * max);

      this.scheda.push({ numero: arrNumScheda[numScheda], isLit: false });
      arrNumScheda.splice(numScheda, 1);
      max = max - 1;
    }
    console.log(this.scheda);
  }
}

/*
  fillGrid(i: number) {
    let tile: Tile = this.scheda.filter(
      (e) => e.numero > i * 10 && e.numero < 10 + i * 10
    )[0];

    if (tile) {
      this.scheda.splice(this.scheda.indexOf(tile), 1);
    } else {
      tile = { numero: 0, isLit: false };
    }
    return tile;
  }
  */

/*
  generaGrid() {

    for (let i = 0; i < 9; i++) {
      this.grid[i] = this.fillGrid(i);
      this.grid[i + 9] = this.fillGrid(i);
      this.grid[i + 18] = this.fillGrid(i);
    }

  }
*/

/*
for (var a = [0, 1, 2, 3, 4], i = a.length; i--; ) {
  var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  $('.output').append('<span>' + random + '</span>');
}
*/
