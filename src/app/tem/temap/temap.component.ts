import { Component } from '@angular/core';
import { TemahComponent } from "../temah/temah.component";
import { AddMessageComponent } from "../add-message/add-message.component";

@Component({
  selector: 'app-temap',
  standalone: true,
  imports: [TemahComponent, AddMessageComponent],
  templateUrl: './temap.component.html',
  styles: ``
})
export class TemapComponent {

  title = 'Hola desde papá';

  mensaje2:string="";
  recibirMensaje(mensaje:string){
    this.mensaje2=mensaje;
  }
}
