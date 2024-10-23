import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  constructor() { }
  alumnos:string[]=['a','b','c']

  add(alumnos:string){
    this.alumnos.push(alumnos);
  }
  
}
