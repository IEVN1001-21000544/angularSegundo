import { Component, EventEmitter, Input, Output, output} from '@angular/core';

@Component({
  selector: 'app-temah',
  standalone: true,
  imports: [],
  templateUrl: './temah.component.html',
  styles: ``
})
export class TemahComponent {

  @Input() mesaje!:string; //Propiedad de entrada
  @Output() mensaje2 = new EventEmitter<string>();//Propiedad de salida

  enviarMensaje(){
    this.mensaje2.emit('Hola desde hijo');
  }
}

