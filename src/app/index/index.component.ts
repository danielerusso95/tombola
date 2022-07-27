import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getArrayForm } from '../utils/utils.form';
import { UtilityService } from '../utils/utils.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  playersIsSet: boolean = false;
  closeResult!: string;
  namesForm:FormArray=new FormArray<any>([]);

  numeroGiocatori: number=0;
  constructor(private router: Router,private utilityService:UtilityService) {
    this.utilityService.getPlayers().subscribe(res=>{
      if(res.length && res[0]!==''){
        res.forEach(el=>{
          let control = new FormControl(el,Validators.required)
          this.namesForm.push(control)
        })
        this.playersIsSet = true;
      }
      else this.namesForm=getArrayForm()
    })

  }

  ngOnInit() {}

  getFormArray(){
    return this.namesForm as FormArray
  }

  addPlayer(){
    this.getFormArray().push(new FormControl('',Validators.required))
  }

  insertPlayers(isInsert:boolean) {
    console.log(this.namesForm.valid)
    this.playersIsSet = isInsert;
  }
  gioca() {
    this.utilityService.setPlayers(this.namesForm.value)
    this.router.navigateByUrl('tabellone');
  }
  /* openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  } */
}
