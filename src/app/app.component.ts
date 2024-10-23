import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemapComponent } from "./tem/temap/temap.component";
import { AddMessageComponent } from "./tem/add-message/add-message.component";
import { ListMessageComponent } from "./tem/list-message/list-message.component";
//import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddMessageComponent, ListMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
