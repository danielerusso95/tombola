import { FormArray, FormControl, Validators } from "@angular/forms";

export function getArrayForm(){
  return new FormArray([
    new FormControl('',Validators.required)
  ])
}
