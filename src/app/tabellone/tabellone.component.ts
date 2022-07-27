import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from './../utils/utils.service';

@Component({
  selector: 'app-tabellone',
  templateUrl: './tabellone.component.html',
  styleUrls: ['./tabellone.component.css'],
})
export class TabelloneComponent implements OnInit {
  private tabellone: Tile[] = [];
  numEstratto!: number;
  isWinner: boolean = false;
  isReset: boolean[] = [];
  isGameOn: boolean = false;
  matchCount: number = 1;
  numeriRimanenti: number = 90;
  giocatori!: string[]
  numGiocatori:number=0;
  winner!: number;
  record: Record[] = [];
  subscriptions:Subscription=new Subscription;
  displayedColumns = ['player', 'numPartite', 'mosse'];

  constructor(private cdRef: ChangeDetectorRef, private utilityService: UtilityService) {

  }

  ngOnInit() {
    this.subscriptions.add(
    this.utilityService.getPlayers().subscribe(res=>{
      this.giocatori=res;
      this.riempiTabellone();
      for (let i = 0; i < res.length; i++) {
        this.isReset.push(false);
      }
    }))
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
    this.resetGioco();
  }

  numSequence(): Array<number> {
    return Array(this.numGiocatori);
  }

  riempiTabellone() {
    for (let i = 1; i < 91; i++) {
      this.tabellone.push({ numero: i, isLit: false });
    }
  }

  /*
  estrai() {
    let random: number = Math.floor(Math.random() * 89 + 1);
    this.tabellone[random].isLit == false
      ? (this.tabellone[random].isLit = true)
      : this.estrai();
  }
  */

  estrai() {
    let isAllTrue: boolean = this.tabellone.every((e) => e.isLit);
    let random: number = Math.floor(Math.random() * 90);
    while (this.tabellone[random].isLit == true && !isAllTrue) {
      random = Math.floor(Math.random() * 90);
    }
    this.tabellone[random].isLit = true;
    this.numEstratto = this.tabellone[random].numero;
    this.numeriRimanenti--;
  }

  checkWinner(event: { isAllTrue: boolean; num: number }) {
    console.log(event);
    this.isWinner = event.isAllTrue;
    this.winner = event.num;
    this.cdRef.detectChanges();
  }

  resetGioco() {
    let record: Record[] = Object.assign([], this.record);
    this.tabellone = [];
    this.isWinner = false;
    for (let i = 0; i < this.isReset.length; i++) {
      console.log(this.isReset)
      this.isReset[i] = true;
    }
    this.riempiTabellone();
    record.push({
      numPartite: this.matchCount,
      player:this.giocatori[this.winner],
      mosse: 90 - this.numeriRimanenti,
    });
    this.record = record;
    this.winner = -1;
    this.numeriRimanenti = 90;
    this.matchCount++;
  }

  toResetScheda(event: number) {
    this.isReset[event] = false;
    this.cdRef.detectChanges();
  }

  get tabella() {
    return this.tabellone;
  }
}

export interface Tile {
  numero: number;
  isLit: boolean;
}

export interface Record {
  numPartite: number;
  player: string;
  mosse: number;
}
