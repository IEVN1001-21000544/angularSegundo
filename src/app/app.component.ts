import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddMessageComponent } from "./tem/add-message/add-message.component";
import { ListMessageComponent } from "./tem/list-message/list-message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddMessageComponent, ListMessageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'angularSegundo';
}
