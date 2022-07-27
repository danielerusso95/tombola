import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class UtilityService {

  private players:BehaviorSubject<string[]>=new BehaviorSubject(['']);

  constructor(){
  }

  getPlayers(){
    return this.players;
  }

  setPlayers(players:string[]){
    this.players.next(players);
  }
}
