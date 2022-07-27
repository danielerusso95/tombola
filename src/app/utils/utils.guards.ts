import { UtilityService } from './utils.service';
import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlayerSetGuard implements CanActivate {

  constructor(private utilityService:UtilityService,private router:Router){}

  canActivate() {
    if(this.utilityService.getPlayers().value.length>0 && this.utilityService.getPlayers().value[0]!=='')
      return true;
    else
      return this.router.navigate(['/']);
  }
}
